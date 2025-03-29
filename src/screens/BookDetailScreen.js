import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import BookDB from '../database/schema';
import { realm } from '../database/schema';
import { BOOKSHELF_COLORS } from '../utils/colors';

const BookDetailScreen = () => {
  const [book, setBook] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { bookId } = route.params;

  useEffect(() => {
    // Find the book with the given ID
    const foundBook = realm.objectForPrimaryKey('Book', bookId);
    if (foundBook) {
      setBook({ ...foundBook });
    }
  }, [bookId]);

  const handleMarkAsRead = () => {
    if (book) {
      BookDB.updateBook({
        ...book,
        isRead: !book.isRead,
      });
      setBook({ ...book, isRead: !book.isRead });
    }
  };

  const handleDeleteBook = () => {
    Alert.alert(
      'Delete Book',
      'Are you sure you want to delete this book?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            BookDB.deleteBook(bookId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (!book) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#6D4C41" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{book.title}</Text>
        <TouchableOpacity onPress={handleDeleteBook} style={styles.deleteButton}>
          <Icon name="trash-2" size={24} color="#6D4C41" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={[styles.bookCover, { backgroundColor: book.coverColor }]}>
          <Text style={styles.bookTitle}>{book.title}</Text>
        </View>

        <View style={styles.bookInfo}>
          <Text style={styles.author}>By {book.author}</Text>
          <TouchableOpacity onPress={handleMarkAsRead} style={styles.readButton}>
            <Icon
              name={book.isRead ? 'check-circle' : 'circle'}
              size={20}
              color="#6D4C41"
            />
            <Text style={styles.readButtonText}>
              {book.isRead ? 'Marked as Read' : 'Mark as Read'}
            </Text>
          </TouchableOpacity>
        </View>

        {book.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{book.description}</Text>
          </View>
        ) : null}

        {book.content ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Content</Text>
            <Text style={styles.content}>{book.content}</Text>
          </View>
        ) : null}
      </ScrollView>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: '#6D4C41',
    fontWeight: '500',
  },
  bookCover: {
    height: 200,
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bookInfo: {
    marginBottom: 20,
  },
  author: {
    fontSize: 18,
    color: '#6D4C41',
    marginBottom: 10,
    textAlign: 'center',
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#E0D4C2',
    borderRadius: 8,
    alignSelf: 'center',
  },
  readButtonText: {
    color: '#6D4C41',
    marginLeft: 8,
    fontSize: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0D4C2',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6D4C41',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  content: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
});

export default BookDetailScreen; 