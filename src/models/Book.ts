export interface Book {
  id: string;
  title: string;
  author: string;
  color: string;
  progress: number;
  addedDate: string;
  pages: number;
  quotes: Quote[];
}

export interface Quote {
  id: string;
  text: string;
  page?: number;
  createdAt: string;
} 