/* The Protein Jungle — menu data
   Edit names / prices / photos here. `img` is a file in /assets/img/menu/ (leave null for the leaf placeholder).
   `tag` is optional: shows a small badge on the card. */
window.ORDER_URL = "https://the-protein-jungle.square.site";

window.MENU = [
  {
    id: "shakes",
    label: "Protein Shakes",
    blurb: "Our signature shakes — rich, creamy and dessert-worthy, built to keep you fueled.",
    items: [
      { name: "Tarzan", price: 10, img: "tarzan.webp", tag: "Fan favorite" },
      { name: "Panda", price: 10, img: "panda.webp" },
      { name: "Go Nuts", price: 10, img: "go-nuts.webp" },
      { name: "Strawberry Cheesecake", price: 10, img: "strawberry-cheesecake.webp" },
      { name: "Very Berry Cheesecake", price: 10, img: "very-berry-cheesecake.webp" },
      { name: "Pink Flamingo", price: 10, img: "pink-flamingo.webp" },
      { name: "Choco Coco", price: 10, img: "choco-coco.webp" },
      { name: "El Tucan", price: 10, img: "el-tucan.webp" },
      { name: "Rhino Berry", price: 10, img: "rhino-berry.webp" },
      { name: "Strawberry Banana", price: 10, img: "strawberry-banana.webp" },
      { name: "Mint Chimp", price: 10, img: null },
      { name: "Jungle Peanut", price: 10, img: null },
      { name: "Green Giant", price: 10, img: null },
      { name: "Tropical Fusion", price: 10, img: null },
      { name: "Horchata Crunch", price: 11, img: null },
      { name: "Mangoneada", price: 12, img: "mangoneada.webp", tag: "Must try" }
    ]
  },
  {
    id: "refreshers",
    label: "Refreshers & Teas",
    blurb: "Layered, colorful and ice-cold — a bright pick-me-up any time of day.",
    items: [
      { name: "Jumanji", price: 9, img: "jumanji.webp", tag: "Fan favorite" },
      { name: "Tahoe H2o", price: 8, img: "tahoe-h2o.webp" },
      { name: "Hawaiian Sunset", price: 8, img: "hawaiian-sunset.webp" },
      { name: "Georgia Peach", price: 8, img: "georgia-peach.webp" },
      { name: "Cucumber Lime", price: 8, img: "cucumber-lime.webp" },
      { name: "Sexy Hippo", price: 9, img: "sexy-hippo.webp" },
      { name: "Cool Cucumber", price: 9, img: "cool-cucumber.webp" },
      { name: "Amazon Sunset", price: 9, img: "amazon-sunset.webp" },
      { name: "Pineapple Rainforest", price: 9, img: "pineapple-rainforest.webp" },
      { name: "Sour Apple", price: 9, img: "sour-apple.webp" },
      { name: "Dragonfruit Oasis", price: 9, img: null },
      { name: "Western Watermelon", price: 9, img: null }
    ]
  },
  {
    id: "coffee",
    label: "Protein Coffee",
    blurb: "Yes, you CAN have coffee for breakfast — protein-packed and low in sugar.",
    items: [
      { name: "Churro", price: 9, img: "churro.webp" },
      { name: "Caramelo Macchiato", price: 9, img: "caramelo-macchiato.webp" },
      { name: "Abuelitas Mocha", price: 9, img: null },
      { name: "Salted Caramel", price: 9, img: null }
    ]
  },
  {
    id: "crepes",
    label: "Crepes & Waffles",
    blurb: "Sweet protein crepes and waffles — pair one with a shake for a complete breakfast.",
    items: [
      { name: "Dubai Crepe", price: 15, img: "dubai-crepe.webp", tag: "Must try" },
      { name: "Baloo Berry", price: 13, img: "baloo-berry.webp" },
      { name: "Bonzai Banana", price: 12, img: "bonzai-banana.webp" },
      { name: "Wildberry", price: 13, img: "wildberry.webp" },
      { name: "Chunky Monkey", price: 12, img: "chunky-monkey.webp" },
      { name: "Dubai Waffle", price: 15, img: null }
    ]
  },
  {
    id: "bowls",
    label: "Bowls & Oats",
    blurb: "Fresh-topped bowls and protein oats for a filling, feel-good meal.",
    items: [
      { name: "Berry Bowl", price: 12, img: "berry-bowl.webp" },
      { name: "Strawberry Banana Bowl", price: 12, img: null },
      { name: "Protein Oats", price: 9, img: "protein-oats.webp" }
    ]
  },
  {
    id: "savory",
    label: "Savory Pods",
    blurb: "Golden, toasty protein pods and melts — the savory side of the jungle.",
    items: [
      { name: "Teriyaki Chicken", price: 8.99, img: "teriyaki-chicken.webp" },
      { name: "Buffalo Chicken", price: 8.99, img: "buffalo-chicken.webp" },
      { name: "Turkey Melt", price: 7.99, img: "turkey-melt.webp" },
      { name: "Ham & Cheese Melt", price: 7.99, img: "ham-and-cheese-melt.webp" }
    ]
  },
  {
    id: "seasonal",
    label: "Spooky Season",
    seasonal: true,
    blurb: "Limited-time fall & Halloween drops — here for a good time, not a long time.",
    items: [
      { name: "Shaggy Shake", price: 11, img: "shaggy-shake.webp", tag: "Limited" },
      { name: "Scooby Snack Latte", price: 10, img: "scooby-snack-latte.webp", tag: "Limited" },
      { name: "Velmas Tea", price: 9, img: "velmas-tea.webp", tag: "Limited" },
      { name: "Daphnes Matcha", price: 8, img: "daphnes-matcha.webp", tag: "Limited" },
      { name: "Caramel Apple", price: 11, img: null, tag: "Limited" },
      { name: "Pumpkin Cinaswirl", price: 10, img: null, tag: "Limited" },
      { name: "Pumpkin Dolce", price: 11, img: null, tag: "Limited" },
      { name: "Shake Special", price: 8, img: null }
    ]
  }
];
