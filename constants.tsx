import { MenuItem, GalleryItem, SocialPost } from './types';

export const COLORS = {
  emerald: '#008A45',
  orange: '#FF6B00',
  white: '#FFFFFF',
  gray: '#F3F4F6',
  dark: '#0A0A0A'
};

export const MENU_CATEGORIES = ['All', 'Italian Classics', 'Sizzling Steaks', 'Authentic Desi', 'Artisan Desserts'];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    title: 'Alfredo Fettuccine',
    category: 'Italian Classics',
    price: 'PKR 1,450',
    priceNum: 1450,
    recommendation: 'Chef\'s Choice',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80&w=800',
    description: 'House-made fettuccine tossed in a velvet parmesan reduction with garlic-herb chicken.'
  },
  {
    id: 2,
    title: 'Aged Ribeye Steak',
    category: 'Sizzling Steaks',
    price: 'PKR 3,250',
    priceNum: 3250,
    recommendation: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=800',
    description: '28-day dry-aged prime beef seared in cast iron with rosemary-infused butter.'
  },
  {
    id: 3,
    title: 'Charsi Karahi',
    category: 'Authentic Desi',
    price: 'PKR 2,150',
    priceNum: 2150,
    recommendation: 'Heritage Flavor',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional Peshawari style chicken cooked in its own fat with green chilies and ginger.'
  },
  {
    id: 4,
    title: 'Prawn Linguine',
    category: 'Italian Classics',
    price: 'PKR 1,850',
    priceNum: 1850,
    recommendation: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800',
    description: 'Spicy tiger prawns, cherry tomatoes, and white wine emulsion over fresh linguine.'
  },
  {
    id: 5,
    title: 'Chicken Florentine',
    category: 'Italian Classics',
    price: 'PKR 1,650',
    priceNum: 1650,
    recommendation: 'Healthy Choice',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',
    description: 'Pan-seared chicken breast stuffed with spinach and ricotta, served with sun-dried tomato cream.'
  },
  {
    id: 6,
    title: 'T-Bone Sizzler',
    category: 'Sizzling Steaks',
    price: 'PKR 3,450',
    priceNum: 3450,
    recommendation: 'Premium Cut',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    description: 'Massive cut of T-bone steak, seasoned with our signature dry rub and seared in cast iron.'
  },
  {
    id: 7,
    title: 'Pistachio Kunafa',
    category: 'Artisan Desserts',
    price: 'PKR 950',
    priceNum: 950,
    recommendation: 'Must Try',
    image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional warm pastry with a melted cheese heart, soaked in rose syrup and topped with pistachios.'
  },
  {
    id: 8,
    title: 'Royal Mutton Handi',
    category: 'Authentic Desi',
    price: 'PKR 2,850',
    priceNum: 2850,
    recommendation: 'Royal Taste',
    image: 'https://images.unsplash.com/photo-1631233866348-439587469a9b?auto=format&fit=crop&q=80&w=1000',
    description: 'Slow-cooked mutton pieces in a traditional clay pot with a rich, aromatic blend of whole spices and cream.'
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', alt: 'Main Lounge' },
  { id: 2, url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800', alt: 'Outdoor Seating' },
  { id: 3, url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800', alt: 'Private Dining' },
  { id: 4, url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800', alt: 'Cocktail Bar' },
  { id: 5, url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800', alt: 'Live Kitchen' },
  { id: 6, url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800', alt: 'Interior Detail' }
];

export const SOCIAL_POSTS: SocialPost[] = [
  { id: 1, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400', caption: 'Goodbye 2025, Welcome 2026!' },
  { id: 2, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400', caption: 'Our Doors Are Open!' },
  { id: 3, imageUrl: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=400', caption: 'Chef Special: Smash Burger' },
  { id: 4, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400', caption: 'Authentic Italian Vibes' },
  { id: 5, imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400', caption: 'The Perfect Ambience' },
  { id: 6, imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400', caption: 'Weekend Specials' }
];