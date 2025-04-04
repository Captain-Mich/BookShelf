import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { BOOKSHELF_COLORS } from '../utils/colors';

interface BottomNavigationProps {
  active?: 'bookshelf' | 'reading' | 'bookmarks';
  onPressBookshelf?: () => void;
  onPressReading?: () => void;
  onPressBookmarks?: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  active = 'bookshelf',
  onPressBookshelf,
  onPressReading,
  onPressBookmarks,
}) => {
  const activeOpacity = 0.7;
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.navItem, active === 'bookshelf' && styles.activeNavItem]}
        onPress={onPressBookshelf}
        activeOpacity={activeOpacity}
      >
        <View style={styles.navIcon}>
          <View style={styles.bookshelfIcon} />
        </View>
        <Text style={[styles.navText, active === 'bookshelf' && styles.activeNavText]}>
          Bookshelf
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.navItem, active === 'reading' && styles.activeNavItem]}
        onPress={onPressReading}
        activeOpacity={activeOpacity}
      >
        <View style={styles.navIcon}>
          <View style={styles.readingIcon} />
        </View>
        <Text style={[styles.navText, active === 'reading' && styles.activeNavText]}>
          Reading
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.navItem, active === 'bookmarks' && styles.activeNavItem]}
        onPress={onPressBookmarks}
        activeOpacity={activeOpacity}
      >
        <View style={styles.navIcon}>
          <View style={styles.bookmarkIcon} />
        </View>
        <Text style={[styles.navText, active === 'bookmarks' && styles.activeNavText]}>
          Quotes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    elevation: 8, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNavItem: {
    backgroundColor: 'rgba(93, 64, 55, 0.05)',
  },
  navIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#5D4037',
    opacity: 0.7,
  },
  activeNavText: {
    fontWeight: '500',
    opacity: 1,
  },
  bookshelfIcon: {
    width: 20,
    height: 16,
    borderWidth: 2,
    borderColor: '#5D4037',
    borderRadius: 2,
  },
  readingIcon: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#5D4037',
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
  bookmarkIcon: {
    width: 14,
    height: 18,
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#5D4037',
    borderBottomRightRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
});

export default BottomNavigation; 