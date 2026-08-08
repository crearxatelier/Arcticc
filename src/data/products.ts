export type ProductId = 'ursine' | 'clutch' | 'polaris' | 'campcode'

export interface Product {
  id: ProductId
  name: string
  number: string
  subtitle: string
  meaningTitle: string
  blurb: string
  description: string
  price: number
  sku: string
  accent: string
  images: {
    front: string
    back: string
    detail: string
  }
}

export const products: Product[] = [
  {
    id: 'ursine',
    name: 'Ursine',
    number: '01',
    subtitle: 'Relating to bears',
    meaningTitle: 'The Story of Belonging',
    blurb: 'Different names. Same stars.',
    description:
      'Inspired by the northern sky shared by different cultures and generations. Different names, different perspectives, yet the same stars above us — reminding us that connection exists beyond language and borders.',
    price: 94.99,
    sku: 'ARC-URS-H',
    accent: '#6B8F9C',
    images: {
      front: '/products/ursine-front.jpg',
      back: '/products/ursine-back.jpg',
      detail: '/products/ursine-detail.jpg',
    },
  },
  {
    id: 'clutch',
    name: 'Clutch',
    number: '02',
    subtitle: 'Critical moments',
    meaningTitle: 'The Story of Connection',
    blurb: 'Some moments bring us together.',
    description:
      'Inspired by the moments that bring people together. The shared excitement, traditions, and memories created when communities gather around something they love.',
    price: 94.99,
    sku: 'ARC-CLU-H',
    accent: '#B99A5E',
    images: {
      front: '/products/clutch-front.jpg',
      back: '/products/clutch-back.jpg',
      detail: '/products/clutch-detail.jpg',
    },
  },
  {
    id: 'polaris',
    name: 'Polaris',
    number: '03',
    subtitle: 'The North Star',
    meaningTitle: 'The Story of Direction',
    blurb: 'Look up. Find your North.',
    description:
      'Inspired by the North Star — a constant guide through uncertainty. A reminder that even when the path changes, there is always something steady guiding us forward.',
    price: 94.99,
    sku: 'ARC-POL-E',
    accent: '#3D5A4C',
    images: {
      front: '/products/polaris-front.jpg',
      back: '/products/polaris-back.jpg',
      detail: '/products/polaris-detail.jpg',
    },
  },
  {
    id: 'campcode',
    name: 'Campcode',
    number: '04',
    subtitle: 'Code of cottage life',
    meaningTitle: 'The Story of Simplicity',
    blurb: 'Some memories need no words.',
    description:
      'Inspired by the quiet signals of northern life — nature, tradition, and moments shared without needing words. A reminder to slow down and appreciate what truly matters.',
    price: 94.99,
    sku: 'ARC-CAM-H',
    accent: '#7A8B5C',
    images: {
      front: '/products/campcode-front.jpg',
      back: '/products/campcode-back.jpg',
      detail: '/products/campcode-detail.jpg',
    },
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export const faqs = [
  {
    category: 'product',
    q: 'What fabric is the ARCTICC hoodie made from?',
    a: 'A premium 80/20 cotton-polyester blend at 480 GSM — heavyweight enough for Canadian winters, soft enough for everyday wear.',
  },
  {
    category: 'product',
    q: 'What does 480 GSM mean?',
    a: 'Grams per square meter. At 480 GSM, our hoodies sit in the heavyweight tier — dense hand-feel, lasting structure, and real warmth without stiffness.',
  },
  {
    category: 'product',
    q: 'Is the hoodie unisex?',
    a: 'Yes. Our oversized silhouette is designed to fit across genders. Check the size guide on each product page for the best match.',
  },
  {
    category: 'shipping',
    q: 'How long does shipping take?',
    a: 'Orders within Canada and the US typically arrive in 3–7 business days. International rates and timelines are calculated at checkout.',
  },
  {
    category: 'returns',
    q: 'What is your return policy?',
    a: 'Hassle-free returns on eligible, unworn items within 14 days of delivery. Contact support to start a return.',
  },
]
