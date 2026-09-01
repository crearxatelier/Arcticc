export type Product = {
  id: string;
  handle: string;
  name: string;
  tagline: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: "bestseller" | "new" | "sale" | "preorder";
  saleLabel?: string;
  flavor: string;
  color: string;
  image: string;
  hoverImage?: string;
  category: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  nutrition: { label: string; value: string }[];
  sizes: { id: string; label: string; price: number }[];
};

export const products: Product[] = [
  {
    id: "1",
    handle: "citrus-ginger-press",
    name: "Citrus + Ginger Press",
    tagline: "Bright morning tonic",
    price: 9.5,
    rating: 4.9,
    reviews: 842,
    badge: "bestseller",
    flavor: "Citrus",
    color: "#E8C15A",
    image:
      "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=80",
    category: "Energy",
    description:
      "Cold-pressed Valencia orange, young ginger, and a whisper of turmeric for clean morning lift—no syrup, no noise.",
    benefits: ["Natural energy", "Anti-inflammatory", "Vitamin C rich"],
    ingredients: ["Valencia orange", "Young ginger", "Turmeric", "Lemon", "Filtered water"],
    nutrition: [
      { label: "Calories", value: "92" },
      { label: "Sugar", value: "18g" },
      { label: "Vitamin C", value: "120%" },
    ],
    sizes: [
      { id: "250", label: "250ml", price: 9.5 },
      { id: "500", label: "500ml", price: 16 },
      { id: "1L", label: "1L", price: 28 },
    ],
  },
  {
    id: "2",
    handle: "kale-cucumber-veil",
    name: "Kale + Cucumber Veil",
    tagline: "Cool green clarity",
    price: 10,
    rating: 4.8,
    reviews: 614,
    badge: "new",
    flavor: "Greens",
    color: "#7FAE6E",
    image:
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80",
    category: "Greens",
    description:
      "A soft green veil of kale, cucumber, green apple, and mint—hydrating, mineral-rich, and quietly restorative.",
    benefits: ["Hydration", "Alkalizing", "Daily greens"],
    ingredients: ["Kale", "Cucumber", "Green apple", "Mint", "Lime", "Filtered water"],
    nutrition: [
      { label: "Calories", value: "78" },
      { label: "Sugar", value: "14g" },
      { label: "Fiber", value: "3g" },
    ],
    sizes: [
      { id: "250", label: "250ml", price: 10 },
      { id: "500", label: "500ml", price: 17 },
      { id: "1L", label: "1L", price: 30 },
    ],
  },
  {
    id: "3",
    handle: "beet-berry-pulse",
    name: "Beet + Berry Pulse",
    tagline: "Deep ruby recovery",
    price: 10.5,
    compareAt: 12.5,
    rating: 4.7,
    reviews: 391,
    badge: "sale",
    saleLabel: "−16%",
    flavor: "Berry",
    color: "#8B3A5C",
    image:
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80",
    category: "Recovery",
    description:
      "Earthy beet meets wild blueberry and blackcurrant—built for post-movement recovery and quiet endurance.",
    benefits: ["Circulation support", "Antioxidants", "Post-workout"],
    ingredients: ["Beetroot", "Blueberry", "Blackcurrant", "Apple", "Lemon"],
    nutrition: [
      { label: "Calories", value: "98" },
      { label: "Sugar", value: "19g" },
      { label: "Iron", value: "8%" },
    ],
    sizes: [
      { id: "250", label: "250ml", price: 10.5 },
      { id: "500", label: "500ml", price: 18 },
      { id: "1L", label: "1L", price: 32 },
    ],
  },
  {
    id: "4",
    handle: "mango-turmeric-glow",
    name: "Mango + Turmeric Glow",
    tagline: "Golden hour sip",
    price: 9.75,
    rating: 4.8,
    reviews: 528,
    flavor: "Tropical",
    color: "#E39B3D",
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80",
    category: "Glow",
    description:
      "Sun-ripe mango folded with turmeric and black pepper—smooth, golden, and made for afternoon reset.",
    benefits: ["Skin glow", "Anti-inflammatory", "Digestive ease"],
    ingredients: ["Alphonso mango", "Turmeric", "Black pepper", "Orange", "Coconut water"],
    nutrition: [
      { label: "Calories", value: "110" },
      { label: "Sugar", value: "22g" },
      { label: "Vitamin A", value: "35%" },
    ],
    sizes: [
      { id: "250", label: "250ml", price: 9.75 },
      { id: "500", label: "500ml", price: 16.5 },
      { id: "1L", label: "1L", price: 29 },
    ],
  },
  {
    id: "5",
    handle: "matcha-lime-drift",
    name: "Matcha + Lime Drift",
    tagline: "Soft focus energy",
    price: 11,
    rating: 4.9,
    reviews: 276,
    badge: "preorder",
    flavor: "Matcha",
    color: "#5F8F5A",
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80",
    category: "Energy",
    description:
      "Ceremonial matcha, yuzu lime, and a touch of honeybush—calm clarity without the crash.",
    benefits: ["Focused energy", "L-theanine", "Antioxidants"],
    ingredients: ["Ceremonial matcha", "Yuzu", "Lime", "Honeybush", "Filtered water"],
    nutrition: [
      { label: "Calories", value: "45" },
      { label: "Sugar", value: "6g" },
      { label: "Caffeine", value: "45mg" },
    ],
    sizes: [
      { id: "250", label: "250ml", price: 11 },
      { id: "500", label: "500ml", price: 19 },
      { id: "1L", label: "1L", price: 34 },
    ],
  },
  {
    id: "6",
    handle: "hibiscus-rose-tide",
    name: "Hibiscus + Rose Tide",
    tagline: "Floral evening unwind",
    price: 9.25,
    rating: 4.6,
    reviews: 198,
    flavor: "Floral",
    color: "#C45B7A",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
    category: "Calm",
    description:
      "Tart hibiscus and soft rose petal with a finish of white peach—an evening tide for slowing down.",
    benefits: ["Evening calm", "Hydration", "Caffeine-free"],
    ingredients: ["Hibiscus", "Rose petal", "White peach", "Lemon", "Filtered water"],
    nutrition: [
      { label: "Calories", value: "62" },
      { label: "Sugar", value: "12g" },
      { label: "Caffeine", value: "0mg" },
    ],
    sizes: [
      { id: "250", label: "250ml", price: 9.25 },
      { id: "500", label: "500ml", price: 15.5 },
      { id: "1L", label: "1L", price: 27 },
    ],
  },
];

export const categories = [
  {
    id: "energy",
    name: "Energy Boosting",
    description: "Bright presses for mornings that move.",
    image:
      "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "greens",
    name: "Super Greens",
    description: "Mineral-rich greens, softly blended.",
    image:
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "recovery",
    name: "Recovery",
    description: "Ruby blends for after you move.",
    image:
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "calm",
    name: "Evening Calm",
    description: "Caffeine-free tides for winding down.",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1000&q=80",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Maya R.",
    location: "Portland",
    quote:
      "The Kale Veil replaced my afternoon coffee. Clean, cold, and actually delicious.",
    rating: 5,
  },
  {
    id: "2",
    name: "Jordan L.",
    location: "Austin",
    quote:
      "I built a week box once and never looked back. Delivery is always cold and on time.",
    rating: 5,
  },
  {
    id: "3",
    name: "Priya S.",
    location: "Brooklyn",
    quote:
      "Beautiful bottles, honest ingredients, and the Matcha Drift is my daily ritual.",
    rating: 5,
  },
];

export const blogPosts = [
  {
    id: "1",
    title: "Why we cold-press instead of blend",
    excerpt: "Heat and high-speed blades strip more than texture—they strip intention.",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=80",
    date: "Aug 12, 2026",
  },
  {
    id: "2",
    title: "A week of morning presses",
    excerpt: "Seven bottles, one ritual. How our members structure their week.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    date: "Jul 28, 2026",
  },
  {
    id: "3",
    title: "Sourcing ginger that actually bites",
    excerpt: "Young root from partner farms—why heat matters more than size.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
    date: "Jul 4, 2026",
  },
];

export const lifestyleImages = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80",
    productId: "1",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    productId: "2",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80",
    productId: "4",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
    productId: "6",
  },
];

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}
