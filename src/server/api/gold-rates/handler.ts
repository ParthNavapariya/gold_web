import type { Request, Response } from 'express';

interface GoldRate {
  purity: string;
  label: string;
  perGram: number;
  per10g: number;
  change: number; // change in ₹ per gram vs previous close
}

interface RatesStore {
  rates: GoldRate[];
  silver?: {
    perGram: number;
    perKg: number;
  };
  updatedAt: string;
  source: string;
}

const RAPID_API_KEY = 'c4dc67c6d3msh15c7086e92e1d48p1707a0jsnb49b5608e743';
const RAPID_API_HOST = 'gold-silver-rates-india.p.rapidapi.com';

// Fallback & In-memory cache store
let store: RatesStore = {
  rates: [
    { purity: '24K', label: '24 Karat (999.9)', perGram: 14683, per10g: 146830, change: +45 },
    { purity: '22K', label: '22 Karat (916)', perGram: 13984, per10g: 139840, change: +41 },
    { purity: '18K', label: '18 Karat (750)', perGram: 11012, per10g: 110120, change: +34 },
  ],
  silver: {
    perGram: 245,
    perKg: 245000,
  },
  updatedAt: new Date().toISOString(),
  source: 'Ahmedabad Bullion & Gold Rates Live Feed',
};

// Fetch real-time live gold rates for Ahmedabad
export async function fetchLiveGoldRates(): Promise<boolean> {
  try {
    const response = await fetch(
      'https://gold-silver-rates-india.p.rapidapi.com/api/Fetch-Gold-Silver/?city=Ahmedabad',
      {
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': RAPID_API_HOST,
        },
      }
    );

    if (!response.ok) {
      console.error(`RapidAPI error: status ${response.status}`);
      return false;
    }

    const res = await response.json();
    if (!res.success || !res.data?.gold) {
      console.error('Invalid data received from RapidAPI:', res);
      return false;
    }

    const gold = res.data.gold;
    const silver = res.data.silver;

    const price24k_1g = Number(gold['24k']?.['1gram']) || 14683;
    const price24k_10g = Number(gold['24k']?.['10grams']) || price24k_1g * 10;

    const price22k_1g = Number(gold['22k']?.['1gram']) || 13984;
    const price22k_10g = Number(gold['22k']?.['10grams']) || price22k_1g * 10;

    // 18K is 75% of 24K pure gold
    const price18k_1g = Math.round(price24k_1g * 0.75);
    const price18k_10g = price18k_1g * 10;

    // Keep daily change realistic or maintain store previous change
    const prev24k = store.rates.find(r => r.purity === '24K')?.perGram || price24k_1g;
    const change24k = price24k_1g !== prev24k ? price24k_1g - prev24k : (store.rates[0]?.change || 45);

    store = {
      rates: [
        { purity: '24K', label: '24 Karat (999.9)', perGram: price24k_1g, per10g: price24k_10g, change: change24k },
        { purity: '22K', label: '22 Karat (916)', perGram: price22k_1g, per10g: price22k_10g, change: Math.round(change24k * 0.916) },
        { purity: '18K', label: '18 Karat (750)', perGram: price18k_1g, per10g: price18k_10g, change: Math.round(change24k * 0.75) },
      ],
      silver: silver ? {
        perGram: Number(silver['1gram']) || 245,
        perKg: Number(silver['1kg']) || 245000,
      } : store.silver,
      updatedAt: new Date().toISOString(),
      source: 'Ahmedabad Gold Market Feed',
    };
    return true;
  } catch (error) {
    console.error('Failed to fetch live gold rates:', error);
    return false;
  }
}

// Auto-fetch every 15 minutes to preserve API quota
setInterval(fetchLiveGoldRates, 15 * 60 * 1000);
// Initial fetch on startup
fetchLiveGoldRates();

export async function getGoldRates(req: Request, res: Response) {
  const forceRefresh = req.query.refresh === 'true';
  const isStale = Date.now() - new Date(store.updatedAt).getTime() > 15 * 60 * 1000;
  
  if (forceRefresh || isStale) {
    await fetchLiveGoldRates();
  }
  res.json({ success: true, data: store });
}

// Admin password — hardcoded for trading desk use
const ADMIN_PASSWORD = 'Nikul.1991';

export function updateGoldRates(req: Request, res: Response) {
  const { password, rates, source } = req.body as Partial<RatesStore> & { password?: string };

  // Password check
  if (!password || password !== ADMIN_PASSWORD) {
    res.status(401).json({ success: false, error: 'Unauthorised — invalid password' });
    return;
  }

  if (!rates || !Array.isArray(rates)) {
    res.status(400).json({ success: false, error: 'rates array required' });
    return;
  }
  store = {
    ...store,
    rates,
    updatedAt: new Date().toISOString(),
    source: source ?? store.source,
  };
  res.json({ success: true, data: store });
}
