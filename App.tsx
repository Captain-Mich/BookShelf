/**
 * BookSelf - A React Native Library App
 */

// Add type declaration for PNG files
declare module '*.png';

import React, { useState } from 'react';
import { StatusBar, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { BOOKSHELF_COLORS, BOOK_COLORS } from './src/utils/colors';
// Import the book image
import bookImage from './src/assets/images/asset-1.png';

// SVG-like components for bottom navigation
const BookshelfIcon = () => (
  <View style={styles.iconContainer}>
    <View style={styles.bookshelfIconShelf} />
    <View style={[styles.bookshelfIconBook, { left: 3, height: 14 }]} />
    <View style={[styles.bookshelfIconBook, { left: 10, height: 12 }]} />
    <View style={[styles.bookshelfIconBook, { left: 17, height: 16 }]} />
  </View>
);

const OpenBookIcon = () => (
  <View style={styles.iconContainer}>
    <View style={styles.openBookLeftPage} />
    <View style={styles.openBookRightPage} />
    <View style={styles.navOpenBookSpine} />
  </View>
);

const BookmarkIcon = () => (
  <View style={styles.iconContainer}>
    <View style={styles.bookmarkOuter} />
    <View style={styles.bookmarkInner} />
  </View>
);

// SVG-like components for header
const PlusIcon = () => (
  <View style={styles.plusIconContainer}>
    <View style={styles.plusHorizontal} />
    <View style={styles.plusVertical} />
  </View>
);

const ProfileIcon = () => (
  <View style={styles.profileIconContainer}>
    <View style={styles.profileHead} />
    <View style={styles.profileBody} />
  </View>
);

// SVG-like component for open book with pages
const OpenBookWithPages = () => (
  <View style={styles.openBookContainer}>
    {/* Book base (brown cover) */}
    <View style={styles.openBookBase}>
      {/* Left cover */}
      <View style={styles.openBookLeftCover} />
      
      {/* Right cover */}
      <View style={styles.openBookRightCover} />
      
      {/* Spine */}
      <View style={styles.openBookSpine} />
      
      {/* Bottom binding strips */}
      <View style={[styles.openBookBindingStrip, { bottom: 30 }]} />
      <View style={[styles.openBookBindingStrip, { bottom: 15 }]} />
    </View>
    
    {/* Book pages */}
    <View style={styles.pagesContainer}>
      {/* Static central pages - for a more visible bulk effect */}
      <View style={styles.centralPagesBulk} />
      
      {/* Left pages - stacked to create 3D effect */}
      {[...Array(15)].map((_, i) => (
        <View 
          key={`leftPage-${i}`} 
          style={[
            styles.bookPageLeft,
            { 
              transform: [
                { rotateZ: `${-2 + i * 0.3}deg` },
                { translateY: -i * 0.25 }
              ],
              zIndex: 20 - i,
              opacity: 1 - (i * 0.03),
              backgroundColor: i % 2 === 0 ? '#F9F0E0' : '#FFF5E9',
            }
          ]} 
        />
      ))}
      
      {/* Right pages - stacked to create 3D effect */}
      {[...Array(15)].map((_, i) => (
        <View 
          key={`rightPage-${i}`} 
          style={[
            styles.bookPageRight,
            { 
              transform: [
                { rotateZ: `${2 - i * 0.3}deg` },
                { translateY: -i * 0.25 }
              ],
              zIndex: 20 - i,
              opacity: 1 - (i * 0.03),
              backgroundColor: i % 2 === 0 ? '#F9F0E0' : '#FFF5E9',
            }
          ]} 
        />
      ))}
    </View>
  </View>
);

// Goal progress boxes component
const GoalProgress = ({ completedCount = 9, totalCount = 12 }) => {
  const rows = [];
  let currentCount = 0;
  
  // Create rows with up to 9 boxes each
  for (let i = 0; i < Math.ceil(totalCount / 9); i++) {
    const boxes = [];
    for (let j = 0; j < Math.min(9, totalCount - (i * 9)); j++) {
      currentCount++;
      boxes.push(
        <View 
          key={j} 
          style={[
            styles.goalBox, 
            currentCount <= completedCount ? styles.goalBoxCompleted : styles.goalBoxIncomplete
          ]} 
        />
      );
    }
    rows.push(
      <View key={i} style={styles.goalRow}>
        {boxes}
      </View>
    );
  }
  
  return (
    <View style={styles.goalContainer}>
      <Text style={styles.goalTitle}>Goal</Text>
      {rows}
    </View>
  );
};

interface BookProps {
  color: string;
  isSlanted?: boolean;
  onPress?: () => void;
}

// Component to render a single book
const Book = ({ color, isSlanted = false, onPress }: BookProps) => {
  const slantStyle = isSlanted ? { transform: [{ rotate: '15deg' }], marginTop: -10 } : {};
  
  return (
    <TouchableOpacity 
      style={[styles.book, { backgroundColor: color }, slantStyle]} 
      onPress={onPress}
      activeOpacity={0.7}
    />
  );
};

interface BookshelfProps {
  bookColors: string[];
  onPressBook: (bookColor: string) => void;
}

// Component to render a shelf with books
const Bookshelf = ({ bookColors, onPressBook }: BookshelfProps) => {
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

// Fix type issues for ReadingScreen component
interface ReadingScreenProps {
  bookColor: string;
  onBack: () => void;
}

// Reading screen component
const ReadingScreen = ({ bookColor, onBack }: ReadingScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={BOOKSHELF_COLORS.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={onBack}>
          <PlusIcon />
        </TouchableOpacity>
        <Text style={styles.readingTitle}>CURRENTLY READING</Text>
        <TouchableOpacity style={styles.headerButton}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <View style={styles.readingContent}>
        {/* Open book illustration - replaced with asset-1.png */}
        <View style={styles.bookIllustrationContainer}>
          <Image source={bookImage} style={styles.bookImage} resizeMode="contain" />
        </View>
        
        {/* Book details */}
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>Alice nel pase delle meraviglie</Text>
          <Text style={styles.bookAuthor}>Lewis C. Carrol</Text>
        </View>
        
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '70%' }]} />
          </View>
          <Text style={styles.progressText}>70% progress</Text>
        </View>
        
        {/* Reading goal */}
        <GoalProgress />
      </View>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={onBack}
          activeOpacity={0.7}
        >
          <View style={styles.navIconContainer}>
            <BookshelfIcon />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          activeOpacity={0.7}
        >
          <View style={[styles.navIconContainer, styles.activeIcon]}>
            <OpenBookIcon />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          activeOpacity={0.7}
        >
          <View style={styles.navIconContainer}>
            <BookmarkIcon />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Fix type issues for HomeScreen component
interface HomeScreenProps {
  onPressBook: (bookColor: string) => void;
}

// Home Screen component
const HomeScreen = ({ onPressBook }: HomeScreenProps) => {
  // Book colors for each shelf
  const shelf1Books = [
    BOOK_COLORS[0], BOOK_COLORS[1], BOOK_COLORS[2], 
    BOOK_COLORS[4], BOOK_COLORS[0], BOOK_COLORS[3], 
    BOOK_COLORS[5], BOOK_COLORS[6], BOOK_COLORS[1]
  ];
  
  const shelf2Books = [
    BOOK_COLORS[0], BOOK_COLORS[2], BOOK_COLORS[4], 
    BOOK_COLORS[1], BOOK_COLORS[0], BOOK_COLORS[3], 
    BOOK_COLORS[5], BOOK_COLORS[6], BOOK_COLORS[2]
  ];
  
  const shelf3Books = [
    BOOK_COLORS[4], BOOK_COLORS[0], BOOK_COLORS[3], 
    BOOK_COLORS[2], BOOK_COLORS[5], BOOK_COLORS[1], 
    BOOK_COLORS[6], BOOK_COLORS[4], BOOK_COLORS[0]
  ];
  
  const shelf4Books = [
    BOOK_COLORS[0], BOOK_COLORS[4], BOOK_COLORS[1], 
    BOOK_COLORS[5], BOOK_COLORS[2], BOOK_COLORS[6], 
    BOOK_COLORS[3], BOOK_COLORS[0], BOOK_COLORS[4]
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={BOOKSHELF_COLORS.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <PlusIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BOOKSELF</Text>
        <TouchableOpacity style={styles.headerButton}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>
      
      {/* Bookshelf content */}
      <View style={styles.content}>
        <Bookshelf bookColors={shelf1Books} onPressBook={onPressBook} />
        <Bookshelf bookColors={shelf2Books} onPressBook={onPressBook} />
        <Bookshelf bookColors={shelf3Books} onPressBook={onPressBook} />
        <Bookshelf bookColors={shelf4Books} onPressBook={onPressBook} />
      </View>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navButton} 
          activeOpacity={0.7}
        >
          <View style={[styles.navIconContainer, styles.activeIcon]}>
            <BookshelfIcon />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          activeOpacity={0.7}
        >
          <View style={styles.navIconContainer}>
            <OpenBookIcon />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          activeOpacity={0.7}
        >
          <View style={styles.navIconContainer}>
            <BookmarkIcon />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

function App(): React.JSX.Element {
  // State to track current screen and selected book
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedBookColor, setSelectedBookColor] = useState(BOOK_COLORS[0]);

  // Handler for book press
  const handleBookPress = (bookColor: string) => {
    setSelectedBookColor(bookColor);
    setCurrentScreen('reading');
  };

  // Handler to go back to home screen
  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  // Render appropriate screen
  if (currentScreen === 'reading') {
    return (
      <ReadingScreen 
        bookColor={selectedBookColor} 
        onBack={handleBackToHome} 
      />
    );
  }

  return (
    <HomeScreen onPressBook={handleBookPress} />
  );
}

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
  readingTitle: {
    fontSize: 16,
    color: '#5D4037',
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  readingContent: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 10,
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
  goalContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  goalTitle: {
    fontSize: 19,
    color: '#5D4037',
    fontWeight: '400',
    marginBottom: 15,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  goalBox: {
    width: 28,
    height: 42,
    borderRadius: 5,
    marginRight: 8,
  },
  goalBoxCompleted: {
    backgroundColor: '#E6A191',
  },
  goalBoxIncomplete: {
    backgroundColor: '#E6CDB7',
  },
  shelfContainer: {
    height: '22%',
    width: '100%',
  },
  booksContainer: {
    flexDirection: 'row',
    height: '85%',
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
  },
  book: {
    flex: 1,
    height: '90%',
    marginHorizontal: 1,
    borderRadius: 3,
  },
  shelf: {
    height: '15%',
    backgroundColor: BOOKSHELF_COLORS.shelf,
    width: '100%',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5EFE0',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0D5C1',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
  },
  navIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 30,
  },
  activeIcon: {
    opacity: 1,
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // Open book with pages
  openBookContainer: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  openBookBase: {
    width: 160,
    height: 180,
    position: 'relative',
  },
  openBookLeftCover: {
    position: 'absolute',
    width: 80,
    height: 180,
    backgroundColor: '#5D4037',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    left: 0,
    transform: [{ perspective: 500 }, { rotateY: '5deg' }],
    zIndex: 1,
  },
  openBookRightCover: {
    position: 'absolute',
    width: 80,
    height: 180,
    backgroundColor: '#5D4037',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    right: 0,
    transform: [{ perspective: 500 }, { rotateY: '-5deg' }],
    zIndex: 1,
  },
  openBookSpine: {
    position: 'absolute',
    width: 12,
    height: 180,
    backgroundColor: '#8D6E63',
    left: 74,
    zIndex: 0,
  },
  openBookBindingStrip: {
    position: 'absolute',
    width: 30,
    height: 4,
    backgroundColor: '#8D6E63',
    left: 65,
    zIndex: 3,
  },
  pagesContainer: {
    position: 'absolute',
    width: 160,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  centralPagesBulk: {
    position: 'absolute',
    width: 90,
    height: 100,
    backgroundColor: '#FFF5E9',
    borderRadius: 2,
    top: 35,
    zIndex: 4,
  },
  bookPageLeft: {
    position: 'absolute',
    width: 72,
    height: 110,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    right: 81,
    top: 30,
  },
  bookPageRight: {
    position: 'absolute',
    width: 72,
    height: 110,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    left: 81,
    top: 30,
  },
  // Bookshelf icon
  bookshelfIconShelf: {
    position: 'absolute',
    bottom: 3,
    width: 26,
    height: 3,
    backgroundColor: '#5D4037',
  },
  bookshelfIconBook: {
    position: 'absolute',
    bottom: 6,
    width: 5,
    backgroundColor: '#5D4037',
  },
  // Open book icon
  openBookLeftPage: {
    position: 'absolute',
    width: 12,
    height: 18,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5D4037',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    left: 7,
  },
  openBookRightPage: {
    position: 'absolute',
    width: 12,
    height: 18,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5D4037',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    right: 7,
  },
  navOpenBookSpine: {
    position: 'absolute',
    width: 2,
    height: 18,
    backgroundColor: '#5D4037',
    alignSelf: 'center',
  },
  // Bookmark icon
  bookmarkOuter: {
    width: 14,
    height: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5D4037',
    borderRadius: 2,
  },
  bookmarkInner: {
    position: 'absolute',
    width: 6,
    height: 8,
    backgroundColor: 'transparent',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#5D4037',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    top: 4,
    left: 4,
  },
  navIcon: {
    fontSize: 24,
  },
  // Plus icon
  plusIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusHorizontal: {
    position: 'absolute',
    width: 18,
    height: 2,
    backgroundColor: '#5D4037',
  },
  plusVertical: {
    position: 'absolute',
    width: 2,
    height: 18,
    backgroundColor: '#5D4037',
  },
  
  // Profile icon
  profileIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5D4037',
    marginBottom: 1,
  },
  profileBody: {
    width: 18,
    height: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    backgroundColor: '#5D4037',
  },
});

export default App;
