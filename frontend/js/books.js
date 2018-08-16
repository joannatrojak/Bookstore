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
    getBooks();
         
}
function getBooks(){
    $.get("http://localhost/Bookstore/rest/rest.php/book", function(data)
        {
            var bookList = data.success;
            bookList.forEach(function(singleBook)
            {
               bookAdd(singleBook); 
               editAuthor(singleBook);
            });
            editForm();
        }); 
}
function authorAdd(singleAuthor){
    authorList = document.querySelector('#bookAdd select').appendChild(document.createElement('option'));
    authorList.innerHTML += singleAuthor.name + ' ' +singleAuthor.surname; 
    authorList.value = singleAuthor.id;
    
}
function getAuthor(){
    $.get("http://localhost/Bookstore/rest/rest.php/author", function(data)
    {
        var authorList = data.success; 
        authorList.forEach(function(singleAuthor){
            authorAdd(singleAuthor);
            authorEdit(singleAuthor);
        });
    });
}
function editAuthor(singleBook){
    var authorList = document.querySelector('#bookEditSelect').appendChild(document.createElement('option'));
    authorList.innerHTML += singleBook.title;
    authorList.value = singleBook.id;    
}
function editForm(){
    var options = document.querySelectorAll('#bookEditSelect option');
    options.forEach(function(option){
       option.addEventListener('click', function(e){
           document.querySelector('#bookEdit').style.display = 'block';
           var id = option.value;
           getBookToEdit(id);
       });
    });
}
function getBookToEdit(id){
    $.get('http://localhost/Bookstore/rest/rest.php/book/' + id, function (data){
        var title = data.success[0]['title']; 
        var description = data.success[0]['description'];
        var author = data.success[0]['author']['name'] +' '+ data.success[0]['author']['surname'];
        var author_id = data.success[0]['author']['id']; 
        
        var bookEdit = document.querySelector('#bookEdit');
        bookEdit.querySelector('#title').value = title;
        bookEdit.querySelector('#description').value = description;
        
        var optionsAuthor = bookEdit.querySelectorAll('#author_id_edit option');
        
        optionsAuthor.forEach(function(singleAuthor){ 
            if (singleAuthor.value === author_id){
                singleAuthor.selected = 'true';
            }
        });
        
    });
}
function authorEdit(singleAuthor){
    var editList = document.querySelector('#author_id_edit').appendChild(document.createElement('option'));
    editList.innerHTML += singleAuthor.name + ' ' + singleAuthor.surname; 
    editList.value = singleAuthor.id; 
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