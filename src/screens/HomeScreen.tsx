import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { BOOKSHELF_COLORS, BOOK_COLORS } from '../utils/colors';
import Bookshelf from '../components/Bookshelf';
import BottomNavigation from '../components/BottomNavigation';
import { PlusIcon, ProfileIcon } from '../components/Icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
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

  const handlePressBook = (bookColor: string) => {
    navigation.navigate('Reading', { bookColor });
  };

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
        <Bookshelf bookColors={shelf1Books} onPressBook={handlePressBook} />
        <Bookshelf bookColors={shelf2Books} onPressBook={handlePressBook} />
        <Bookshelf bookColors={shelf3Books} onPressBook={handlePressBook} />
        <Bookshelf bookColors={shelf4Books} onPressBook={handlePressBook} />
      </View>
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        active="bookshelf" 
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
  headerTitle: {
    fontSize: 20,
    color: '#5D4037',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default HomeScreen; 