var add_book = document.querySelector(".addBook");
var new_book = document.querySelector(".newBook");
var book_Form = document.querySelector(".book_Form");
var books_Container = document.querySelector(".overlay");
var Submit_Book = document.querySelector("#Submit");
var numberOfBooks = document.querySelector(".book-count span");

//   to display the form
add_book.addEventListener("click", function () {
  new_book.classList.toggle("active");
});

//   to remove the form
new_book.addEventListener("click", function () {
  new_book.classList.remove("active");
});
// Submit_Book.addEventListener("click", function () {
//   new_book.classList.remove("active");
// });
book_Form.addEventListener("click", function (e) {
  e.stopPropagation();
});

book_Form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("img");
  const file = fileInput.files[0]; // Get the uploaded file
  const reader = new FileReader();

  reader.onload = function () {
    const book = {
      Title: document.getElementById("title").value,
      Author: document.getElementById("author").value,
      Img: reader.result, // base64 image URL
      Pages: document.getElementById("numberOfPages").value,
      Genre: document.getElementById("genre").value,
      Read: document.getElementById("read").checked,
    };

    Load_Books(book);
    console.log(book.Read);
    new_book.classList.remove("active");
    book_Form.reset();
  };

  reader.readAsDataURL(file); // This reads the image as a base64-encoded string
});
var count=0;
function Load_Books(books) {
  numberOfBooks.textContent= ++count;
  books_Container.innerHTML += `
  <div class="card">
            <div class="book_img">
              <img src="${books.Img}" alt="" />
            </div>
            <div class="head">
              <h2 id="">${books.Title}</h2>
              <p> ${books.Author}</p>
            </div>

            <div class="book_main">
              <div class="book_genre">
                <span>Genre : </span>
                <span class="col_2">${books.Genre}</span>
              </div>
              <div class="book_pages">
                <span>Pages : </span>
                <span class="col_2">${books.Pages}</span>
              </div>
               <div class="book_status">
          <span>Status :</span>
          <span class="col_2 stat">${books.Read ? "Read" : "Unread"}</span>
        </div>
      </div>

      <div class="book_footer">
        <button class="check_status ${books.Read ? "not-read" : "read"}"
                onclick="Toggle_Read_Status(this)">
          <i class="fa-solid fa-repeat"></i>&nbsp;&nbsp;
          ${
            books.Read ? "Unread" : "Read"
          }
        </button>
        <button class="remove" onclick="Remove_Book(this)">Remove</button>
      </div>
  </div>`;
}
// function numBerOfBOOKS(book){
//   numberOfBooks.innerHTML = book;
// }

function Remove_Book(element) {
  element.closest(".card").remove();
   numberOfBooks.textContent = --count;
}

function Toggle_Read_Status(button) {
  var statusSpan = button
    .closest(".card")
    .querySelector(".book_status .stat");

  var wasRead = button.classList.contains("read");
  var nextLabel = wasRead ? "Unread" : "Read";
  var nextspan = wasRead ? "Read" : "Unread";

  // Update classes
  button.classList.toggle("read", !wasRead);
  button.classList.toggle("not-read", wasRead);

  // Update visible text (keep the icon)
  button.innerHTML = `<i class="fa-solid fa-repeat"></i>&nbsp;&nbsp;${nextLabel}`;
  statusSpan.textContent = nextspan;
}




