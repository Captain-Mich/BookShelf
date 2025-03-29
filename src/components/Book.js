import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Book = ({ book, onPress, isLeaning = false }) => {
  // Determine the style based on whether the book is leaning
  const bookWrapperStyle = isLeaning
    ? [styles.bookWrapper, styles.leaningBook]
    : styles.bookWrapper;

  return (
    <TouchableOpacity onPress={() => onPress(book)} style={bookWrapperStyle}>
      <View style={[styles.book, { backgroundColor: book.coverColor }]}>
        <Text style={styles.bookTitle}>{book.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookWrapper: {
    height: '90%',
    width: 30,
    marginHorizontal: 5,
  },
  leaningBook: {
    transform: [{ rotate: '10deg' }],
  },
  book: {
    flex: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookTitle: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    transform: [{ rotate: '-90deg' }],
    width: 100,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default Book; 