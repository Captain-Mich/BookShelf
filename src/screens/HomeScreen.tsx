import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Modal, ScrollView } from 'react-native';
import { BOOKSHELF_COLORS } from '../utils/colors';
import Bookshelf from '../components/Bookshelf';
import BottomNavigation from '../components/BottomNavigation';
import { PlusIcon, ProfileIcon } from '../components/Icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getBooks } from '../services/BookStorage';
import { Book } from '../models/Book';
import BottomMenu from '../components/BottomMenu';
import QuoteModal from '../components/QuoteModal';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [quoteModalVisible, setQuoteModalVisible] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  
  // Load books when component mounts
  const loadBooks = async () => {
    const storedBooks = await getBooks();
    setBooks(storedBooks);
  };

  useEffect(() => {
    loadBooks();
    
    // Also reload books when the screen comes into focus (returning from add book)
    const unsubscribe = navigation.addListener('focus', loadBooks);
    return unsubscribe;
  }, [navigation]);

  const handlePressBook = (book: Book) => {
    navigation.navigate('BookDetail', { bookColor: book.color });
  };

  const handleNavigateToReading = () => {
    if (books.length > 0) {
      navigation.navigate('Reading', { bookColor: books[0].color });
    } else {
      navigation.navigate('Reading', { bookColor: BOOKSHELF_COLORS.shelf });
    }
  };

  const handleNavigateToQuotes = () => {
    navigation.navigate('Quotes');
  };
  
  const handleAddBook = () => {
    setModalVisible(false);
    navigation.navigate('AddBook');
  };
  
  const handleAddQuote = () => {
    setModalVisible(false);
    setQuoteModalVisible(true);
  };

  // Group books into shelves for display
  const getBooksForShelf = (shelfIndex: number, booksPerShelf: number = 6): Book[] => {
    const startIndex = shelfIndex * booksPerShelf;
    const endIndex = startIndex + booksPerShelf;
    return books.slice(startIndex, endIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={BOOKSHELF_COLORS.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setModalVisible(true)}
        >
          <PlusIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BOOKSELF</Text>
        <TouchableOpacity style={styles.headerButton}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>
      
      {/* Scrollable Bookshelf content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Bookshelf books={getBooksForShelf(0)} onPressBook={handlePressBook} />
        <Bookshelf books={getBooksForShelf(1)} onPressBook={handlePressBook} />
        <Bookshelf books={getBooksForShelf(2)} onPressBook={handlePressBook} />
        <Bookshelf books={getBooksForShelf(3)} onPressBook={handlePressBook} />
      </ScrollView>
      
      {/* Bottom Navigation */}
      <BottomMenu activeTab="bookshelf" />

      {/* Modal for Add Quote or Add Book */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleAddQuote}
            >
              <View style={styles.bookmarkIcon} />
              <Text style={styles.modalButtonText}>Add Quote</Text>
            </TouchableOpacity>
            
            <Text style={styles.orText}>OR</Text>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleAddBook}
            >
              <View style={styles.bookIcon} />
              <Text style={styles.modalButtonText}>Add Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Quote Modal */}
      <QuoteModal 
        visible={quoteModalVisible}
        onClose={() => setQuoteModalVisible(false)}
        onAddQuote={() => {
          setQuoteModalVisible(false);
          loadBooks();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BOOKSHELF_COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#5D4037',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 70,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#F6F3EA',
    borderRadius: 10,
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#5D4037',
  },
  modalButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#5D4037',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  modalButtonText: {
    color: '#F6F3EA',
    fontSize: 24,
    marginLeft: 15,
  },
  orText: {
    fontSize: 24,
    color: '#5D4037',
    marginVertical: 10,
  },
  bookmarkIcon: {
    width: 20,
    height: 30,
    backgroundColor: '#E6CBBC',
    borderRadius: 2,
  },
  bookIcon: {
    width: 24,
    height: 32,
    backgroundColor: '#E6CBBC',
    borderRadius: 2,
  },
});

export default HomeScreen; 