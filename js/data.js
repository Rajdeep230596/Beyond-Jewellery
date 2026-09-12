/* Catalogue data shared by the home, jewellery and collection pages.
   Wrapped so only window.BEYON reaches the global scope. */
(() => {

const IMG = (id, w = 700) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* Keys describe what is actually in the frame, so a piece never gets the
   wrong photograph. */
const SHOT = {
  pearlNecklace: "1515562141207-7a88fb7ce338",
  haloRing: "1605100804763-247f67b3557e",
  goldLayered: "1599643478518-a784e5dc4c8f",
  roseBracelet: "1611591437281-460bfbe1220a",
  diamondBracelet: "1573408301185-9146fe634ad0",
  chainBracelet: "1602173574767-37ac01994b2a",
  dropEarrings: "1535632787350-4e68ef0ac584",
  hoopEarrings: "1617038220319-276d3cfab638",
  modelNecklace: "1620656798579-1984d9e87df7",
  pendantChain: "1589128777073-263566ae5e4d",
  banglesHands: "1596944924616-7b38e7cfac36",
  gemRing: "1603561591411-07134e71a2a9",
  tennisBracelet: "1619119069152-a2b331eb392a",
  ringsSet: "1608042314453-ae338d80c427",
  ringStack: "1543294001-f7cd5d7fb516",
  modelNeckwear: "1600721391689-2564bb8055de",
};

const PRODUCTS = [
  { id: "by-101", name: "Orange Peel Drop Earrings", cat: "Earrings", cut: "Marquise", coll: "beYon The Cut", karat: "18 KT", price: 48900, mrp: 56400, badge: "Selling fast", rating: 4.9, reviews: 214, shots: [SHOT.dropEarrings, SHOT.hoopEarrings] },
  { id: "by-102", name: "Half Moon Halo Ring", cat: "Rings", cut: "Half Moon", coll: "beYon The Cut", karat: "18 KT", price: 92400, mrp: 104500, badge: "New", rating: 4.8, reviews: 96, shots: [SHOT.haloRing, SHOT.gemRing] },
  { id: "by-103", name: "Toi et Moi Stacker", cat: "Rings", cut: "Pear", coll: "beYon Limits", karat: "14 KT", price: 41200, mrp: 47800, badge: "Only 1 left", rating: 4.7, reviews: 58, shots: [SHOT.ringStack, SHOT.ringsSet] },
  { id: "by-104", name: "Nazar Evil Eye Pendant", cat: "Pendants", cut: "Round", coll: "beYon The Nazar", karat: "14 KT", price: 27600, mrp: 31900, badge: "Icon", rating: 4.9, reviews: 341, shots: [SHOT.goldLayered, SHOT.pendantChain] },
  { id: "by-105", name: "Baguette Line Bracelet", cat: "Bracelets", cut: "Baguette", coll: "beYon Bold", karat: "18 KT", price: 118500, mrp: 132000, badge: "", rating: 4.8, reviews: 72, shots: [SHOT.diamondBracelet, SHOT.tennisBracelet] },
  { id: "by-106", name: "Hexagon Hoop Earrings", cat: "Earrings", cut: "Hexagon", coll: "beYon The Cut", karat: "14 KT", price: 33800, mrp: 38400, badge: "", rating: 4.6, reviews: 129, shots: [SHOT.hoopEarrings, SHOT.dropEarrings] },
  { id: "by-107", name: "Infinite Love Mangalsutra", cat: "Mangalsutra", cut: "Round", coll: "InfiniteLove", karat: "18 KT", price: 64300, mrp: 72900, badge: "Bestseller", rating: 5.0, reviews: 188, shots: [SHOT.modelNeckwear, SHOT.pendantChain] },
  { id: "by-108", name: "Emerald Cut Eternity Band", cat: "Rings", cut: "Emerald", coll: "beYon Basics", karat: "18 KT", price: 87200, mrp: 96000, badge: "", rating: 4.9, reviews: 143, shots: [SHOT.gemRing, SHOT.haloRing] },
  { id: "by-109", name: "Kite Sway Neckwear", cat: "Neckwear", cut: "Kite", coll: "beYon Bold", karat: "18 KT", price: 154000, mrp: 168000, badge: "Atelier", rating: 4.8, reviews: 41, shots: [SHOT.goldLayered, SHOT.modelNecklace] },
  { id: "by-110", name: "Trillion Nosepin", cat: "Nosepins", cut: "Trillion", coll: "beYon Basics", karat: "9 KT", price: 12400, mrp: 14600, badge: "Everyday", rating: 4.7, reviews: 262, shots: [SHOT.ringsSet, SHOT.ringStack] },
  { id: "by-111", name: "Cushion Glow Bangle", cat: "Bangles", cut: "Cushion", coll: "beYon Limits", karat: "14 KT", price: 76800, mrp: 85200, badge: "", rating: 4.6, reviews: 64, shots: [SHOT.banglesHands, SHOT.roseBracelet] },
  { id: "by-112", name: "Oval Orbit Pendant & Chain", cat: "Pendants", cut: "Oval", coll: "beYon Basics", karat: "14 KT", price: 38900, mrp: 44100, badge: "", rating: 4.8, reviews: 156, shots: [SHOT.pendantChain, SHOT.goldLayered] },
  { id: "by-113", name: "Princess Duet Earrings", cat: "Earrings", cut: "Princess", coll: "beYon Limits", karat: "18 KT", price: 57400, mrp: 64800, badge: "Just dropped", rating: 4.9, reviews: 83, shots: [SHOT.dropEarrings, SHOT.hoopEarrings] },
  { id: "by-114", name: "Marquise Flame Solitaire", cat: "Solitaires", cut: "Marquise", coll: "beYon The Cut", karat: "18 KT", price: 214000, mrp: 236000, badge: "1.2 ct", rating: 5.0, reviews: 37, shots: [SHOT.gemRing, SHOT.haloRing] },
  { id: "by-115", name: "Heart Whisper Hoops", cat: "Earrings", cut: "Heart", coll: "InfiniteLove", karat: "14 KT", price: 29600, mrp: 34200, badge: "", rating: 4.7, reviews: 201, shots: [SHOT.hoopEarrings, SHOT.ringsSet] },
  { id: "by-116", name: "Round Brilliance Necklace", cat: "Necklace", cut: "Round", coll: "beYon Bold", karat: "18 KT", price: 186500, mrp: 202000, badge: "", rating: 4.9, reviews: 52, shots: [SHOT.pearlNecklace, SHOT.modelNeckwear] },
  { id: "by-117", name: "Pear Cascade Bracelet", cat: "Bracelets", cut: "Pear", coll: "beYon The Cut", karat: "14 KT", price: 68900, mrp: 77400, badge: "Selling fast", rating: 4.8, reviews: 118, shots: [SHOT.roseBracelet, SHOT.chainBracelet] },
  { id: "by-118", name: "Silver Nazar Charm Bracelet", cat: "Silver", cut: "Round", coll: "beYon The Nazar", karat: "Silver", price: 8900, mrp: 10900, badge: "Under ₹10k", rating: 4.5, reviews: 388, shots: [SHOT.tennisBracelet, SHOT.diamondBracelet] },
  { id: "by-119", name: "Multi Facet Cocktail Ring", cat: "Rings", cut: "Cushion", coll: "beYon Bold", karat: "18 KT", price: 132700, mrp: 146500, badge: "Multi facet", rating: 4.9, reviews: 29, shots: [SHOT.gemRing, SHOT.ringStack] },
  { id: "by-120", name: "Baguette Bar Pendant", cat: "Pendants", cut: "Baguette", coll: "beYon Basics", karat: "9 KT", price: 21400, mrp: 25100, badge: "", rating: 4.6, reviews: 174, shots: [SHOT.pendantChain, SHOT.modelNecklace] },
  { id: "by-121", name: "Emerald Drop Neckwear", cat: "Neckwear", cut: "Emerald", coll: "InfiniteLove", karat: "18 KT", price: 96400, mrp: 108200, badge: "", rating: 4.8, reviews: 66, shots: [SHOT.modelNecklace, SHOT.goldLayered] },
  { id: "by-122", name: "Oval Sculpt Bangle", cat: "Bangles", cut: "Oval", coll: "beYon Bold", karat: "18 KT", price: 141200, mrp: 156000, badge: "", rating: 4.7, reviews: 33, shots: [SHOT.chainBracelet, SHOT.banglesHands] },
  { id: "by-123", name: "Trillion Stack Trio", cat: "Rings", cut: "Trillion", coll: "beYon Limits", karat: "14 KT", price: 52300, mrp: 59800, badge: "Stackable", rating: 4.8, reviews: 91, shots: [SHOT.ringStack, SHOT.ringsSet] },
  { id: "by-124", name: "Princess Solitaire Ring", cat: "Solitaires", cut: "Princess", coll: "beYon Basics", karat: "18 KT", price: 108600, mrp: 119400, badge: "Certified", rating: 4.9, reviews: 77, shots: [SHOT.haloRing, SHOT.gemRing] },
];

const CUTS = [
  { name: "Baguette", note: "Long, linear, architectural", image: "assets/cuts/baguette.png?v=3)" },
  { name: "Cushion", note: "Soft square, endless fire", image: "assets/cuts/cushion.png?v=3)" },
  { name: "Emerald", note: "Step cut, hall-of-mirrors", image: "assets/cuts/emerald.png?v=3)" },
  { name: "Half Moon", note: "Cut clean, wears bold", image: "assets/cuts/half-moon.png?v=3)" },
  { name: "Heart", note: "Unapologetically romantic", image: "assets/cuts/heart.png?v=3)" },
  { name: "Hexagon", note: "Six sides of attitude", image: "assets/cuts/hexagon.png?v=3)" },
  { name: "Kite", note: "Sharp, off-kilter, alive", image: "assets/cuts/kite.png?v=3)" },
  { name: "Marquise", note: "Elongating, theatrical", image: "assets/cuts/marquise.png?v=3)" },
  { name: "Oval", note: "Classic with more surface", image: "assets/cuts/oval.png?v=3)" },
  { name: "Pear", note: "Half brilliant, half marquise", image: "assets/cuts/pear.png?v=3)" },
  { name: "Princess", note: "Square face, brilliant heart", image: "assets/cuts/princess.png?v=3)" },
  { name: "Round", note: "58 facets of pure return", image: "assets/cuts/round.png?v=3)" },
];

const COLLECTIONS = [
  {
    name: "beYon The Cut",
    line: "Shapes that refuse the usual",
    copy: "We gave laboratory-grown diamonds room to stretch, curve and break away. Marquise, baguette, kite — each cut does something of its own.",
    shot: SHOT.dropEarrings,
  },
  {
    name: "beYon Bold",
    line: "Gold turned all the way up",
    copy: "Heavier metal, unexpected stone placements and silhouettes built to be noticed from across the room. Playing it safe is not really our thing.",
    shot: SHOT.diamondBracelet,
  },
  {
    name: "beYon Limits",
    line: "Stack as far as you like",
    copy: "Wear as much or as little as you want. Stack the bracelets, swap the rings, layer the earrings — the only limit is how far you go.",
    shot: SHOT.ringStack,
  },
  {
    name: "beYon The Nazar",
    line: "A little luck, a lot of shine",
    copy: "The evil eye reimagined in laboratory-grown diamonds and enamel. Protective, playful and impossible to take off.",
    shot: SHOT.goldLayered,
  },
  {
    name: "InfiniteLove",
    line: "For the forever pieces",
    copy: "Mangalsutras, solitaires and heart cuts for the moments you plan to remember. Certified by Titan Company, made to be handed down.",
    shot: SHOT.modelNecklace,
  },
];

const CATEGORY_TILES = [
  { name: "Rings", count: "180+ designs", shot: SHOT.ringStack, size: "tile--xl" },
  { name: "Earrings", count: "140+ designs", shot: SHOT.dropEarrings, size: "tile--tall" },
  { name: "Pendants", count: "96 designs", shot: SHOT.pendantChain, size: "" },
  { name: "Bracelets & Bangles", count: "72 designs", shot: SHOT.banglesHands, size: "" },
  { name: "Neckwear", count: "58 designs", shot: SHOT.modelNeckwear, size: "tile--wide" },
  { name: "Solitaires", count: "40 certified stones", shot: SHOT.haloRing, size: "" },
  { name: "Silver", count: "Under ₹10,000", shot: SHOT.tennisBracelet, size: "" },
];

const TESTIMONIALS = [
  { text: "The half moon ring gets stopped in every meeting. It reads like a mined diamond because it is a diamond — just grown.", who: "Aanchal M., Bengaluru" },
  { text: "Ordered at 11pm, wore it to a wedding the next evening. The certificate and the hallmark were both in the box.", who: "Rhea S., Mumbai" },
  { text: "I came in for the silver and walked out with the baguette bracelet. Zero pressure, excellent coffee.", who: "Devika R., Delhi" },
  { text: "My husband proposed with the marquise solitaire. Three carats of conscience-free sparkle.", who: "Ira K., Hyderabad" },
];

const FAQS = [
  {
    tag: "Is it real?",
    q: "Are laboratory-grown diamonds real diamonds?",
    a: "Yes. Laboratory-grown diamonds are pure carbon crystals with the same brilliance, hardness and structure as mined diamonds. Only the origin is different — ours are grown in a controlled environment instead of being dug out of the earth.",
  },
  {
    tag: "Not CZ",
    q: "Is this the same as cubic zirconia or moissanite?",
    a: "No. Cubic zirconia and moissanite are simulants — different materials that imitate a diamond. A laboratory-grown diamond is a diamond, and it tests as one for hardness, thermal conductivity and sparkle.",
  },
  {
    tag: "Delivery",
    q: "How long does delivery take?",
    a: "Orders placed before 12 PM from metro cities are delivered the next day. Standard delivery elsewhere in India takes 2–7 business days, fully insured and signature-required.",
  },
  {
    tag: "Certification",
    q: "What comes in the box?",
    a: "An authenticity certificate by Titan Company confirming the laboratory-grown diamond details and a unique SKU ID, plus BIS/HUID hallmarking on the gold. The hallmark verifies the metal; the certificate covers the stone.",
  },
  {
    tag: "No fading",
    q: "Will the sparkle fade over time?",
    a: "No. Colour and brilliance are intrinsic to the crystal, not a surface coating. With normal wear and an occasional clean, it stays as bright as the day you opened the box.",
  },
  {
    tag: "Returns",
    q: "What is the return and exchange policy?",
    a: "Unworn pieces in original packaging can be returned within 7 days. There is no exchange on laboratory-grown diamonds; gold is exchanged at 100%* of the prevailing rate. Engraved and custom pieces are final sale.",
  },
];

const STORES = [
  { city: "Mumbai", area: "Jio World Drive, BKC", hours: "11 AM – 9 PM", note: "Flagship · Cut bar · Coffee", shot: SHOT.modelNeckwear },
  { city: "Bengaluru", area: "Indiranagar 12th Main", hours: "11 AM – 9 PM", note: "Try-on studio", shot: SHOT.banglesHands },
  { city: "Delhi NCR", area: "DLF Promenade, Vasant Kunj", hours: "11 AM – 10 PM", note: "Bridal appointments", shot: SHOT.modelNecklace },
  { city: "Hyderabad", area: "Jubilee Hills, Road 36", hours: "11 AM – 9 PM", note: "Stacking lounge", shot: SHOT.ringStack },
  { city: "Chennai", area: "Express Avenue", hours: "11 AM – 9:30 PM", note: "New", shot: SHOT.ringsSet },
  { city: "Pune", area: "Koregaon Park Plaza", hours: "11 AM – 9 PM", note: "Opening soon", shot: SHOT.dropEarrings },
];

window.BEYON = { IMG, SHOT, PRODUCTS, CUTS, COLLECTIONS, CATEGORY_TILES, TESTIMONIALS, FAQS, STORES };

})();
