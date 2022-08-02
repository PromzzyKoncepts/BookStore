// Using Class Book represents a book and the various values used
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}


// call the books
// document.addEventListener('load', UserInterFace.showBooks);
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

// the User Interface class

let books;
class UserInterFace {
  static showBooks() {
    books = StoredBooks.getBook();
    books.forEach((book) => {
      UserInterFace.showBookList(book);
    });
  }

  static showBookList(book) {
    const bookLib = document.querySelector('.library');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('h5')
    const authorDiv = document.createElement('h5')
    const brTag = document.createElement('br')
    const removeBtn = document.createElement('button')
    const hrTag = document.createElement('hr')

    titleDiv.innerText = `${book.title}`;
    authorDiv.innerText = `${book.author}`;
    removeBtn.innerText = "Remove"
    removeBtn.className = "btn"

    //add event listener to the remove button
    removeBtn.addEventListener('click', (e) => {
      UserInterFace.deleteBook(removeBtn);

    })
    

    bookDiv.appendChild(titleDiv)
    bookDiv.appendChild(authorDiv)
    bookDiv.appendChild(brTag)
    bookDiv.appendChild(removeBtn)
    bookDiv.appendChild(hrTag)
    bookLib.appendChild(bookDiv)


  }

  static clearInput() {
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
  }


  static deleteBook(removeBtn) {
    removeBtn.parentElement.remove();
    books.forEach((book) => {
      localStorage.removeItem('book')
    })
  }
}

window.addEventListener('load', (e) => {
  UserInterFace.showBooks()
})

document.querySelector('#add').addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const book = new Book(title, author);
  StoredBooks.addBook(book);
  UserInterFace.showBookList(book);
  UserInterFace.clearInput();
});



