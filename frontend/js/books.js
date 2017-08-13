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
    var form = document.querySelector('#bookAdd'); 
    $.get("http://localhost/Bookstore/rest/rest.php/book", function(data)
        {
            var bookList = data.success;
            var select = document.querySelector('select'); 
             
            bookList.forEach(function(singleBook)
            {
               bookAdd(singleBook);
               var option = document.createElement('option'); 
               var title = singleBook['title'];  
               var id = singleBook['id']; 
               var authorId = singleBook['author_id']; 
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
                           var node = authorSelect.appendChild(option); 
                           node.innerHTML = text; 
                       }
                       
                   }); 
               }); 
            });
            //var select = document.querySelector('select'); 
            var optionSearch = document.querySelectorAll('option'); 
            //console.log(optionSearch.length); 
            
            for (var i = 1; i<optionSearch.length; i++)
            {
                var elementToEdit = optionSearch[i]; 
                //console.log(elementToEdit); 
                
                elementToEdit.addEventListener('click', function(e)
                {
                   var value = $('#bookEditSelect option:selected').val(); 
                   $.get("http://localhost/Bookstore/rest/rest.php/book/" + value, function(data)
                   {
                      var id = data.success[0]['id']; 
                      var title = data.success[0]['title']; 
                      var description = data.success[0]['description']; 
                      var form = $('#bookEdit').show(); 
                      document.getElementById('id').value = id; 
                      var titleInput = $('#bookEdit div:nth-child(3)').find('input').val(title); 
                      var descriptionInput = $('#bookEdit div:nth-child(4)').find('textarea').val(description);
                      var buttonEdit = $('#bookEdit button:nth-child(5)'); 
                      console.log(buttonEdit); 
                      buttonEdit.submit(function(event)
                      {
                        event.preventDefault(); 
                        // not working 
                      }); 
                   }); 
                });  
            }
            
            var bookDescription = $('.panel-heading button:nth-child(3)'); 
            //console.log(bookElement); 
            
            //console.log(bookDescription[0].getAttribute('data-id')); 
            //console.log(bookDescription.length); 
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
            //console.log(deleteBook); 
            //console.log(deleteBook[0].getAttribute('data-id')); 
            //console.log(deleteBook.length); 
            
            for (var i = 1; i<deleteBook.length; i++)
            {
                deleteBook[i].addEventListener('click', function(e)
                {
                    var id = this.getAttribute('data-id'); 
                    console.log(id);
                    var elementToDelete = document.querySelectorAll('.list-group-item');
                    //console.log(elementToDelete[id]); 
                    //console.log(elementToDelete.remove()); 
                     
                    
                    
                    $.ajax({
                        url: 'http://localhost/Bookstore/rest/rest.php/book/' + id,
                        type: "DELETE", 
                        success: function(data)
                        {
                            console.log(data['success']);
                            console.log(elementToDelete.remove()); 
                            
                            
                        }
                    }); 
                    
                    
                    //var elementToDelete = $('#booksList'); 
                    //console.log(elementToDelete); 
                }); 
            }
            
            
        });
    form.addEventListener('submit', function(e)
    {
 
        e.preventDefault(); 
        var title = form.elements[0].value; 
        var description = form.elements[1].value; 
        $.post('http://localhost/Bookstore/rest/rest.php/book', {
            title: title, 
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