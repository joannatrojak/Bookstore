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
             
            bookList.forEach(function(singleBook)
            {
               bookAdd(singleBook); 

            });
            var bookDescription = $('.panel-heading button:nth-child(3)'); 
            
            //console.log(bookElement); 
            
            console.log(bookDescription[0].getAttribute('data-id')); 
            console.log(bookDescription.length); 
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