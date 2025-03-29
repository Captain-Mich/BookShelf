import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BookshelfIcon, OpenBookIcon, BookmarkIcon } from './Icons';

interface BottomNavigationProps {
  active: 'bookshelf' | 'reading' | 'bookmarks';
  onPressBookshelf?: () => void;
  onPressReading?: () => void;
  onPressBookmarks?: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  active,
  onPressBookshelf,
  onPressReading,
  onPressBookmarks
}) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navButton} 
        activeOpacity={0.7}
        onPress={onPressBookshelf}
      >
        <View style={[styles.navIconContainer, active === 'bookshelf' && styles.activeIcon]}>
          <BookshelfIcon />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        activeOpacity={0.7}
        onPress={onPressReading}
      >
        <View style={[styles.navIconContainer, active === 'reading' && styles.activeIcon]}>
          <OpenBookIcon />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        activeOpacity={0.7}
        onPress={onPressBookmarks}
      >
        <View style={[styles.navIconContainer, active === 'bookmarks' && styles.activeIcon]}>
          <BookmarkIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default BottomNavigation; 