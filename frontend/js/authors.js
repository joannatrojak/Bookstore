function authorAdd(singleAuthor)
{
    var newAuthor = '<li class="list-group-item">' +
                    '<div class="panel panel-default">'+
                    '<div class="panel-heading"><span class="authorTitle">'+singleAuthor.name+' '+singleAuthor.surname+'</span>'+
                    '<button data-id="'+singleAuthor.id+'" class="btn btn-danger pull-right btn-xs btn-author-remove">'+
                    '<i class="fa fa-trash"></i></button>'+
        '            <button data-id="' + singleAuthor.id + '"' +
        '                    class="btn btn-primary pull-right btn-xs btn-book-show-description"><i' +
        '                    class="fa fa-info-circle"></i></button>' +
                    '</div>'+
                    '<ul class="authorBooksList"></ul>'+
                    '</div>'+
                    '</li>'; 
    var list = document.querySelector('#authorsList'); 
    list.innerHTML += newAuthor; 
}
function addForm(){
    var form = document.querySelector('#authorAdd'); 
    form.addEventListener('submit', function(e){
        e.preventDefault();
        var name = form.querySelector('#name').value;
        var surname = form.querySelector('#surname').value;
        $.post('http://localhost/Bookstore/rest/rest.php/author', {
            name: name, 
            surname: surname
        });
    });
}
function getAuthor(){
    $.get('http://localhost/Bookstore/rest/rest.php/author', function(data){
        var authorList = data.success; 
        authorList.forEach(function(singleAuthor){
           authorAdd(singleAuthor); 
           authorEdit(singleAuthor);
        });
        editForm();
        getAuthorInfo();
        deleteAuthor();
        
    });
}
function authorEdit(singleAuthor){
    var authorList = document.querySelector('#authorEditSelect').appendChild(document.createElement('option'));
    authorList.innerHTML += singleAuthor.name + ' ' + singleAuthor.surname;
    authorList.value = singleAuthor.id; 
}
function editForm(){
    var options = document.querySelectorAll('#authorEditSelect option');
    options.forEach(function(option){
        option.addEventListener('click', function(e){
           document.querySelector('#authorEdit').style.display = 'block';
           var id = option.value;
           getAuthorToEdit(id);
        });
    });
}
function getAuthorToEdit(id){
    $.get('http://localhost/Bookstore/rest/rest.php/author/' + id, function(data){
        var name = data.success[0]['name']; 
        var surname = data.success[0]['surname'];
        
        var authorEdit = document.querySelector('#authorEdit');
        authorEdit.querySelector('#name').value = name;
        authorEdit.querySelector('#surname').value = surname;
        
        authorEdit.addEventListener('submit', function(e){
            e.preventDefault();
            var name = authorEdit.querySelector('#name').value;
            var surname = authorEdit.querySelector('#surname').value;
            
            $.ajax({
                url: 'http://localhost/Bookstore/rest/rest.php/author/' + id, 
                type: 'PATCH',
                dataType: 'json',
                data: {id: id, name: name, surname: surname},
                success: function(data){
                    getAuthor();
                }
            });
        });
        
    });
}
function getAuthorInfo(){
    var info = document.querySelectorAll('.btn-book-show-description'); 
    
    info.forEach(function(singleInfo){
        singleInfo.addEventListener('click', function(e){
            var id = this.getAttribute('data-id');
            var list = singleInfo.parentNode.parentNode.children[1]; 
            $.get('http://localhost/Bookstore/rest/rest.php/author/' + id, function(data){
                var bookList = data.success[0]['books'];
                bookList.forEach(function(book){
                    booksList = list.appendChild(document.createElement('li'));
                    booksList.innerHTML = book.title;
                    list.style.display = 'block';
                });
            });
        });
    });
}
function deleteAuthor(){
    var deleteButton = document.querySelectorAll('.btn-author-remove');
    deleteButton.forEach(function(button){
        button.addEventListener('click', function(e){
            var id = this.getAttribute('data-id');
            $.ajax({
                url: 'http://localhost/Bookstore/rest/rest.php/author/' + id,
                type: 'DELETE', 
                success: function(data){
                    if (data['success'] == 'deleted'){
                        getAuthor();
                    }
                }
            });
        });
    });
}
document.addEventListener('DOMContentLoaded', function()
{
    addForm();
    getAuthor();
}); 