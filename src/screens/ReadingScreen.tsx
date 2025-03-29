import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { BOOKSHELF_COLORS } from '../utils/colors';
import GoalProgress from '../components/GoalProgress';
import BottomNavigation from '../components/BottomNavigation';
import { PlusIcon, ProfileIcon } from '../components/Icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// Import the book image
import bookImage from '../assets/images/asset-1.png';

type ReadingScreenProps = NativeStackScreenProps<RootStackParamList, 'Reading'>;

const ReadingScreen = ({ route, navigation }: ReadingScreenProps) => {
  const { bookColor } = route.params;
  
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={BOOKSHELF_COLORS.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <PlusIcon />
        </TouchableOpacity>
        <Text style={styles.readingTitle}>CURRENTLY READING</Text>
        <TouchableOpacity style={styles.headerButton}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <View style={styles.readingContent}>
        {/* Open book illustration - replaced with asset-1.png */}
        <View style={styles.bookIllustrationContainer}>
          <Image source={bookImage} style={styles.bookImage} resizeMode="contain" />
        </View>
        
        {/* Book details */}
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>Alice nel pase delle meraviglie</Text>
          <Text style={styles.bookAuthor}>Lewis C. Carrol</Text>
        </View>
        
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '70%' }]} />
          </View>
          <Text style={styles.progressText}>70% progress</Text>
        </View>
        
        {/* Reading goal */}
        <GoalProgress />
      </View>
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        active="reading" 
        onPressBookshelf={handleBack}
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
  readingTitle: {
    fontSize: 16,
    color: '#5D4037',
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  readingContent: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  bookIllustrationContainer: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  bookImage: {
    width: 220,
    height: 220,
  },
  bookDetails: {
    alignItems: 'center',
    marginBottom: 30,
  },
  bookTitle: {
    fontSize: 20,
    color: '#5D4037',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: 'System',
    letterSpacing: 0.4,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#5D4037',
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 0.4,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E6CDB7',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D4A28B',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#5D4037',
    textAlign: 'right',
    width: '100%',
    fontWeight: '300',
    letterSpacing: 0.2,
  },
});

export default ReadingScreen; 