import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface BookProps {
  color: string;
  isSlanted?: boolean;
  title?: string;
  onPress?: () => void;
}

const Book: React.FC<BookProps> = ({ color, isSlanted = false, title = '', onPress }) => {
  const slantStyle = isSlanted ? { transform: [{ rotate: '15deg' }], marginTop: -10 } : {};
  const shortTitle = title ? shortenTitle(title) : '';
  
  return (
    <TouchableOpacity 
      style={[styles.book, { backgroundColor: color }, slantStyle]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {title && (
        <View style={styles.spineContainer}>
          <Text style={styles.spineText} numberOfLines={1}>
            {shortTitle}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Shorten title for display on book spine
const shortenTitle = (title: string): string => {
  if (title.length <= 12) return title;
  return title.substring(0, 11) + '…';
};

const styles = StyleSheet.create({
  book: {
    flex: 1,
    height: '90%',
    marginHorizontal: 1,
    borderRadius: 3,
    position: 'relative',
    justifyContent: 'center',
  },
  spineContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  spineText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    transform: [{ rotate: '90deg' }],
    width: 80, // Height of the book
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});

export default Book; 