import React from 'react';
import { View, StyleSheet } from 'react-native';

interface IconProps {
  color?: string;
}

// Bookshelf Icon
export const BookshelfIcon: React.FC<IconProps> = ({ color = '#5D4037' }) => (
  <View style={styles.iconContainer}>
    <View style={[styles.bookshelfIconShelf, { backgroundColor: color }]} />
    <View style={[styles.bookshelfIconBook, { left: 3, height: 14, backgroundColor: color }]} />
    <View style={[styles.bookshelfIconBook, { left: 10, height: 12, backgroundColor: color }]} />
    <View style={[styles.bookshelfIconBook, { left: 17, height: 16, backgroundColor: color }]} />
  </View>
);

// Open Book Icon
export const OpenBookIcon: React.FC<IconProps> = ({ color = '#5D4037' }) => (
  <View style={styles.iconContainer}>
    <View style={[styles.openBookLeftPage, { borderColor: color }]} />
    <View style={[styles.openBookRightPage, { borderColor: color }]} />
    <View style={[styles.openBookSpine, { backgroundColor: color }]} />
  </View>
);

// Bookmark Icon
export const BookmarkIcon: React.FC<IconProps> = ({ color = '#5D4037' }) => (
  <View style={styles.iconContainer}>
    <View style={[styles.bookmarkOuter, { borderColor: color }]} />
    <View style={[styles.bookmarkInner, { borderColor: color }]} />
  </View>
);

// Plus Icon
export const PlusIcon: React.FC<IconProps> = ({ color = '#5D4037' }) => (
  <View style={styles.plusIconContainer}>
    <View style={[styles.plusHorizontal, { backgroundColor: color }]} />
    <View style={[styles.plusVertical, { backgroundColor: color }]} />
  </View>
);

// Profile Icon
export const ProfileIcon: React.FC<IconProps> = ({ color = '#5D4037' }) => (
  <View style={styles.profileIconContainer}>
    <View style={[styles.profileHead, { backgroundColor: color }]} />
    <View style={[styles.profileBody, { backgroundColor: color }]} />
  </View>
);

// Open Book with Pages Icon (more complex illustration)
export const OpenBookWithPages: React.FC = () => (
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

const styles = StyleSheet.create({
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
  }
}); 