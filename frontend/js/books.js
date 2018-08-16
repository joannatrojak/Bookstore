function bookAdd(singleBook)
{
    var newBook = '<li class="list-group-item">' +
                    '    <div class="panel panel-default">' +
                    '        <div class="panel-heading">' +
                    '            <span class="bookTitle">' + singleBook.title +'  -  ' + singleBook.author.name + ' ' + singleBook.author.surname + '</span>' +
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
function addForm(form){
    var title = form.querySelector('#title').value;
    var author_id = $('#author_id option:selected')[0].value;
    var description = form.querySelector('#description').value;
        
    $.post('http://localhost/Bookstore/rest/rest.php/book', {
        title: title, 
        author_id: author_id,
        description: description  
    });
         
}
function getBooks(){
    $.get("http://localhost/Bookstore/rest/rest.php/book", function(data)
        {
            var bookList = data.success;
            bookList.forEach(function(singleBook)
            {
               bookAdd(singleBook); 
               
            });
        }); 
}
function authorAdd(singleAuthor){
    var author = '<option>'+singleAuthor.name+' '+singleAuthor.surname+'</option>';
    authorList = document.querySelector('#bookAdd select').appendChild(document.createElement('option'));
    authorList.innerHTML += singleAuthor.name + ' ' +singleAuthor.surname; 
    
}
function getAuthor(){
    $.get("http://localhost/Bookstore/rest/rest.php/author", function(data)
    {
        var authorList = data.success; 
        authorList.forEach(function(singleAuthor){
            authorAdd(singleAuthor)
        });
    });
}
document.addEventListener('DOMContentLoaded', function()
{
    var form = document.querySelector('#bookAdd');
    
    getAuthor();
    getBooks();

    form.addEventListener('submit', function(e)
    {
        e.preventDefault(); 
        addForm(form);
        getBooks(); 
    });   
}); 