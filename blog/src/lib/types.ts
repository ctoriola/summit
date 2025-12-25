// Blog post type definition
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogCategory {
  id: string;
  name: string;
}
