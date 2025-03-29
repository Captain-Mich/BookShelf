import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { BOOKSHELF_COLORS } from '../utils/colors';
import BottomMenu from '../components/BottomMenu';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getBooks } from '../services/BookStorage';
import { Book, Quote } from '../models/Book';
import { ProfileIcon } from '../components/Icons';

type BookDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

const BookDetailScreen = ({ route, navigation }: BookDetailScreenProps) => {
  const { bookColor } = route.params;
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    loadBook();
  }, [bookColor]);

  const loadBook = async () => {
    const books = await getBooks();
    const foundBook = books.find(b => b.color === bookColor);
    if (foundBook) {
      setBook(foundBook);
    }
  };

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  // Generate rating stars (using the book's ID to make it deterministic but seem random)
  const generateRating = () => {
    if (!book) return 4;
    const idSum = book.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return Math.max(3, Math.min(5, Math.floor(idSum % 6)));
  };
  
  const renderStars = () => {
    const rating = generateRating();
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text 
          key={i} 
          style={[
            styles.starIcon,
            i < rating ? styles.filledStar : styles.emptyStar
          ]}
        >
          ★
        </Text>
      );
    }
    
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={BOOKSHELF_COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleNavigateToHome}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>
      
      {/* Book Header */}
      <View style={styles.bookHeader}>
        <View style={styles.bookCoverContainer}>
          <View style={[styles.bookCover, { backgroundColor: book?.color || '#9E9E9E' }]}>
            <Text style={styles.bookCoverTitle}>{book?.title}</Text>
          </View>
        </View>
        
        <View style={styles.bookHeaderContent}>
          <Text style={styles.bookTitle}>{book?.title || "Loading book..."}</Text>
          <Text style={styles.bookAuthor}>{book?.author || ""}</Text>
          {renderStars()}
        </View>
      </View>
      
      {/* Book Content */}
      <ScrollView style={styles.contentScroll} contentContainerStyle={styles.contentContainer}>
        {/* Quotes section with title */}
        <View style={styles.quotesSection}>
          <Text style={styles.sectionTitle}>Favorite Quotes</Text>
          
          {book?.quotes && book.quotes.length > 0 ? (
            book.quotes.map((quote: Quote) => (
              <View key={quote.id} style={styles.quoteBlock}>
                <View style={styles.quoteBlockLine} />
                <Text style={styles.quoteBlockText}>
                  "{quote.text}"
                </Text>
                {quote.page && (
                  <Text style={styles.quotePage}>Page {quote.page}</Text>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyQuotesContainer}>
              <Text style={styles.emptyQuotesText}>
                No quotes added yet. Add quotes from the home screen.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <BottomMenu activeTab="bookshelf" />
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
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
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E0D5',
    flexDirection: 'row',
    marginBottom: 10,
  },
  bookCoverContainer: {
    marginRight: 15,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookCoverTitle: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    transform: [{ rotate: '90deg' }],
    width: 100,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  bookHeaderContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  bookTitle: {
    fontSize: 22,
    color: '#5D4037',
    fontWeight: '500',
    marginBottom: 3,
  },
  bookAuthor: {
    fontSize: 16,
    color: '#5D4037',
    fontWeight: '300',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  starIcon: {
    fontSize: 20,
    marginRight: 3,
  },
  filledStar: {
    color: '#D4A28B',
  },
  emptyStar: {
    color: '#D7CCC8',
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 70,
  },
  quotesSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#5D4037',
    fontWeight: '500',
    marginBottom: 15,
  },
  quoteBlock: {
    marginVertical: 15,
    marginHorizontal: 10,
    position: 'relative',
    paddingLeft: 15,
  },
  quoteBlockLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#8D6E63',
    borderRadius: 2,
  },
  quoteBlockText: {
    fontSize: 16,
    color: '#5D4037',
    fontStyle: 'italic',
    lineHeight: 26,
  },
  quotePage: {
    fontSize: 14,
    color: '#8D6E63',
    marginTop: 8,
    textAlign: 'right',
  },
  emptyQuotesContainer: {
    padding: 20,
    backgroundColor: '#EFEBE9',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  emptyQuotesText: {
    fontSize: 14,
    color: '#8D6E63',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default BookDetailScreen; 