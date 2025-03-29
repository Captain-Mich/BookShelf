import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView
} from 'react-native';
import { BOOKSHELF_COLORS } from '../utils/colors';
import { getBooks, addQuoteToBook } from '../services/BookStorage';
import { Book } from '../models/Book';

interface QuoteModalProps {
  visible: boolean;
  onClose: () => void;
  onAddQuote: () => void;
  bookId?: string;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ 
  visible, 
  onClose, 
  onAddQuote,
  bookId: initialBookId
}) => {
  const [quoteText, setQuoteText] = useState('');
  const [page, setPage] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string | undefined>(initialBookId);
  const [showBookSelector, setShowBookSelector] = useState(false);

  useEffect(() => {
    if (visible) {
      loadBooks();
    }
  }, [visible]);

  useEffect(() => {
    setSelectedBookId(initialBookId);
  }, [initialBookId]);

  const loadBooks = async () => {
    const loadedBooks = await getBooks();
    setBooks(loadedBooks);
    // If no initial book is selected and we have books, select the first one
    if (!initialBookId && loadedBooks.length > 0 && !selectedBookId) {
      setSelectedBookId(loadedBooks[0].id);
    }
  };

  const handleAddQuote = async () => {
    if (!quoteText.trim()) {
      Alert.alert('Error', 'Please enter a quote');
      return;
    }
    
    if (!selectedBookId) {
      Alert.alert('Error', 'Please select a book');
      return;
    }
    
    const pageNumber = page ? parseInt(page) : undefined;
    
    try {
      await addQuoteToBook(selectedBookId, quoteText, pageNumber);
      // Clear form
      setQuoteText('');
      setPage('');
      setShowBookSelector(false);
      // Notify parent component
      onAddQuote();
    } catch (error) {
      Alert.alert('Error', 'Failed to add quote. Please try again.');
    }
  };

  const getSelectedBook = () => {
    return books.find(book => book.id === selectedBookId);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Add Quote</Text>
            
            {/* Book Selector */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Book</Text>
              <TouchableOpacity
                style={styles.bookSelectorButton}
                onPress={() => setShowBookSelector(!showBookSelector)}
              >
                <Text style={styles.bookSelectorText}>
                  {getSelectedBook()?.title || "Select a book"}
                </Text>
                <Text style={styles.bookSelectorIcon}>▼</Text>
              </TouchableOpacity>
              
              {showBookSelector && (
                <ScrollView style={styles.bookList}>
                  {books.map(book => (
                    <TouchableOpacity
                      key={book.id}
                      style={[
                        styles.bookItem,
                        selectedBookId === book.id && styles.selectedBookItem
                      ]}
                      onPress={() => {
                        setSelectedBookId(book.id);
                        setShowBookSelector(false);
                      }}
                    >
                      <View style={[styles.bookColorIndicator, { backgroundColor: book.color }]} />
                      <Text style={styles.bookItemText}>{book.title}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quote</Text>
              <TextInput
                style={styles.textInput}
                value={quoteText}
                onChangeText={setQuoteText}
                placeholder="Enter quote"
                placeholderTextColor="#A1887F"
                multiline
                numberOfLines={4}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Page (optional)</Text>
              <TextInput
                style={styles.input}
                value={page}
                onChangeText={setPage}
                placeholder="Enter page number"
                placeholderTextColor="#A1887F"
                keyboardType="numeric"
              />
            </View>
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddQuote}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>ADD QUOTE</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    width: '100%',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: BOOKSHELF_COLORS.background,
    borderRadius: 10,
    padding: 25,
    alignItems: 'stretch',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#5D4037',
  },
  modalTitle: {
    fontSize: 22,
    color: '#5D4037',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  inputGroup: {
    marginBottom: 20,
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
  textInput: {
    backgroundColor: '#EFEBE9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#5D4037',
    borderWidth: 1,
    borderColor: '#D7CCC8',
    height: 100,
    textAlignVertical: 'top',
  },
  bookSelectorButton: {
    backgroundColor: '#EFEBE9',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D7CCC8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookSelectorText: {
    fontSize: 16,
    color: '#5D4037',
  },
  bookSelectorIcon: {
    fontSize: 14,
    color: '#8D6E63',
  },
  bookList: {
    maxHeight: 150,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#D7CCC8',
    borderRadius: 8,
    backgroundColor: '#EFEBE9',
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D7CCC8',
  },
  selectedBookItem: {
    backgroundColor: 'rgba(93, 64, 55, 0.1)',
  },
  bookColorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  bookItemText: {
    fontSize: 16,
    color: '#5D4037',
  },
  addButton: {
    backgroundColor: '#5D4037',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonText: {
    color: '#F6F3EA',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default QuoteModal; 