import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../models/Book';
import { BOOK_COLORS } from '../utils/colors';

const BOOKS_STORAGE_KEY = '@BookShelf:books';
const CURRENT_BOOK_KEY = '@BookShelf:currentBook';

export const saveBooks = async (books: Book[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error('Error saving books to storage:', error);
  }
};

export const getBooks = async (): Promise<Book[]> => {
  try {
    const booksJson = await AsyncStorage.getItem(BOOKS_STORAGE_KEY);
    return booksJson ? JSON.parse(booksJson) : [];
  } catch (error) {
    console.error('Error loading books from storage:', error);
    return [];
  }
};

export const addBook = async (title: string, author: string): Promise<Book | null> => {
  try {
    const books = await getBooks();
    const newBook: Book = {
      id: Date.now().toString(),
      title,
      author,
      color: getNextBookColor(books),
      progress: 0,
      addedDate: new Date().toISOString(),
    };
    
    await saveBooks([...books, newBook]);
    
    return newBook;
  } catch (error) {
    console.error('Error adding book:', error);
    return null;
  }
};

export const updateBookProgress = async (bookId: string, progress: number): Promise<void> => {
  try {
    const books = await getBooks();
    const updatedBooks = books.map(book => 
      book.id === bookId ? { ...book, progress } : book
    );
    
    await saveBooks(updatedBooks);
  } catch (error) {
    console.error('Error updating book progress:', error);
  }
};

export const setCurrentBook = async (bookId: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(CURRENT_BOOK_KEY, bookId);
  } catch (error) {
    console.error('Error setting current book:', error);
  }
};

export const getCurrentBookId = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(CURRENT_BOOK_KEY);
  } catch (error) {
    console.error('Error getting current book:', error);
    return null;
  }
};

// Helper function to determine next book color
const getNextBookColor = (books: Book[]): string => {
  const usedColors = books.map(book => book.color);
  const availableColors = BOOK_COLORS.filter(color => !usedColors.includes(color));
  
  if (availableColors.length > 0) {
    return availableColors[0];
  }
  
  // If all colors are used, cycle through them again
  return BOOK_COLORS[books.length % BOOK_COLORS.length];
}; 