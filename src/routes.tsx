import { RouteObject } from 'react-router';
import { lazy } from 'react';
import HomePage from './pages/index';
import ServicesPage from './pages/services';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import GoldRatesPage from './pages/gold-rates';
import MarketInsightsPage from './pages/market-insights';
import ProductsPage from './pages/products';
// Eager import so renderToString doesn't hit a Suspense boundary on 404 routes
// and abort to client rendering. The prod 404 page is tiny; the dev-tools
// variant stays lazy because it pulls in dev-only code we don't want in
// production bundles.
import ProdNotFoundPage from './pages/_404';
import AdminGoldRatesPage from './pages/admin/gold-rates';

const NotFoundPage = ProdNotFoundPage;

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/gold-rates',
    element: <GoldRatesPage />,
  },
  {
    path: '/market-insights',
    element: <MarketInsightsPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/admin/gold-rates',
    element: <AdminGoldRatesPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/services' | '/about' | '/contact' | '/market-insights';

export type Params = Record<string, string | undefined>;
