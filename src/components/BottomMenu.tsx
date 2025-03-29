import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type BottomMenuNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface BottomMenuProps {
  activeTab: 'bookshelf' | 'reading' | 'quotes';
}

const BottomMenu: React.FC<BottomMenuProps> = ({ activeTab }) => {
  const navigation = useNavigation<BottomMenuNavigationProp>();

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToReading = () => {
    navigation.navigate('Reading', { bookColor: '' });
  };

  const navigateToQuotes = () => {
    navigation.navigate('Quotes');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.navItem, activeTab === 'bookshelf' && styles.activeNavItem]}
        onPress={navigateToHome}
        activeOpacity={0.7}
      >
        <View style={styles.navIcon}>
          <View style={styles.bookshelfIcon} />
        </View>
        <Text style={[styles.navText, activeTab === 'bookshelf' && styles.activeNavText]}>
          Bookshelf
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.navItem, activeTab === 'quotes' && styles.activeNavItem]}
        onPress={navigateToQuotes}
        activeOpacity={0.7}
      >
        <View style={styles.navIcon}>
          <View style={styles.bookmarkIcon} />
        </View>
        <Text style={[styles.navText, activeTab === 'quotes' && styles.activeNavText]}>
          Quotes
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.navItem, activeTab === 'reading' && styles.activeNavItem]}
        onPress={navigateToReading}
        activeOpacity={0.7}
      >
        <View style={styles.navIcon}>
          <View style={styles.readingIcon} />
        </View>
        <Text style={[styles.navText, activeTab === 'reading' && styles.activeNavText]}>
          Reading
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

export default BottomMenu; 