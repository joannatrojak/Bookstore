function bookAdd(singleBook)
{
    var newBook = '<li class="list-group-item">' +
                    '    <div class="panel panel-default">' +
                    '        <div class="panel-heading">' +
                    '            <span class="bookTitle">' + singleBook.title + '</span>' +
                    '            <button data-id="' + singleBook.id + '"' +
                    '                    class="btn btn-danger pull-right btn-xs btn-book-remove"><i' +
                    '                    class="fa fa-trash"></i>' +
                    '            </button>' +
                    '            <button data-id="' + singleBook.id + '"' +
                    '                    class="btn btn-primary pull-right btn-xs btn-book-show-description"><i' +
                    '                    class="fa fa-info-circle"></i>' +
                    '            </button>' +
                    '        </div>' +
                    '        <div class="panel-body book-description">' + singleBook.description + '</div>' +
                    '    </div>' +
                    '</li>';
    var list = document.querySelector('#booksList');
    list.innerHTML += newBook;
    
}
document.addEventListener('DOMContentLoaded', function()
{
    //load books 
    var form = document.querySelector('#bookAdd'); 
    $.get("http://localhost/Bookstore/rest/rest.php/book", function(data)
        {
            var bookList = data.success;
            bookList.forEach(function(singleBook)
            {
               bookAdd(singleBook);
               var optionAuthor = document.createElement('option');
               var optionBook = document.createElement('option');
               var title = singleBook['title'];
               var id = singleBook['id'];
               var authorId = singleBook['author_id'];
               var selectBook = document.getElementById('bookEditSelect').appendChild(optionBook);
               selectBook.innerHTML += title;
               selectBook.value = id;

               $.get('http://localhost/Bookstore/rest/rest.php/author', function(data)
               {
                   var authorList = data.success;
                   authorList.forEach(function(singleAuthor)
                   {
                       var id = singleAuthor['id'];

                       if (id === authorId)
                       {
                           var name = singleAuthor['name'];
                           var surname = singleAuthor['surname'];
                           var authorSelect = document.querySelector('#author_id');
                           var text = name + ' ' + surname;
                           var node = authorSelect.appendChild(optionAuthor);
                           node.value = id;
                           node.innerHTML = text;
                       }
                   });

               });
            });
            var bookEditform = $('#bookEdit');
            var bookEdit = $('#bookEditSelect option');
            console.log(bookEdit.length);

            for (var i = 1; i< bookEdit.length; i++)
            {
                var elementToEdit = bookEdit[i];

                elementToEdit.addEventListener('click', function (e)
                {
                    bookEditform.show();
                    var value = $('#bookEditSelect option:selected').val();

                    $.get('http://localhost/Bookstore/rest/rest.php/book/' + value, function (data) {
                        var author_id = data.success[0]['author_id'];
                        $.get('http://localhost/Bookstore/rest/rest.php/author/' + author_id, function (data) {
                            var name = data.success[0]['name'];
                            var surname = data.success[0]['surname'];
                            var author = name + surname;
                            var authoroption = document.createElement('option');
                            
                        }); 
                    });
                });
            }

            
            var bookDescription = $('.panel-heading button:nth-child(3)'); 

            for (var i = 0; i<bookDescription.length; i++)
            {
                bookDescription[i].addEventListener('click', function(e)
                {
                    var id = this.getAttribute('data-id');
                    var bookElement = $('.list-group-item div:nth-child(2)'); 
                     
                    $.get('http://localhost/Bookstore/rest/rest.php/book/' + id, function(data)
                    {
                        var description = data.success[0]['description']; 
                        var singleElement = bookElement[id];
                        singleElement.style.display = "block"; 
                        console.log(singleElement);   
                    }); 
                });     
            }
            
            var deleteBook = $('.panel-heading button:nth-child(2)');
            var domElement = document.querySelectorAll('.list-group-item');
            for (var i = 0; i<deleteBook.length; i++)
            {
                deleteBook[i].addEventListener('click', function(e)
                {
                    var id = this.getAttribute('data-id');
                    var elementToDelete = domElement[id - 1];
                    elementToDelete.remove();

                    $.ajax({
                        url: 'http://localhost/Bookstore/rest/rest.php/book/' + id,
                        type: "DELETE", 
                        success: function(data)
                        {
                            console.log(data['success']);
                        }
                    }); 
                }); 
            }
        });
        //add book 
    form.addEventListener('submit', function(e)
    {
 
        e.preventDefault(); 
        var title = form.querySelector('#title').value;
        var author = $('#author_id option:selected').val();
        var description = form.querySelector('#description').value;


        $.post('http://localhost/Bookstore/rest/rest.php/book', {
            title: title, 
            author_id: author,
            description: description 
            
        });

        $.get("http://localhost/Bookstore/rest/rest.php/book", function(data)
        {
            var bookList = data.success;
            bookList.forEach(function(singleBook)
            {
               bookAdd(singleBook); 
               
            });
        }); 
    });
    
}); 