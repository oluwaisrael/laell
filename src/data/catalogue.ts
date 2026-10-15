import type { Collection, Product, ProductVariant } from "@/lib/types";
const variants = (
  id: string,
  color: string,
  colorHex: string,
  sizes = ["XS", "S", "M", "L", "XL"],
): ProductVariant[] =>
  sizes.map((size, i) => ({
    id: `${id}-${size}`,
    color,
    colorHex,
    size,
    stock: i === 4 ? 0 : 5,
  }));
export const products: Product[] = [
  {
    id: "p01",
    slug: "the-everyday-shirt",
    name: "The Everyday Shirt",
    category: "Clothing",
    price: 48000,
    images: ["/images/shirt.webp"],
    alt: "Ivory short sleeve camp collar shirt on a warm neutral background",
    description:
      "An easy silhouette, considered from every angle. A relaxed camp collar and a quiet, uncomplicated line. An exploration of the shirt you reach for, again and again.",
    fabric:
      "Sample concept: a linen-inspired woven texture. Final composition and sourcing are not yet confirmed.",
    care: "Care instructions will be confirmed with the final fabric and production samples.",
    variants: variants("p01", "Ivory", "#e5ddca"),
    sample: true,
  },
  {
    id: "p02",
    slug: "the-pleated-trouser",
    name: "The Pleated Trouser",
    category: "Clothing",
    price: 65000,
    images: ["/images/trousers.webp"],
    alt: "Carbon black wide leg pleated trousers against a neutral studio background",
    description:
      "A little structure. A little ease. A generous leg and a clean waist explore a more relaxed approach to everyday tailoring.",
    fabric:
      "Sample concept: a softly structured woven fabric. Final composition and sourcing are not yet confirmed.",
    care: "Final garment care guidance will be provided before this design becomes available.",
    variants: variants("p02", "Carbon", "#171717"),
    sample: true,
  },
  {
    id: "p03",
    slug: "the-column-dress",
    name: "The Column Dress",
    category: "Clothing",
    price: 78000,
    images: ["/images/dress.webp"],
    alt: "Stone sleeveless column dress with a square neckline",
    description:
      "A continuous line, a natural movement. An understated study in proportion, designed to move easily between moments.",
    fabric:
      "Sample concept: a natural-looking woven texture. Final composition and sourcing are not yet confirmed.",
    care: "Final garment care guidance will be provided before this design becomes available.",
    variants: variants("p03", "Stone", "#b9ac97"),
    sample: true,
  },
  {
    id: "p04",
    slug: "the-day-tote",
    name: "The Day Tote",
    category: "Accessories",
    price: 28000,
    images: ["/images/tote.webp"],
    alt: "Deep burgundy canvas tote bag with two handles",
    description:
      "Room for the everyday. A simple, generous carryall in a deep burgundy tone, exploring the meeting point of usefulness and form.",
    fabric:
      "Sample concept: a heavyweight canvas texture. Final composition and dimensions are not yet confirmed.",
    care: "Care instructions will be confirmed after material and colourfastness testing.",
    variants: variants("p04", "Burgundy", "#69362f", ["One size"]),
    sample: true,
  },
];
export const collections: Collection[] = [
  {
    slug: "first-forms",
    title: "First forms",
    description:
      "A study in everyday essentials. Familiar pieces, thoughtfully reconsidered.",
    productIds: products.map((p) => p.id),
  },
];
export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
