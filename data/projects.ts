export type Project = {
  id: number;
  image: string;
  alt: string;
  clientName?: string;
  title?: string;
  type?: string;
  aspect?: "portrait" | "square" | "landscape";
};

export const seriesOne: Project[] = [
  {
    id: 1,
    image: "/work/01.webp",
    alt: "Post 01 — Social media design",
    type: "Social Media Design",
    aspect: "portrait",
  },
  {
    id: 2,
    image: "/work/02.webp",
    alt: "Post 02 — Social media design",
    type: "Social Media Design",
    aspect: "portrait",
  },
  {
    id: 3,
    image: "/work/03.webp",
    alt: "Post 03 — Social media design",
    type: "Social Media Design",
    aspect: "portrait",
  },
  {
    id: 4,
    image: "/work/04.webp",
    alt: "Post 04 — Social media design",
    type: "Social Media Design",
    aspect: "portrait",
  },
  {
    id: 5,
    image: "/work/05.webp",
    alt: "Post 05 — Social media design",
    type: "Social Media Design",
    aspect: "portrait",
  },
];

export const seriesTwo: Project[] = [
  {
    id: 6,
    image: "/work/06.webp",
    alt: "Post 06 — Social media design",
    type: "Social Media Design",
    aspect: "portrait",
  },
  {
    id: 7,
    image: "/work/07.webp",
    alt: "Post 07 — Social media design",
    type: "Social Media Design",
    aspect: "portrait",
  },
  {
    id: 8,
    image: "/work/08.webp",
    alt: "Post 08 — Social media design",
    type: "Social Media Design",
    aspect: "portrait",
  },
  {
    id: 9,
    image: "/work/09.webp",
    alt: "Post 09 — Social media design",
    type: "Social Media Design",
    aspect: "portrait",
  },
  {
    id: 10,
    image: "/work/10.webp",
    alt: "Post 10 — Social media design",
    type: "Social Media Design",
    aspect: "portrait",
  },
  {
    id: 11,
    image: "/work/11.webp",
    alt: "Post 11 — Social media design",
    type: "Social Media Design",
    aspect: "portrait",
  },
  {
    id: 12,
    image: "/work/12.webp",
    alt: "Post 12 — Social media design",
    type: "Social Media Design",
    aspect: "portrait",
  },
];

export const allProjects: Project[] = [...seriesOne, ...seriesTwo];

export const siteInfo = {
  name: "GUNA",
  role: "VISUAL DESIGNER",
  location: "Coimbatore, India",
  email: "guna9514@gmail.com",
  linkedin: "https://www.linkedin.com/in/guna-s23",
  behance: "https://www.behance.net/gunaS23",
  availability: "OPEN TO SELECTED CREATIVE OPPORTUNITIES",
  experience: {
    company: "CREARX",
    role: "Visual Designer",
    duration: "1 YEAR",
  },
  education: {
    school: "SNS COLLEGE OF ENGINEERING",
    degree: "B.E. Mechanical Engineering",
    years: "2021 — 2025",
  },
  tools: ["FIGMA", "ADOBE PHOTOSHOP", "ADOBE ILLUSTRATOR", "FRAMER"],
  capabilities: [
    "SOCIAL MEDIA DESIGN",
    "VISUAL DESIGN",
    "GRAPHIC DESIGN",
    "CAMPAIGN VISUALS",
    "BRAND COMMUNICATION",
    "ART DIRECTION",
  ],
  bio: "I'm Guna, a visual designer based in Coimbatore, focused on creating visual communication for social media, brands and digital platforms. I work with typography, composition and visual direction to turn ideas into clear, distinctive visuals.",
} as const;

export function formatPostLabel(id: number): string {
  return `POST ${String(id).padStart(2, "0")}`;
}

export function formatCarouselIndex(index: number, total: number): string {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}
