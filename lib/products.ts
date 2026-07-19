export type Product = {
  slug: string
  index: string
  name: string
  design: string
  material: string
  lens: string
  price: string
  line: string
  copy: string
  accent: string
  image: string
  film: string
  /** Brightness that lifts this clip's studio backdrop to pure white. */
  filmLift: number
}

export const products: Product[] = [
  {
    slug: 'parisian-noir',
    index: '01',
    name: 'Parisian Noir',
    design: 'Design 1',
    material: 'Polished black acetate',
    lens: 'Smoke grey — Cat. 3',
    price: '€340',
    line: 'Oversized. Unbothered.',
    copy: 'A squared silhouette cut from a single block of acetate, hand-polished for eleven hours. Made for the woman who arrives last and leaves first.',
    accent: '#2B2B2E',
    image: '/products/parisian-noir.webp',
    film: '/films/parisian-noir.mp4',
    filmLift: 1.072,
  },
  {
    slug: 'rive-gauche',
    index: '02',
    name: 'Rive Gauche',
    design: 'Design 2',
    material: 'Tortoise acetate, gold bridge',
    lens: 'Amber gradient — Cat. 2',
    price: '€360',
    line: 'Soft edges, sharp mind.',
    copy: 'A cat-eye softened at the temple, mounted on a gilded bridge. Left Bank light, held in tortoiseshell.',
    accent: '#A9703C',
    image: '/products/rive-gauche.webp',
    film: '/films/rive-gauche.mp4',
    filmLift: 1.012,
  },
  {
    slug: 'louvre-light',
    index: '03',
    name: 'Louvre Light',
    design: 'Design 3',
    material: '18k gold-plated titanium',
    lens: 'Rose tint — Cat. 2',
    price: '€420',
    line: 'Weightless by design.',
    copy: 'Nineteen grams of gold-plated titanium and nothing else. A double bridge drawn with a single line.',
    accent: '#C0A062',
    image: '/products/louvre-light.webp',
    film: '/films/louvre-light.mp4',
    filmLift: 1.025,
  },
  {
    slug: 'marais-slim',
    index: '04',
    name: 'Marais Slim',
    design: 'Design 4',
    material: 'Matte black metal',
    lens: 'Bottle green — Cat. 3',
    price: '€380',
    line: 'The quiet one.',
    copy: 'A thin round frame with green glass, built to disappear on the face and stay in the memory.',
    accent: '#4A5A46',
    image: '/products/marais-slim.webp',
    film: '/films/marais-slim.mp4',
    filmLift: 1.046,
  },
  {
    slug: 'seine-clear',
    index: '05',
    name: 'Seine Clear',
    design: 'Design 5',
    material: 'Crystal acetate',
    lens: 'Pale blue — Cat. 2',
    price: '€350',
    line: 'Water, wearable.',
    copy: 'Transparent acetate with a faint blue wash, so the frame reads as light rather than object.',
    accent: '#8FA9C4',
    image: '/products/seine-clear.webp',
    film: '/films/seine-clear.mp4',
    filmLift: 1.012,
  },
]
