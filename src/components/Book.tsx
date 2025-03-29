import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface BookProps {
  color: string;
  title?: string;
  onPress?: () => void;
  pages?: number;
}

const Book: React.FC<BookProps> = ({ 
  color, 
  title = '', 
  onPress,
  pages = 200 // Default page count
}) => {
  // Calculate width based on pages (with min and max limits)
  const width = calculateWidth(pages);
  
  // Randomize height slightly for visual interest
  const heightVariation = Math.random() * 10 - 5; // -5 to +5 variation (reduced range)
  const height = 90 + heightVariation;
  
  const shortTitle = title ? shortenTitle(title) : '';
  
  return (
    <TouchableOpacity 
      style={[
        styles.book, 
        { 
          backgroundColor: color,
          width,
          height: `${height}%`,
        }
      ]} 
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

// Calculate book width based on page count
const calculateWidth = (pages: number): number => {
  // Base width calculations on page count
  const minWidth = 20;  // Minimum width for very thin books
  const maxWidth = 45;  // Maximum width for very thick books
  
  if (!pages || pages < 100) return minWidth;
  if (pages > 1000) return maxWidth;
  
  // Linear scale between minWidth and maxWidth
  return minWidth + (pages - 100) * (maxWidth - minWidth) / 900;
};

const styles = StyleSheet.create({
  book: {
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