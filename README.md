# Rivulet — Shopify Flow–inspired theme demo

A Next.js storefront redesign inspired by the [Shopify Flow theme](https://themes.shopify.com/themes/flow/presets/flow) (Eight Themes), rebuilt as an original wellness brand: **Rivulet**.

## Design brief (from Flow analysis)

Flow targets immersive storefronts for wellness, skincare, and food brands. Its conversion layout pattern includes:

1. Announcement bar + sticky centered-logo header  
2. Full-bleed lifestyle hero with product presence  
3. Trust marquee  
4. Featured product grid with badges / quick add  
5. Guided quiz (“find your blend”)  
6. Shoppable lifestyle gallery  
7. Bundle / week-box builder  
8. Alternating lifestyle storytelling color fields  
9. Category navigation list  
10. Featured product spotlight  
11. Testimonials + promo tiles + journal  
12. Newsletter footer + slide-out cart  

**Rivulet keeps that architecture** with a new visual system: mineral paper, evergreen + citron, Fraunces + Outfit — not a Flow clone.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Theme homepage |
| `/collections` | Collection / filter grid |
| `/products/[handle]` | Product detail |

## Stack

Next.js 15 · React 19 · CSS Modules · Lenis smooth scroll · Unsplash imagery
