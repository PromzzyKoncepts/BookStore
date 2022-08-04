/* eslint-disable  max-classes-per-file */
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

  // this part counts the numbber of books present from the local storage
  static bookNumber() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books.length;
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
    bookDiv.className = 'book-container';
    const titleDiv = document.createElement('h5');
    const authorDiv = document.createElement('h5');
    const removeBtn = document.createElement('button');

    titleDiv.innerText = `${book.title}`;
    authorDiv.innerText = `${book.author}`;
    const bookReferences = document.createElement('p');
    bookReferences.innerText = `${book.title} by ${book.author}`;
    removeBtn.innerText = 'Remove';
    removeBtn.className = 'btn';
    bookDiv.appendChild(bookReferences);
    bookDiv.appendChild(removeBtn);
    bookLib.appendChild(bookDiv);
    removeBtn.addEventListener('click', () => {
      UserInterFace.deleteBook(removeBtn);
    });
  }

  static clearInput() {
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
  }

  // this is the function for the remove button
  static deleteBook(removeBtn) {
    const books = StoredBooks.getBook();
    const bookTitle = removeBtn.parentElement.firstElementChild.innerText;
    const filteredBooks = books.filter((book) => book.title !== bookTitle.slice(0, bookTitle.indexOf('by') - 1));
    localStorage.setItem('books', JSON.stringify(filteredBooks));
    removeBtn.parentElement.remove();
  }
}
// on loading or reloading browser, it restored the storedbooks
window.addEventListener('load', () => {
  UserInterFace.showBooks();
  document.getElementsByClassName('library')[0].style.display = 'none';
  document.getElementById('form').style.display = 'flex';
  document.getElementById('contact').style.display = 'none';
  document.getElementsByClassName('formElement')[0].style.display = 'flex';
  document.getElementsByTagName('h1')[0].style.display = 'none';
});

// addeventlistener functions for the add button
document.querySelector('#add').addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const bookAddedMsg = document.getElementById('display-msg');
  const message = document.createElement('p');
  message.className = 'message';
  bookAddedMsg.appendChild(message);
  if (!title || !author) {
    message.innerText = 'Title and author cannot be empty';
    message.classList = 'error';
  } else {
    const book = new Book(title, author);
    StoredBooks.addBook(book);
    UserInterFace.showBookList(book);
    UserInterFace.clearInput();
    message.innerText = 'Great! Your book was successfully added!!';
  }
  setTimeout(() => {
    message.textContent = '';
    message.style.display = 'none';
  }, 3000);
});

const showContact = document.getElementById('showContact');
const showForm = document.getElementById('showForm');
const showBooks = document.getElementById('showList');

showContact.addEventListener('click', () => {
  document.getElementsByClassName('library')[0].style.display = 'none';
  document.getElementById('contact').style.display = 'flex';
  document.getElementsByClassName('formElement')[0].style.display = 'none';
  document.getElementsByTagName('h1')[0].style.display = 'none';
});

showForm.addEventListener('click', () => {
  document.getElementsByClassName('library')[0].style.display = 'none';
  document.getElementById('form').style.display = 'flex';
  document.getElementById('contact').style.display = 'none';
  document.getElementsByClassName('formElement')[0].style.display = 'flex';
  document.getElementsByTagName('h1')[0].style.display = 'none';
});

showBooks.addEventListener('click', () => {
  document.getElementsByClassName('library')[0].style.display = 'block';
  document.getElementById('contact').style.display = 'none';
  document.getElementsByClassName('formElement')[0].style.display = 'none';
});

function changeLinkColor(index) {
  const navItems = document.querySelectorAll('.nav-item');
  Array.from(navItems).forEach((item, ind) => (ind === index ? item.classList.toggle('clicked-link') : item.classList.remove('clicked-link')));
}
changeLinkColor();

const listNum = document.getElementById('showListNum');
listNum.className = 'list';
listNum.innerText = `${StoredBooks.bookNumber()}`;

const date = document.getElementsByClassName('date')[0];
date.innerText = ` Date: ${new Date().getDate()} | ${new Date().getMonth()} | ${new Date().getFullYear()}`;
