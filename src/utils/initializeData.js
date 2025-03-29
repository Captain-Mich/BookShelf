import BookDB, { realm } from '../database/schema';
import { generateSampleBooks } from './sampleData';

export const initializeDatabase = () => {
  // Check if the database is empty
  const existingBooks = BookDB.getAllBooks();
  
  if (existingBooks.length === 0) {
    // Add sample books to the database
    const sampleBooks = generateSampleBooks();
    sampleBooks.forEach(book => {
      BookDB.addBook(book);
    });
    console.log('Database initialized with sample data');
  } else {
    console.log('Database already contains data');
  }
}; 