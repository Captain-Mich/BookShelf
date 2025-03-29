import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { BOOKSHELF_COLORS } from '../utils/colors';
import BottomNavigation from '../components/BottomNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type BookDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

const BookDetailScreen = ({ route, navigation }: BookDetailScreenProps) => {
  const { bookColor } = route.params;

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleNavigateToQuotes = () => {
    navigation.navigate('Quotes');
  };

  const handleNavigateToReading = () => {
    navigation.navigate('Reading', { bookColor });
  };

  // Dummy content for book page
  const loremText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={BOOKSHELF_COLORS.background}
      />
      
      {/* Header with back button and bookmark */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleNavigateToHome}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookmarkButton}>
          <View style={styles.bookmarkIcon} />
        </TouchableOpacity>
      </View>
      
      {/* Book details */}
      <View style={styles.bookInfoContainer}>
        <Text style={styles.bookTitle}>Alice nel pase delle meraviglie</Text>
        <Text style={styles.bookAuthor}>Lewis C. Carrol</Text>
      </View>
      
      {/* Book content */}
      <ScrollView style={styles.contentScroll} contentContainerStyle={styles.contentContainer}>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphText}>{loremText}</Text>
        </View>
        
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphText}>{loremText}</Text>
        </View>
        
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphText}>{loremText}</Text>
        </View>
        
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraphText}>{loremText}</Text>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        active="bookshelf"
        onPressBookshelf={handleNavigateToHome}
        onPressBookmarks={handleNavigateToQuotes}
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
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#5D4037',
  },
  bookmarkButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkIcon: {
    width: 20,
    height: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#5D4037',
  },
  bookInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 24,
    color: '#5D4037',
    fontWeight: '400',
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#5D4037',
    fontWeight: '300',
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  paragraphContainer: {
    marginBottom: 20,
  },
  paragraphText: {
    fontSize: 16,
    color: '#5D4037',
    lineHeight: 24,
  },
});

export default BookDetailScreen; 