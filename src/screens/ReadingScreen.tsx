import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { BOOKSHELF_COLORS } from '../utils/colors';
import GoalProgress from '../components/GoalProgress';
import BottomMenu from '../components/BottomMenu';
import { ProfileIcon } from '../components/Icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getBooks, setCurrentBook, updateBookProgress } from '../services/BookStorage';
import { Book } from '../models/Book';

// This is a way to reference the asset without having the actual file
// In a real project, you'd have the actual image file
const BOOK_IMAGE_PLACEHOLDER = { uri: 'asset-1.png' };

type ReadingScreenProps = NativeStackScreenProps<RootStackParamList, 'Reading'>;

const ReadingScreen = ({ route, navigation }: ReadingScreenProps) => {
    const { bookColor } = route.params;
    const [books, setBooks] = useState<Book[]>([]);
    const [currentBookIndex, setCurrentBookIndex] = useState(0);
    const [progress, setProgress] = useState(70);

    useEffect(() => {
        const loadBooks = async () => {
            const allBooks = await getBooks();
            if (allBooks.length > 0) {
                setBooks(allBooks);

                // Find the index of the specified book by color, default to 0 if not found
                const bookIndex = allBooks.findIndex(book => book.color === bookColor);
                const index = bookIndex >= 0 ? bookIndex : 0;
                setCurrentBookIndex(index);
                setProgress(allBooks[index]?.progress || 70);
            }
        };

        loadBooks();
    }, [bookColor]);

    // Handle saving progress when it changes
    useEffect(() => {
        const saveProgress = async () => {
            if (books.length > 0 && currentBookIndex < books.length) {
                const currentBook = books[currentBookIndex];
                await updateBookProgress(currentBook.id, progress);
                await setCurrentBook(currentBook.id);
            }
        };

        saveProgress();
    }, [progress, currentBookIndex, books]);

    const navigateToPreviousBook = () => {
        if (currentBookIndex > 0) {
            setCurrentBookIndex(prevIndex => prevIndex - 1);
            setProgress(books[currentBookIndex - 1]?.progress || 70);
        }
    };

    const navigateToNextBook = () => {
        if (currentBookIndex < books.length - 1) {
            setCurrentBookIndex(prevIndex => prevIndex + 1);
            setProgress(books[currentBookIndex + 1]?.progress || 70);
        }
    };

    const currentBook = books[currentBookIndex];
    const hasMultipleBooks = books.length > 1;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={BOOKSHELF_COLORS.background}
            />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerButton}></View>
                <Text style={styles.readingTitle}>CURRENTLY READING</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <ProfileIcon />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.readingContent}>
                {/* Book illustration with navigation */}
                <View style={styles.bookNavigationContainer}>
                    {/* Left navigation chevron */}
                    {hasMultipleBooks && (
                        <TouchableOpacity
                            style={[styles.navChevron, styles.leftNavChevron, currentBookIndex === 0 && styles.navChevronDisabled]}
                            onPress={navigateToPreviousBook}
                            disabled={currentBookIndex === 0}
                        >
                            <Text style={styles.navChevronText}>‹</Text>
                        </TouchableOpacity>
                    )}

                    {/* Book image or placeholder */}
                    <Image source={require('../assets/images/asset-1.png')} style={styles.bookImage} resizeMode="contain" />


                    {/* Right navigation chevron */}
                    {hasMultipleBooks && (
                        <TouchableOpacity
                            style={[styles.navChevron, styles.rightNavChevron, currentBookIndex === books.length - 1 && styles.navChevronDisabled]}
                            onPress={navigateToNextBook}
                            disabled={currentBookIndex === books.length - 1}
                        >
                            <Text style={styles.navChevronText}>›</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Book details */}
                <View style={styles.bookDetails}>
                    <Text style={styles.bookTitle}>{currentBook?.title || "No books added yet"}</Text>
                    <Text style={styles.bookAuthor}>{currentBook?.author || "Add a book to start reading"}</Text>
                </View>

                {/* Progress bar */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{progress}% progress</Text>
                </View>

                {/* Reading goal */}
                <GoalProgress />
            </View>

            {/* Bottom Navigation */}
            <BottomMenu activeTab="reading" />
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
    backIcon: {
        fontSize: 32,
        color: '#5D4037',
        marginTop: -4,
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
        marginBottom: 60, // Add bottom margin for the navigation bar
    },
    bookNavigationContainer: {
        width: '100%',
        height: 220,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    bookImageContainer: {
        width: 220,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookImagePlaceholder: {
        width: 220,
        height: 200,
        backgroundColor: '#8D6E63',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookImagePlaceholderText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookImage: {
        width: '100%',
        height: '100%',
    },
    navChevron: {
        position: 'absolute',
        top: '50%',
        marginTop: -25,
        height: 50,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    leftNavChevron: {
        left: 0,
    },
    rightNavChevron: {
        right: 0,
    },
    navChevronDisabled: {
        opacity: 0.3,
    },
    navChevronText: {
        color: '#5D4037',
        fontSize: 40,
        fontWeight: 'bold',
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