const DEFAULT_STORE_DOMAIN = "arcticc.store";

export function getShopifyStoreDomain(): string {
  const raw =
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ??
    process.env.SHOPIFY_STORE_DOMAIN ??
    DEFAULT_STORE_DOMAIN;
  return raw.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function getShopifyStoreUrl(): string {
  return `https://${getShopifyStoreDomain()}`;
}

export type ShopifyImage = {
  id: number;
  src: string;
  alt: string | null;
  width?: number;
  height?: number;
};

export type ShopifyVariant = {
  id: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  price: string;
  compare_at_price: string | null;
  sku: string | null;
  available: boolean;
};

export type ShopifyOption = {
  name: string;
  position: number;
  values: string[];
};

export type ShopifyProduct = {
  id: number;
  title: string;
  handle: string;
  vendor: string;
  product_type: string;
  tags: string[] | string;
  body_html: string | null;
  images: ShopifyImage[];
  image: ShopifyImage | null;
  variants: ShopifyVariant[];
  options: ShopifyOption[];
};

type ProductsResponse = { products: ShopifyProduct[] };
type ProductResponse = { product: ShopifyProduct };

async function shopifyFetch<T>(path: string): Promise<T> {
  const url = `${getShopifyStoreUrl()}${path}`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Shopify request failed (${res.status}) for ${path}`);
  }

  return (await res.json()) as T;
}

function normalizeProduct(product: ShopifyProduct): ShopifyProduct {
  const tags = Array.isArray(product.tags)
    ? product.tags
    : product.tags
      ? product.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

  return {
    ...product,
    tags,
    variants: (product.variants ?? []).map((variant) => ({
      ...variant,
      available: variant.available !== false,
    })),
  };
}

export async function getShopifyProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ProductsResponse>("/products.json?limit=250");
  return (data.products ?? []).map(normalizeProduct);
}

export async function getShopifyProduct(
  handle: string
): Promise<ShopifyProduct | null> {
  try {
    const data = await shopifyFetch<ProductResponse>(
      `/products/${encodeURIComponent(handle)}.json`
    );
    return data.product ? normalizeProduct(data.product) : null;
  } catch {
    return null;
  }
}

export function getProductImages(product: ShopifyProduct): ShopifyImage[] {
  if (product.images?.length) return product.images;
  return product.image ? [product.image] : [];
}

export function getSizeOption(product: ShopifyProduct): ShopifyOption | undefined {
  return product.options.find((option) => option.name.toLowerCase() === "size");
}

export function findVariant(
  product: ShopifyProduct,
  size: string
): ShopifyVariant | undefined {
  return product.variants.find((variant) => variant.option1 === size);
}

export function formatMoney(amount: string | number, currency = "CAD"): string {
  const value = typeof amount === "string" ? Number.parseFloat(amount) : amount;
  if (Number.isNaN(value)) return "";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
  }).format(value);
}

export function buildCheckoutUrl(
  lines: Array<{ variantId: number; quantity: number }>
): string {
  const path = lines
    .filter((line) => line.quantity > 0)
    .map((line) => `${line.variantId}:${line.quantity}`)
    .join(",");
  return `${getShopifyStoreUrl()}/cart/${path}`;
}

export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
