// Fictitious product catalog for the Marlow & Rue demo.
// `swatch` drives the placeholder "photo" (gradient block) until real photography is added.
// `batch` is the fictional small-batch run: its number, size, and how many are left.

export const products = [
  {
    slug: "ash-glaze-carafe",
    name: "Ash Glaze Carafe",
    category: "Ceramics",
    price: 68,
    featured: true,
    swatch: ["#C7C2B4", "#8A6F4E"],
    batch: { no: 3, size: 40, left: 17 },
    maker: "ines",
    description:
      "Hand-thrown stoneware finished in a smoke-fired ash glaze, so no two carafes carry quite the same mottling. Holds just over a litre — enough for a slow Sunday of pouring.",
    details: [
      "Stoneware, ash glaze",
      "Approx. 1.1L capacity",
      "Hand wash recommended",
    ],
  },
  {
    slug: "linden-linen-throw",
    name: "Linden Linen Throw",
    category: "Textiles",
    price: 96,
    featured: true,
    swatch: ["#DAD5C8", "#C9522E"],
    batch: { no: 2, size: 30, left: 9 },
    maker: "odette",
    description:
      "Heavyweight stonewashed linen woven in small batches, with a single rust pinstripe along the border. Softens with every wash rather than wearing thin.",
    details: [
      "100% stonewashed linen",
      "130cm x 180cm",
      "Machine washable, cold",
    ],
  },
  {
    slug: "ember-soy-candle",
    name: "Ember Soy Candle",
    category: "Home",
    price: 34,
    featured: true,
    swatch: ["#2B2E28", "#C9522E"],
    batch: { no: 5, size: 48, left: 31 },
    maker: "wren",
    description:
      "Cedar, clove, and a trace of dried orange peel, poured into a reusable matte stoneware vessel. Roughly 45 hours of burn time.",
    details: [
      "Soy wax blend",
      "45 hr burn time",
      "Vessel reusable as a planter",
    ],
  },
  {
    slug: "wheatfield-table-runner",
    name: "Wheatfield Table Runner",
    category: "Textiles",
    price: 52,
    featured: false,
    swatch: ["#EDE7D9", "#8A6F4E"],
    batch: { no: 4, size: 24, left: 12 },
    maker: "odette",
    description:
      "Undyed cotton runner with a raw hem finish, woven with a subtle wheat-ear jacquard pattern that only shows in raking light.",
    details: ["100% undyed cotton", "35cm x 210cm", "Hand wash cold"],
  },
  {
    slug: "quarry-stone-bowl-set",
    name: "Quarry Stone Bowl Set",
    category: "Ceramics",
    price: 84,
    featured: false,
    swatch: ["#B9B2A0", "#2B2E28"],
    batch: { no: 6, size: 20, left: 4 },
    maker: "ines",
    description:
      "Set of four nesting bowls in a matte quarry-stone finish, sized for everything from morning oats to evening olives.",
    details: [
      "Set of 4, stoneware",
      "Dishwasher safe",
      "Nesting for compact storage",
    ],
  },
  {
    slug: "moss-wool-cushion",
    name: "Moss Wool Cushion",
    category: "Textiles",
    price: 58,
    featured: false,
    swatch: ["#6E7A5E", "#DAD5C8"],
    batch: { no: 1, size: 36, left: 22 },
    maker: "odette",
    description:
      "Undyed wool cushion cover in a deep moss tone, finished with a hand-stitched flange edge. Insert included.",
    details: ["Wool cover, feather insert", "45cm x 45cm", "Spot clean only"],
  },
  {
    slug: "clay-pour-vase",
    name: "Clay Pour Vase",
    category: "Ceramics",
    price: 72,
    featured: false,
    swatch: ["#8A6F4E", "#F7F3EC"],
    batch: { no: 2, size: 25, left: 0 },
    maker: "ines",
    description:
      "A single continuous pour gives this vase its asymmetric silhouette. Each piece is signed and numbered on the base.",
    details: [
      "Stoneware, unglazed exterior",
      "Approx. 28cm tall",
      "Signed and numbered",
    ],
  },
  {
    slug: "harvest-amber-candle",
    name: "Harvest Amber Candle",
    category: "Home",
    price: 34,
    featured: false,
    swatch: ["#A8672E", "#2B2E28"],
    batch: { no: 3, size: 48, left: 26 },
    maker: "wren",
    description:
      "Warm amber, fig leaf, and a base note of sandalwood — poured for the shift from late summer into autumn.",
    details: [
      "Soy wax blend",
      "45 hr burn time",
      "Vessel reusable as a planter",
    ],
  },
];

export const CATEGORIES = ["Ceramics", "Textiles", "Home"];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getRelated(product, n = 3) {
  const same = products.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  );
  const rest = products.filter(
    (p) => p.category !== product.category && p.slug !== product.slug,
  );
  return [...same, ...rest].slice(0, n);
}

export function getLowStock(max = 10) {
  return products
    .filter((p) => p.batch.left > 0 && p.batch.left <= max)
    .sort((a, b) => a.batch.left - b.batch.left);
}

export const makers = [
  {
    id: "ines",
    name: "Ines Calloway",
    craft: "Potter",
    pic: "maker-ines",
    tone: ["#C7C2B4", "#8A6F4E"],
    text: "Throws every carafe, bowl and vase on the same wheel she bought second-hand eleven years ago.",
  },
  {
    id: "odette",
    name: "Odette Marsh",
    craft: "Weaver",
    pic: "maker-odette",
    tone: ["#DAD5C8", "#6E7A5E"],
    text: "Weaves linen, cotton and wool in runs small enough that she knows which loom made which piece.",
  },
  {
    id: "wren",
    name: "Wren Tolliver",
    craft: "Chandler",
    pic: "maker-wren",
    tone: ["#A8672E", "#2B2E28"],
    text: "Pours each candle by hand and tests every new scent for a full burn before it goes on the shelf.",
  },
];

export const makerById = (id) => makers.find((m) => m.id === id);

export const TRUST = [
  {
    icon: "box",
    title: "Free shipping over $100",
    text: "A flat $9 under that. Ships every Thursday.",
  },
  {
    icon: "hands",
    title: "Fewer than fifty a run",
    text: "Made by hand in one studio. When it is gone, it is gone.",
  },
  {
    icon: "return",
    title: "30-day returns",
    text: "Not right in your home? Send it back, no fuss.",
  },
  {
    icon: "pin",
    title: "Visit the studio",
    text: "14 Foundry Lane, Studio 3. Open Thu–Sun, 11–5.",
  },
];

export const NOTES = [
  {
    name: "Hannah R.",
    item: "Ash Glaze Carafe",
    quote:
      "The glaze is different on every side. Mine has a smoky patch that looks like a small weather system.",
  },
  {
    name: "Theo B.",
    item: "Linden Linen Throw",
    quote:
      "Stiff out of the box and impossibly soft after two washes. I have bought a second one for my mother.",
  },
  {
    name: "Mireille D.",
    item: "Ember Soy Candle",
    quote:
      "It smells like a campfire in a good coat. The jar is now a planter on my windowsill.",
  },
];

export const MATERIALS = [
  "STONEWARE",
  "LINEN",
  "SOY WAX",
  "UNDYED COTTON",
  "WOOL",
  "ASH GLAZE",
  "CEDAR",
  "SMALL BATCH",
];

export const SHIPPING = { threshold: 100, flat: 9 };
export const PROMO = { code: "SLOW10", percent: 10 };
