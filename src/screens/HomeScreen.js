import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Text, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Bookshelf from '../components/Bookshelf';
import Icon from 'react-native-vector-icons/Feather';
import BookDB from '../database/schema';
import { BOOKSHELF_COLORS } from '../utils/colors';

const BOOKS_PER_SHELF = 8;

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Load books from the database
    const loadBooks = () => {
      const allBooks = BookDB.getAllBooks();
      setBooks(Array.from(allBooks));
    };

    loadBooks();

    // Set up a listener for focusing the screen to refresh books
    const unsubscribe = navigation.addListener('focus', loadBooks);
    return unsubscribe;
  }, [navigation]);

  // Split books into shelves
  const bookShelves = [];
  for (let i = 0; i < books.length; i += BOOKS_PER_SHELF) {
    bookShelves.push(books.slice(i, i + BOOKS_PER_SHELF));
  }

  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { bookId: book.id });
  };

  const handleAddBook = () => {
    navigation.navigate('AddBook');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>BOOKSELF</Text>
        <TouchableOpacity onPress={handleAddBook} style={styles.addButton}>
          <Icon name="plus" size={24} color="#6D4C41" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {bookShelves.map((shelf, index) => (
          <Bookshelf key={index} books={shelf} onBookPress={handleBookPress} />
        ))}
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tab}>
          <Icon name="book-open" size={24} color="#6D4C41" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Icon name="book" size={24} color="#6D4C41" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Icon name="bookmark" size={24} color="#6D4C41" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BOOKSHELF_COLORS.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#6D4C41',
    fontWeight: '300',
    letterSpacing: 3,
  },
  addButton: {
    padding: 8,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#F0E6D6',
    borderTopWidth: 1,
    borderTopColor: '#E0D4C2',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default HomeScreen; 