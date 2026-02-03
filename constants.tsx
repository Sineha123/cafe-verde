import { MenuItem, GalleryItem, SocialPost } from './types';

export const COLORS = {
  emerald: '#008A45',
  orange: '#FF6B00',
  white: '#FFFFFF',
  gray: '#F3F4F6',
  dark: '#0A0A0A',
  footer: '#002E17'
};

export const REVIEWS = [
  {
    id: 1,
    name: "Sarah J. Ahmed",
    role: "Food Critic",
    content: "An absolute masterclass in flavor balancing. The Alfredo is unlike anything I've had in the country. The ambiance is just the cherry on top.",
    rating: 5
  },
  {
    id: 2,
    name: "Omar Qureshi",
    role: "Frequent Diner",
    content: "Cafe Verde isn't just a restaurant; it's an experience. The attention to detail from the staff to the plating is world-class.",
    rating: 5
  },
  {
    id: 3,
    name: "Laila Khan",
    role: "Architect",
    content: "The intersection of brutalist design and organic culinary arts here is staggering. Every corner of the restaurant is a photograph.",
    rating: 5
  }
];

export const MENU_CATEGORIES = ['All', 'Appetizers', 'Italian Classics', 'Sizzling Steaks', 'Authentic Desi', 'Artisan Desserts', 'Beverages'];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    title: 'Alfredo Fettuccine',
    category: 'Italian Classics',
    price: 'PKR 1,450',
    priceNum: 1450,
    recommendation: 'Chef\'s Choice',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=1200',
    description: 'House-made fettuccine tossed in a velvet parmesan reduction with garlic-herb chicken and finished with 24-month aged Grana Padano.'
  },
  {
    id: 2,
    title: 'Aged Ribeye Steak',
    category: 'Sizzling Steaks',
    price: 'PKR 3,250',
    priceNum: 3250,
    recommendation: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=1200',
    description: '28-day dry-aged prime beef seared in cast iron with rosemary-infused butter and served with truffle-infused marrow jus.'
  },
  {
    id: 3,
    title: 'Truffle Parmesan Fries',
    category: 'Appetizers',
    price: 'PKR 850',
    priceNum: 850,
    recommendation: 'Perfect Share',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=1200',
    description: 'Double-fried hand-cut potatoes tossed in white truffle oil, rosemary, and finished with a snow of aged Pecorino.'
  },
  {
    id: 4,
    title: 'Charsi Karahi',
    category: 'Authentic Desi',
    price: 'PKR 2,150',
    priceNum: 2150,
    recommendation: 'Heritage Flavor',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=1200',
    description: 'Traditional Peshawari style chicken cooked in its own fat with hand-selected green chilies and fresh-cut ginger juliennes.'
  },
  {
    id: 5,
    title: 'Verde Signature Burger',
    category: 'Appetizers',
    price: 'PKR 1,650',
    priceNum: 1650,
    recommendation: 'Modern Classic',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1200',
    description: 'Wagyu beef blend, caramelized balsamic onions, sharp cheddar, and our secret Verde emulsion on a toasted brioche bun.'
  },
  {
    id: 6,
    title: 'Margherita Artisan Pizza',
    category: 'Italian Classics',
    price: 'PKR 1,250',
    priceNum: 1250,
    recommendation: 'Wood Fired',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=1200',
    description: '48-hour fermented sourdough, San Marzano tomatoes, fresh buffalo mozzarella, and garden-picked basil.'
  },
  {
    id: 7,
    title: 'Paneer Reshmi Kabab',
    category: 'Authentic Desi',
    price: 'PKR 1,150',
    priceNum: 1150,
    recommendation: 'Desi Delight',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1200',
    description: 'Velvety paneer cubes marinated in cream and white pepper, charred in the clay oven for a melt-in-mouth texture.'
  },
  {
    id: 8,
    title: 'Moroccan Mint Tea',
    category: 'Beverages',
    price: 'PKR 450',
    priceNum: 450,
    recommendation: 'Verde Special',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=1200',
    description: 'Traditional gunpowder green tea steeped with fresh spearmint and lightly sweetened for a refreshing finish.'
  },
  {
    id: 9,
    title: 'Biscoff Cheesecake',
    category: 'Artisan Desserts',
    price: 'PKR 950',
    priceNum: 950,
    recommendation: 'Final Note',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=1200',
    description: 'Creamy New York style cheesecake with a Lotus Biscoff crust, topped with melted cookie butter and crushed biscuits.'
  },
  {
    id: 10,
    title: 'Prawn Linguine',
    category: 'Italian Classics',
    price: 'PKR 1,850',
    priceNum: 1850,
    recommendation: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=1200',
    description: 'Spicy tiger prawns, cherry tomatoes, and white wine emulsion over fresh linguine, garnished with micro-greens.'
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', alt: 'Main Lounge' },
  { id: 2, url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800', alt: 'Outdoor Seating' },
  { id: 3, url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800', alt: 'Private Dining' }
];

export const SOCIAL_POSTS: SocialPost[] = [
  { id: 1, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400', caption: 'Signature Plating' },
  { id: 2, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400', caption: 'The Verde Vibe' },
  { id: 3, imageUrl: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=400', caption: 'Weekend Specials' },
  { id: 4, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400', caption: 'Artisan Wood Fired' }
];