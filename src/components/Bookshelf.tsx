import React from 'react';
import { View, StyleSheet } from 'react-native';
import Book from './Book';
import { BOOKSHELF_COLORS, BOOK_COLORS } from '../utils/colors';
import { Book as BookModel } from '../models/Book';

interface BookshelfProps {
  books: BookModel[];
  onPressBook: (book: BookModel) => void;
  defaultBookCount?: number;
}

const Bookshelf: React.FC<BookshelfProps> = ({ 
  books = [], 
  onPressBook,
  defaultBookCount = 12  // Increased to fill the shelf horizontally
}) => {
  // Create an array with the correct number of books
  const displayBooks = [...books];
  const grayColor = '#D7CCC8'; // Gray book color  const brownColor = '#8D6E63'; // Brown color for empty books
  
  // Add placeholder books if we have fewer than the default count
  while (displayBooks.length < defaultBookCount) {
    displayBooks.push({
      id: `empty-${displayBooks.length}`,
      title: '',
      author: '',
      color: grayColor,
      progress: 0,
      addedDate: '',
      pages: 100, // Default minimum page count for empty books
      quotes: [],
    });
  }
  
  return (
    <View style={styles.shelfContainer}>
      <View style={styles.booksContainer}>
        {displayBooks.map((book) => (
          <Book 
            key={book.id} 
            color={book.color} 
            title={book.title}
            pages={book.pages}
            onPress={() => book.title ? onPressBook(book) : null}
          />
        ))}
      </View>
      <View style={styles.shelf} />
    </View>
  );
};

const styles = StyleSheet.create({
  shelfContainer: {
    height: 150, // Increased from 120 to accommodate taller books
    width: '100%',
    marginBottom: 15, // Increased from 10 for better spacing
  },
  booksContainer: {
    flexDirection: 'row',
    height: '85%',
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
  },
  shelf: {
    height: '15%',
    backgroundColor: BOOKSHELF_COLORS.shelf,
    width: '100%',
  },
});

export default Bookshelf; 