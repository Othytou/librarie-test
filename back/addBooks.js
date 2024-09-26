// back/addBooks.js
const Book = require('./models/bookModel');

const books = [
  { 
    title: "1984", 
    author: "George Orwell", 
    edition: "Penguin Books",
    price: 9.99,
    description: "A dystopian novel set in a totalitarian future society.",
    date_publication: "1949-06-08"
  },
  { 
    title: "Le Petit Prince", 
    author: "Antoine de Saint-Exupéry", 
    edition: "Gallimard",
    price: 7.99,
    description: "A poetic tale about a young prince's travels through space.",
    date_publication: "1943-04-06"
  },
  { 
    title: "1984", 
    author: "George Orwell", 
    edition: "Penguin Books",
    price: 9.99,
    description: "A dystopian novel set in a totalitarian future society.",
    date_publication: "1949-06-08"
  },
  { 
    title: "Le Petit Prince", 
    author: "Antoine de Saint-Exupéry", 
    edition: "Gallimard",
    price: 7.99,
    description: "A poetic tale about a young prince's travels through space.",
    date_publication: "1943-04-06"
  },
  { 
    title: "Harry Potter à l'école des sorciers", 
    author: "J.K. Rowling", 
    edition: "Bloomsbury",
    price: 12.99,
    description: "The first book in the Harry Potter series.",
    date_publication: "1997-06-26"
  },
  { 
    title: "Le Seigneur des Anneaux", 
    author: "J.R.R. Tolkien", 
    edition: "George Allen & Unwin",
    price: 14.99,
    description: "An epic fantasy novel about the quest to destroy the One Ring.",
    date_publication: "1954-07-29"
  },
  { 
    title: "Orgueil et Préjugés", 
    author: "Jane Austen", 
    edition: "T. Egerton",
    price: 8.99,
    description: "A romantic novel that critiques the British landed gentry.",
    date_publication: "1813-01-28"
  },
  { 
    title: "To Kill a Mockingbird", 
    author: "Harper Lee", 
    edition: "J.B. Lippincott & Co.",
    price: 10.99,
    description: "A novel about the serious issues of rape and racial inequality.",
    date_publication: "1960-07-11"
  },
  { 
    title: "Dune", 
    author: "Frank Herbert", 
    edition: "Chilton Books",
    price: 11.99,
    description: "A science fiction novel set in a distant future amidst a huge interstellar empire.",
    date_publication: "1965-08-01"
  },
  { 
    title: "Le Comte de Monte-Cristo", 
    author: "Alexandre Dumas", 
    edition: "Château de Monte-Cristo",
    price: 13.99,
    description: "A tale of an unjustly imprisoned man who seeks revenge.",
    date_publication: "1844-08-28"
  },
  { 
    title: "Les Misérables", 
    author: "Victor Hugo", 
    edition: "A. Lacroix, Verboeckhoven & Cie",
    price: 15.99,
    description: "A story of redemption and the struggles of the poor in France.",
    date_publication: "1862-04-03"
  },
  { 
    title: "Crime et Châtiment", 
    author: "Fiodor Dostoïevski", 
    edition: "The Russian Messenger",
    price: 12.99,
    description: "A psychological drama about morality and redemption.",
    date_publication: "1866-01-01"
  }];

async function addBooks() {
  for (const book of books) {
    try {
      await new Promise((resolve, reject) => {
        Book.createBook(book, (err, createdBook) => {
          if (err) reject(err);
          else {
            console.log(`Livre ajouté avec l'ID: ${createdBook.id}`);
            resolve(createdBook);
          }
        });
      });
    } catch (err) {
      console.error('Erreur lors de l\'ajout du livre:', err.message);
    }
  }
  console.log('Tous les livres ont été ajoutés');
  process.exit(0);
}

addBooks();