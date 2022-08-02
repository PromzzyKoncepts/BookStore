/* eslint-disable  max-classes-per-file */
/* eslint-disable  max-len */
// Using Class Book represents a book and the various values used
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// call the books and add them to the local storage
class StoredBooks {
  static getBook() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = StoredBooks.getBook();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// the User Interface class that displays the books at the top
let books;
class UserInterFace {
  static showBooks() {
    books = StoredBooks.getBook();
    books.forEach((book) => {
      UserInterFace.showBookList(book);
    });
  }

  // This is where i created the html elements dynamically
  static showBookList(book) {
    const bookLib = document.querySelector('.library');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('h5');
    const authorDiv = document.createElement('h5');
    const brTag = document.createElement('br');
    const removeBtn = document.createElement('button');
    const hrTag = document.createElement('hr');

    titleDiv.innerText = `${book.title}`;
    authorDiv.innerText = `${book.author}`;
    removeBtn.innerText = 'Remove';
    removeBtn.className = 'btn';

    // add event listener to the remove button
    removeBtn.addEventListener('click', () => {
      UserInterFace.deleteBook(removeBtn);
    });

    // Append all html elements to the parent element -bookLib
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(brTag);
    bookDiv.appendChild(removeBtn);
    bookDiv.appendChild(hrTag);
    bookLib.appendChild(bookDiv);
  }

  // function to clear the input for new inputs
  static clearInput() {
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
  }

  // this is the function for the remove button
  static deleteBook(removeBtn) {
    const filteredBooks = books.filter((book) => book.title !== removeBtn.parentElement.firstElementChild.innerText);
    localStorage.setItem('books', JSON.stringify(filteredBooks));
    removeBtn.parentElement.remove();
  }
}
// on loading or reloading browser, it restored the storedbooks
window.addEventListener('load', () => {
  UserInterFace.showBooks();
});

// addeventlistener functions for the add button
document.querySelector('#add').addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const book = new Book(title, author);
  StoredBooks.addBook(book);
  UserInterFace.showBookList(book);
  UserInterFace.clearInput();
});
