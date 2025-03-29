import React from 'react';
import { View, StyleSheet } from 'react-native';
import Book from './Book';
import { BOOKSHELF_COLORS } from '../utils/colors';
import { Book as BookModel } from '../models/Book';

interface BookshelfProps {
  books: BookModel[];
  onPressBook: (book: BookModel) => void;
  defaultBookCount?: number;
}

const Bookshelf: React.FC<BookshelfProps> = ({ 
  books = [], 
  onPressBook,
  defaultBookCount = 9 
}) => {
  // Determine if one book should be slanted
  const slantedIndex = books.length > 0 ? Math.floor(Math.random() * books.length) : -1;
  
  // Create an array with the correct number of books
  const displayBooks = [...books];
  const grayColor = '#D7CCC8'; // Gray book color
  
  // Add gray books if we have fewer than the default count
  while (displayBooks.length < defaultBookCount) {
    displayBooks.push({
      id: `empty-${displayBooks.length}`,
      title: '',
      author: '',
      color: grayColor,
      progress: 0,
      addedDate: '',
    });
  }
  
  return (
    <View style={styles.shelfContainer}>
      <View style={styles.booksContainer}>
        {displayBooks.map((book, index) => (
          <Book 
            key={book.id} 
            color={book.color} 
            title={book.title}
            isSlanted={index === slantedIndex && book.title !== ''}
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
    height: 120,
    width: '100%',
    marginBottom: 10,
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