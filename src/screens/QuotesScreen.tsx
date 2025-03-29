import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { BOOKSHELF_COLORS } from '../utils/colors';
import BottomNavigation from '../components/BottomNavigation';
import { ProfileIcon, PlusIcon } from '../components/Icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getBooks } from '../services/BookStorage';
import { Book, Quote } from '../models/Book';
import QuoteModal from '../components/QuoteModal';
import BottomMenu from '../components/BottomMenu';

type QuotesScreenProps = NativeStackScreenProps<RootStackParamList, 'Quotes'>;

interface QuoteWithBookInfo extends Quote {
  bookTitle: string;
  bookColor: string;
  bookId: string;
}

const QuotesScreen = ({ navigation }: QuotesScreenProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [allQuotes, setAllQuotes] = useState<QuoteWithBookInfo[]>([]);
  const [quoteModalVisible, setQuoteModalVisible] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const loadedBooks = await getBooks();
    setBooks(loadedBooks);
    
    // Extract all quotes from all books
    const quotes: QuoteWithBookInfo[] = [];
    loadedBooks.forEach(book => {
      if (book.quotes && book.quotes.length > 0) {
        book.quotes.forEach(quote => {
          quotes.push({
            ...quote,
            bookTitle: book.title,
            bookColor: book.color,
            bookId: book.id,
          });
        });
      }
    });
    
    // Sort quotes by date (newest first)
    quotes.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    setAllQuotes(quotes);
  };

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleNavigateToReading = () => {
    if (books.length > 0) {
      navigation.navigate('Reading', { bookColor: books[0].color });
    }
  };

  const handleSelectBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setQuoteModalVisible(true);
  };

  const handleAddQuote = async (text: string, page?: number) => {
    // This functionality is already handled in BookDetailScreen
    // Just close the modal here
    setQuoteModalVisible(false);
    setSelectedBookId(null);
  };

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Render a single quote item
  const renderQuoteItem = ({ item }: { item: QuoteWithBookInfo }) => (
    <View style={styles.quoteContainer}>
      <View style={[styles.quoteColorIndicator, { backgroundColor: item.bookColor }]} />
      <View style={styles.quoteContent}>
        <Text style={styles.quoteText}>"{item.text}"</Text>
        <View style={styles.quoteFooter}>
          <Text style={styles.bookTitle}>{item.bookTitle}</Text>
          <View style={styles.quoteDetails}>
            {item.page && (
              <Text style={styles.quotePage}>p. {item.page}</Text>
            )}
            <Text style={styles.quoteDate}>{formatDate(item.createdAt)}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Render the book selection modal
  const renderBookSelectionModal = () => {
    if (!quoteModalVisible) return null;

    return (
      <QuoteModal
        visible={quoteModalVisible}
        onClose={() => setQuoteModalVisible(false)}
        onAddQuote={handleAddQuote}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={BOOKSHELF_COLORS.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleNavigateToHome}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>QUOTES</Text>
        <TouchableOpacity 
          style={styles.headerButton}
        >
          <ProfileIcon />
        </TouchableOpacity>
      </View>
      
      {/* Main content */}
      <FlatList
        data={allQuotes}
        renderItem={renderQuoteItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No quotes added yet. Add quotes to your books to see them here.
            </Text>
          </View>
        }
      />
      
      {/* Quote Modal */}
      {renderBookSelectionModal()}
      
      {/* Bottom Navigation */}
      <BottomMenu activeTab="quotes" />
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
  backIcon: {
    fontSize: 32,
    color: '#5D4037',
    marginTop: -4,
  },
  headerTitle: {
    fontSize: 18,
    color: '#5D4037',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 80,
  },
  quoteContainer: {
    flexDirection: 'row',
    backgroundColor: '#EFEBE9',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  quoteColorIndicator: {
    width: 6,
    height: '100%',
  },
  quoteContent: {
    flex: 1,
    padding: 15,
  },
  quoteText: {
    fontSize: 16,
    color: '#5D4037',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  quoteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 12,
    color: '#5D4037',
    fontWeight: '500',
  },
  quoteDetails: {
    flexDirection: 'row',
  },
  quotePage: {
    fontSize: 12,
    color: '#8D6E63',
    marginRight: 10,
  },
  quoteDate: {
    fontSize: 12,
    color: '#8D6E63',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#8D6E63',
    textAlign: 'center',
    lineHeight: 24,
  },
  bookSelectionContainer: {
    flex: 1,
  },
});

export default QuotesScreen; 