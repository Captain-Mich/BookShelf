// Colors based on the provided image
export const BOOK_COLORS = [
  '#6D4C41', // Dark brown
  '#A1887F', // Medium brown
  '#D7CCC8', // Light beige
  '#EFEBE9', // Off-white
  '#E6A191', // Salmon pink
  '#CB8D7A', // Light rust
  '#BC8D6E', // Tan
];

export const getRandomBookColor = () => {
  const randomIndex = Math.floor(Math.random() * BOOK_COLORS.length);
  return BOOK_COLORS[randomIndex];
};

export const BOOKSHELF_COLORS = {
  background: '#F6F3EA', // Light cream background
  shelf: '#7D6E55',      // Olive/brown shelf
}; 