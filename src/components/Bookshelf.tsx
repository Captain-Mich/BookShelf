import React from 'react';
import { View, StyleSheet } from 'react-native';
import Book from './Book';
import { BOOKSHELF_COLORS } from '../utils/colors';

interface BookshelfProps {
  bookColors: string[];
  onPressBook: (bookColor: string) => void;
}

const Bookshelf: React.FC<BookshelfProps> = ({ bookColors, onPressBook }) => {
  // Determine if one book should be slanted
  const slantedIndex = bookColors.length > 6 ? Math.floor(Math.random() * bookColors.length) : -1;
  
  return (
    <View style={styles.shelfContainer}>
      <View style={styles.booksContainer}>
        {bookColors.map((color: string, index: number) => (
          <Book 
            key={index} 
            color={color} 
            isSlanted={index === slantedIndex}
            onPress={() => onPressBook(color)}
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