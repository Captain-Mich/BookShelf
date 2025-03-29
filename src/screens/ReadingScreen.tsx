import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { BOOKSHELF_COLORS } from '../utils/colors';
import GoalProgress from '../components/GoalProgress';
import BottomNavigation from '../components/BottomNavigation';
import { PlusIcon, ProfileIcon } from '../components/Icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getBooks, setCurrentBook, updateBookProgress } from '../services/BookStorage';
import { Book } from '../models/Book';

// Import the book image
import bookImage from '../assets/images/asset-1.png';

type ReadingScreenProps = NativeStackScreenProps<RootStackParamList, 'Reading'>;

const ReadingScreen = ({ route, navigation }: ReadingScreenProps) => {
  const { bookColor } = route.params;
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [progress, setProgress] = useState(70);
  
  useEffect(() => {
    const loadBooks = async () => {
      const allBooks = await getBooks();
      if (allBooks.length > 0) {
        setBooks(allBooks);
        
        // Find the index of the specified book by color, default to 0 if not found
        const bookIndex = allBooks.findIndex(book => book.color === bookColor);
        const index = bookIndex >= 0 ? bookIndex : 0;
        setCurrentBookIndex(index);
        setProgress(allBooks[index]?.progress || 70);
      }
    };
    
    loadBooks();
  }, [bookColor]);
  
  // Handle saving progress when it changes
  useEffect(() => {
    const saveProgress = async () => {
      if (books.length > 0 && currentBookIndex < books.length) {
        const currentBook = books[currentBookIndex];
        await updateBookProgress(currentBook.id, progress);
        await setCurrentBook(currentBook.id);
      }
    };
    
    saveProgress();
  }, [progress, currentBookIndex, books]);
  
  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleNavigateToQuotes = () => {
    navigation.navigate('Quotes');
  };
  
  const navigateToPreviousBook = () => {
    if (currentBookIndex > 0) {
      setCurrentBookIndex(prevIndex => prevIndex - 1);
      setProgress(books[currentBookIndex - 1]?.progress || 70);
    }
  };
  
  const navigateToNextBook = () => {
    if (currentBookIndex < books.length - 1) {
      setCurrentBookIndex(prevIndex => prevIndex + 1);
      setProgress(books[currentBookIndex + 1]?.progress || 70);
    }
  };
  
  // Simulate reading more
  const handleReadMore = () => {
    if (progress < 100) {
      setProgress(Math.min(progress + 10, 100));
    }
  };
  
  const currentBook = books[currentBookIndex];
  const hasMultipleBooks = books.length > 1;

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
        <Text style={styles.readingTitle}>CURRENTLY READING</Text>
        <TouchableOpacity style={styles.headerButton}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <View style={styles.readingContent}>
        {/* Book navigation */}
        {hasMultipleBooks && (
          <View style={styles.bookNavigation}>
            <TouchableOpacity 
              style={[styles.navButton, currentBookIndex === 0 && styles.navButtonDisabled]} 
              onPress={navigateToPreviousBook}
              disabled={currentBookIndex === 0}
            >
              <Text style={styles.navButtonText}>‹</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.navButton, currentBookIndex === books.length - 1 && styles.navButtonDisabled]} 
              onPress={navigateToNextBook}
              disabled={currentBookIndex === books.length - 1}
            >
              <Text style={styles.navButtonText}>›</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Open book illustration */}
        <View style={styles.bookIllustrationContainer}>
          <Image source={bookImage} style={styles.bookImage} resizeMode="contain" />
        </View>
        
        {/* Book details */}
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{currentBook?.title || "No books added yet"}</Text>
          <Text style={styles.bookAuthor}>{currentBook?.author || "Add a book to start reading"}</Text>
        </View>
        
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}% progress</Text>
        </View>
        
        {/* Reading goal */}
        <GoalProgress />
        
        {/* Read more button */}
        {currentBook && (
          <TouchableOpacity 
            style={styles.readMoreButton}
            onPress={handleReadMore}
            activeOpacity={0.8}
          >
            <Text style={styles.readMoreButtonText}>READ MORE (+10%)</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        active="reading" 
        onPressBookshelf={handleNavigateToHome}
        onPressBookmarks={handleNavigateToQuotes}
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
  backIcon: {
    fontSize: 32,
    color: '#5D4037',
    marginTop: -4,
  },
  readingTitle: {
    fontSize: 16,
    color: '#5D4037',
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  readingContent: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 60, // Add bottom margin for the navigation bar
  },
  bookNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  navButton: {
    width: 40,
    height: 40,
    backgroundColor: '#5D4037',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#D7CCC8',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -4,
  },
  bookIllustrationContainer: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  bookImage: {
    width: 220,
    height: 220,
  },
  bookDetails: {
    alignItems: 'center',
    marginBottom: 30,
  },
  bookTitle: {
    fontSize: 20,
    color: '#5D4037',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: 'System',
    letterSpacing: 0.4,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#5D4037',
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 0.4,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E6CDB7',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D4A28B',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#5D4037',
    textAlign: 'right',
    width: '100%',
    fontWeight: '300',
    letterSpacing: 0.2,
  },
  readMoreButton: {
    backgroundColor: '#5D4037',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    width: '80%',
  },
  readMoreButtonText: {
    color: '#F6F3EA',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ReadingScreen; 