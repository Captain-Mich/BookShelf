import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import BookDB from '../database/schema';
import { BOOK_COLORS, getRandomBookColor, BOOKSHELF_COLORS } from '../utils/colors';

const AddBookScreen = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(getRandomBookColor());
  const navigation = useNavigation();

  const handleAddBook = () => {
    if (!title || !author) return;

    const bookId = Date.now().toString();
    BookDB.addBook({
      id: bookId,
      title,
      author,
      description,
      coverColor: selectedColor,
      content,
    });

    navigation.goBack();
  };

  const renderColorPicker = () => {
    return BOOK_COLORS.map(color => (
      <TouchableOpacity
        key={color}
        style={[
          styles.colorOption,
          { backgroundColor: color },
          selectedColor === color && styles.selectedColor,
        ]}
        onPress={() => setSelectedColor(color)}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#6D4C41" />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Book</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Book Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter book title"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Author</Text>
          <TextInput
            style={styles.input}
            value={author}
            onChangeText={setAuthor}
            placeholder="Enter author name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter book description"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Content (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={content}
            onChangeText={setContent}
            placeholder="Enter book content"
            multiline
            numberOfLines={6}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Book Color</Text>
          <View style={styles.colorContainer}>
            {renderColorPicker()}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddBook}
          disabled={!title || !author}
        >
          <Text style={styles.addButtonText}>Add Book</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BOOKSHELF_COLORS.background,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  title: {
    fontSize: 20,
    color: '#6D4C41',
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#6D4C41',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0D4C2',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 15,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#6D4C41',
  },
  addButton: {
    backgroundColor: '#6D4C41',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default AddBookScreen; 