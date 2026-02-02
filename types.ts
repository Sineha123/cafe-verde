
export interface MenuItem {
  id: number;
  title: string;
  category: string;
  price: string;
  priceNum: number;
  recommendation: string;
  image: string;
  description: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface GalleryItem {
  id: number;
  url: string;
  alt: string;
}

export interface SocialPost {
  id: number;
  imageUrl: string;
  caption: string;
}
