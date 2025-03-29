import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { BOOKSHELF_COLORS } from '../utils/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { addBook } from '../services/BookStorage';

type AddBookScreenProps = NativeStackScreenProps<RootStackParamList, 'AddBook'>;

const AddBookScreen = ({ navigation }: AddBookScreenProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAddBook = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a book title');
      return;
    }
    
    if (!author.trim()) {
      Alert.alert('Error', 'Please enter an author name');
      return;
    }
    
    const pagesNum = parseInt(pages);
    if (isNaN(pagesNum) || pagesNum <= 0) {
      Alert.alert('Error', 'Please enter a valid number of pages');
      return;
    }
    
    const newBook = await addBook(title, author, pagesNum);
    if (newBook) {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={BOOKSHELF_COLORS.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ADD BOOK</Text>
        <View style={styles.emptySpace} />
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter book title"
            placeholderTextColor="#A1887F"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Author</Text>
          <TextInput
            style={styles.input}
            value={author}
            onChangeText={setAuthor}
            placeholder="Enter author name"
            placeholderTextColor="#A1887F"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of Pages</Text>
          <TextInput
            style={styles.input}
            value={pages}
            onChangeText={setPages}
            placeholder="Enter number of pages"
            placeholderTextColor="#A1887F"
            keyboardType="numeric"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddBook}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>ADD BOOK</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    fontSize: 32,
    color: '#5D4037',
    marginTop: -4,
  },
  headerTitle: {
    fontSize: 20,
    color: '#5D4037',
    fontWeight: '500',
  },
  emptySpace: {
    width: 32,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#5D4037',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#EFEBE9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#5D4037',
    borderWidth: 1,
    borderColor: '#D7CCC8',
  },
  addButton: {
    backgroundColor: '#5D4037',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: {
    color: '#F6F3EA',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default AddBookScreen; 