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
    var description = document.querySelector('div panel-heading'); 
    console.log(description); 
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