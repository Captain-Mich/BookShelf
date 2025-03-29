import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Modal, ScrollView } from 'react-native';
import { BOOKSHELF_COLORS, BOOK_COLORS } from '../utils/colors';
import Bookshelf from '../components/Bookshelf';
import BottomNavigation from '../components/BottomNavigation';
import { PlusIcon, ProfileIcon } from '../components/Icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Create mostly gray books with a few colored ones as examples
  const grayColor = '#D7CCC8'; // Gray book color
  
  // Book colors for each shelf
  const shelf1Books = [
    BOOK_COLORS[0], BOOK_COLORS[1], grayColor, 
    grayColor, grayColor, grayColor, 
    grayColor, grayColor, grayColor
  ];
  
  const shelf2Books = [
    grayColor, grayColor, grayColor, 
    grayColor, grayColor, BOOK_COLORS[3], 
    grayColor, grayColor, grayColor
  ];
  
  const shelf3Books = [
    grayColor, grayColor, grayColor, 
    grayColor, grayColor, grayColor, 
    grayColor, grayColor, grayColor
  ];
  
  const shelf4Books = [
    grayColor, grayColor, grayColor, 
    grayColor, grayColor, grayColor, 
    grayColor, grayColor, grayColor
  ];
  
  const shelf5Books = [
    grayColor, BOOK_COLORS[4], grayColor, 
    grayColor, grayColor, grayColor, 
    grayColor, grayColor, grayColor
  ];
  
  const shelf6Books = [
    grayColor, grayColor, grayColor, 
    grayColor, grayColor, grayColor, 
    BOOK_COLORS[5], grayColor, grayColor
  ];

  const handlePressBook = (bookColor: string) => {
    navigation.navigate('BookDetail', { bookColor });
  };

  const handleNavigateToReading = () => {
    navigation.navigate('Reading', { bookColor: BOOK_COLORS[0] });
  };

  const handleNavigateToQuotes = () => {
    navigation.navigate('Quotes');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={BOOKSHELF_COLORS.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setModalVisible(true)}
        >
          <PlusIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BOOKSELF</Text>
        <TouchableOpacity style={styles.headerButton}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>
      
      {/* Scrollable Bookshelf content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Bookshelf bookColors={shelf1Books} onPressBook={handlePressBook} />
        <Bookshelf bookColors={shelf2Books} onPressBook={handlePressBook} />
        <Bookshelf bookColors={shelf3Books} onPressBook={handlePressBook} />
        <Bookshelf bookColors={shelf4Books} onPressBook={handlePressBook} />
        <Bookshelf bookColors={shelf5Books} onPressBook={handlePressBook} />
        <Bookshelf bookColors={shelf6Books} onPressBook={handlePressBook} />
      </ScrollView>
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        active="bookshelf"
        onPressReading={handleNavigateToReading}
        onPressBookmarks={handleNavigateToQuotes}
      />

      {/* Modal for Add Quote or Add Book */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modalButton}>
              <View style={styles.bookmarkIcon} />
              <Text style={styles.modalButtonText}>Add Quote</Text>
            </TouchableOpacity>
            
            <Text style={styles.orText}>OR</Text>
            
            <TouchableOpacity style={styles.modalButton}>
              <View style={styles.bookIcon} />
              <Text style={styles.modalButtonText}>Add Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 70,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#F6F3EA',
    borderRadius: 10,
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#5D4037',
  },
  modalButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#5D4037',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  modalButtonText: {
    color: '#F6F3EA',
    fontSize: 24,
    marginLeft: 15,
  },
  orText: {
    fontSize: 24,
    color: '#5D4037',
    marginVertical: 10,
  },
  bookmarkIcon: {
    width: 20,
    height: 30,
    backgroundColor: '#E6CBBC',
    borderRadius: 2,
  },
  bookIcon: {
    width: 24,
    height: 32,
    backgroundColor: '#E6CBBC',
    borderRadius: 2,
  },
});

export default HomeScreen; 