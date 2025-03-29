import { getRandomBookColor } from './colors';

export const generateSampleBooks = () => {
  return [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A story of wealth, love, and the American Dream in the 1920s.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'In my younger and more vulnerable years my father gave me some advice that I have been turning over in my mind ever since...',
      isRead: false
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A story of racial injustice and childhood innocence set in Alabama during the Great Depression.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow...',
      isRead: true
    },
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian social science fiction novel set in a totalitarian state.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'It was a bright cold day in April, and the clocks were striking thirteen...',
      isRead: false
    },
    {
      id: '4',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      description: 'A romantic novel following the character development of Elizabeth Bennet.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife...',
      isRead: false
    },
    {
      id: '5',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      description: 'A fantasy novel about the adventures of hobbit Bilbo Baggins.',
      coverColor: getRandomBookColor(), 
      addedDate: new Date(),
      content: 'In a hole in the ground there lived a hobbit...',
      isRead: true
    },
    {
      id: '6',
      title: 'Moby Dick',
      author: 'Herman Melville',
      description: 'The story of Captain Ahab\'s quest for revenge on the white whale.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'Call me Ishmael...',
      isRead: false
    },
    {
      id: '7',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      description: 'A dystopian novel set in a futuristic World State, where citizens are engineered.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'A squat grey building of only thirty-four stories...',
      isRead: false
    },
    {
      id: '8',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      description: 'A novel about teenage angst, alienation, and the loss of innocence.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'If you really want to hear about it, the first thing you will probably want to know is where I was born...',
      isRead: true
    },
    {
      id: '9',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      description: 'A philosophical novel about a shepherd boy who dreams of discovering a worldly treasure.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'The boy\'s name was Santiago...',
      isRead: false
    },
    {
      id: '10',
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      description: 'A novel chronicling the French invasion of Russia and the impact of the Napoleonic era on Tsarist society.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'Well, Prince, so Genoa and Lucca are now just family estates of the Buonapartes...',
      isRead: false
    },
    {
      id: '11',
      title: 'The Road',
      author: 'Cormac McCarthy',
      description: 'A post-apocalyptic novel depicting a journey of a father and his son across a landscape destroyed by an extinction event.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'When he woke in the woods in the dark and the cold of the night...',
      isRead: true
    },
    {
      id: '12',
      title: 'Don Quixote',
      author: 'Miguel de Cervantes',
      description: 'The story of a man who becomes so enchanted by reading knightly tales, that he loses his sanity.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'Somewhere in La Mancha, in a place whose name I do not care to remember...',
      isRead: false
    },
    {
      id: '13',
      title: 'Jane Eyre',
      author: 'Charlotte Brontë',
      description: 'A novel following the emotions and experiences of its eponymous character, including her growth to adulthood.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'There was no possibility of taking a walk that day...',
      isRead: false
    },
    {
      id: '14',
      title: 'Wuthering Heights',
      author: 'Emily Brontë',
      description: 'A novel about two families of the landed gentry living on the West Yorkshire moors.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'I have just returned from a visit to my landlord...',
      isRead: true
    },
    {
      id: '15',
      title: 'Les Misérables',
      author: 'Victor Hugo',
      description: 'A historical novel about the lives and interactions of several characters during the June Rebellion in Paris.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'In 1815, M. Charles-François-Bienvenu Myriel was Bishop of Digne...',
      isRead: false
    },
    {
      id: '16',
      title: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      description: 'A novel about a poor ex-student who murders a pawnbroker for her cash.',
      coverColor: getRandomBookColor(),
      addedDate: new Date(),
      content: 'On an exceptionally hot evening early in July a young man came out of the garret in which he lodged in S. Place...',
      isRead: true
    }
  ];
}; 