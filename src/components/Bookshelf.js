import React from 'react';
import { View, StyleSheet } from 'react-native';
import Book from './Book';
import { BOOKSHELF_COLORS } from '../utils/colors';

const Bookshelf = ({ books, onBookPress }) => {
  // Determine which books should lean (every 5th book)
  const renderBooks = () => {
    return books.map((book, index) => {
      const isLeaning = index % 5 === 3; // Make occasional books lean
      return (
        <Book
          key={book.id}
          book={book}
          onPress={onBookPress}
          isLeaning={isLeaning}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.booksContainer}>
        {renderBooks()}
      </View>
      <View style={styles.shelf} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '100%',
    marginBottom: 10,
  },
  booksContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  shelf: {
    height: 10,
    backgroundColor: BOOKSHELF_COLORS.shelf,
  },
});

export default Bookshelf; 