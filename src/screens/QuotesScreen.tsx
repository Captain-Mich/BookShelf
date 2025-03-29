import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { BOOKSHELF_COLORS } from '../utils/colors';
import BottomNavigation from '../components/BottomNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type QuotesScreenProps = NativeStackScreenProps<RootStackParamList, 'Quotes'>;

const QuotesScreen = ({ navigation }: QuotesScreenProps) => {
  // Sample quotes data
  const quoteCards = [
    { id: '1', color: '#6D4C41' },
    { id: '2', color: '#6D4C41' },
    { id: '3', color: '#6D4C41' },
    { id: '4', color: '#E6A191' },
    { id: '5', color: '#E6A191' },
    { id: '6', color: '#E6A191' },
    { id: '7', color: '#6D4C41' },
    { id: '8', color: '#6D4C41' },
    { id: '9', color: '#6D4C41' },
    { id: '10', color: '#E6A191' },
    { id: '11', color: '#E6A191' },
    { id: '12', color: '#E6A191' },
  ];

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleNavigateToReading = () => {
    navigation.navigate('Reading', { bookColor: '#6D4C41' });
  };

  const renderQuoteCard = ({ item }: { item: { id: string, color: string } }) => (
    <TouchableOpacity 
      style={[styles.quoteCard, { backgroundColor: item.color }]}
      activeOpacity={0.8}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={BOOKSHELF_COLORS.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>
      
      {/* Title */}
      <Text style={styles.title}>QUOTES</Text>
      
      {/* Quotes Grid */}
      <FlatList
        data={quoteCards}
        renderItem={renderQuoteCard}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.quotesGrid}
        columnWrapperStyle={styles.columnWrapper}
      />
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        active="bookmarks"
        onPressBookshelf={handleNavigateToHome}
        onPressReading={handleNavigateToReading}
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
  searchButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
    color: '#5D4037',
  },
  profileButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
    color: '#5D4037',
  },
  title: {
    fontSize: 20,
    color: '#5D4037',
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 20,
    letterSpacing: 2,
  },
  quotesGrid: {
    paddingHorizontal: 10,
    paddingBottom: 80, // Add bottom margin for the navigation bar
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  quoteCard: {
    width: '30%',
    height: 160,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});

export default QuotesScreen; 