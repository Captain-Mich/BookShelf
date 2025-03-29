import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface BookProps {
  color: string;
  isSlanted?: boolean;
  onPress?: () => void;
}

const Book: React.FC<BookProps> = ({ color, isSlanted = false, onPress }) => {
  const slantStyle = isSlanted ? { transform: [{ rotate: '15deg' }], marginTop: -10 } : {};
  
  return (
    <TouchableOpacity 
      style={[styles.book, { backgroundColor: color }, slantStyle]} 
      onPress={onPress}
      activeOpacity={0.7}
    />
  );
};

const styles = StyleSheet.create({
  book: {
    flex: 1,
    height: '90%',
    marginHorizontal: 1,
    borderRadius: 3,
  },
});

export default Book; 