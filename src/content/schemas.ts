import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "headline": z.string(),
        "subheadline": z.string(),
        "cta_primary": z.string(),
        "cta_secondary": z.string(),
        "trust_badges": z.array(z.object({
          "id": z.string(),
          "label": z.string()
        }))
      }),
      "ticker": z.object({
        "label": z.string(),
        "rates": z.array(z.object({
          "id": z.string(),
          "purity": z.string(),
          "per_gram": z.string(),
          "per_10g": z.string()
        })),
        "updated_at": z.string()
      }),
      "services": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string(),
          "icon": z.string()
        }))
      }),
      "stats": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "value": z.number(),
          "suffix": z.string(),
          "label": z.string()
        }))
      }),
      "testimonials": z.object({
        "heading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "quote": z.string(),
          "author": z.string(),
          "business": z.string()
        }))
      }),
      "cta": z.object({
        "headline": z.string(),
        "subheadline": z.string(),
        "cta_whatsapp": z.string(),
        "cta_call": z.string(),
        "phone": z.string()
      })
    }),
    services: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "services": z.array(z.object({
        "id": z.string(),
        "slug": z.string(),
        "icon": z.string(),
        "title": z.string(),
        "tagline": z.string(),
        "description": z.string(),
        "features": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      })),
      "cta": z.object({
        "headline": z.string(),
        "subheadline": z.string(),
        "cta_whatsapp": z.string(),
        "cta_enquire": z.string()
      })
    }),
    about: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "story": z.object({
        "heading": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "credentials": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "values": z.object({
        "heading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "stats": z.array(z.object({
        "id": z.string(),
        "value": z.string(),
        "label": z.string()
      })),
      "cta": z.object({
        "headline": z.string(),
        "subheadline": z.string(),
        "cta_contact": z.string(),
        "cta_services": z.string()
      })
    }),
    contact: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "info": z.object({
        "address_label": z.string(),
        "address": z.string(),
        "phone_label": z.string(),
        "phone": z.string(),
        "whatsapp_label": z.string(),
        "whatsapp": z.string(),
        "email_label": z.string(),
        "email": z.string(),
        "hours_label": z.string(),
        "hours": z.string()
      }),
      "form": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "success_heading": z.string(),
        "success_message": z.string()
      })
    }),
    market_insights: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "disclaimer": z.string(),
      "insights": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "articles": z.array(z.object({
          "id": z.string(),
          "date": z.string(),
          "tag": z.string(),
          "title": z.string(),
          "summary": z.string()
        }))
      }),
      "factors": z.object({
        "heading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "cta": z.object({
        "headline": z.string(),
        "subheadline": z.string(),
        "cta_whatsapp": z.string(),
        "cta_call": z.string()
      })
    }),
    gold_rates: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "disclaimer": z.string(),
      "cta": z.object({
        "headline": z.string(),
        "subheadline": z.string(),
        "whatsapp": z.string(),
        "call": z.string(),
        "enquire": z.string()
      }),
      "faq": z.array(z.object({
        "id": z.string(),
        "question": z.string(),
        "answer": z.string()
      }))
    }),
    products: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string()
      }),
      "categories": z.array(z.object({
        "id": z.string(),
        "name": z.string(),
        "description": z.string(),
        "products": z.array(z.object({
          "id": z.string(),
          "name": z.string(),
          "purity": z.string(),
          "weight": z.string(),
          "hallmark": z.string(),
          "note": z.string()
        }))
      })),
      "pricing_note": z.string(),
      "cta": z.object({
        "title": z.string(),
        "subtitle": z.string(),
        "whatsapp": z.string(),
        "phone": z.string()
      })
    })
  }
};
export type Schemas = typeof schemas;