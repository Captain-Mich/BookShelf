import Realm from 'realm';

class Book extends Realm.Object {
  static schema = {
    name: 'Book',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      author: 'string',
      description: 'string?',
      coverColor: 'string',
      addedDate: 'date',
      content: 'string?',
      isRead: 'bool'
    }
  };
}

export const realm = new Realm({
  schema: [Book],
  schemaVersion: 1,
});

export default {
  getAllBooks: () => {
    return realm.objects('Book').sorted('addedDate', true);
  },
  addBook: (bookData) => {
    realm.write(() => {
      realm.create('Book', {
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        description: bookData.description || '',
        coverColor: bookData.coverColor,
        addedDate: new Date(),
        content: bookData.content || '',
        isRead: false
      });
    });
  },
  updateBook: (book) => {
    realm.write(() => {
      realm.create('Book', book, 'modified');
    });
  },
  deleteBook: (id) => {
    realm.write(() => {
      const book = realm.objectForPrimaryKey('Book', id);
      if (book) {
        realm.delete(book);
      }
    });
  }
}; 