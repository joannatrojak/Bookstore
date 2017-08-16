function authorAdd(singleAuthor)
{
    var newAuthor = '<li class="list-group-item">' +
                    '<div class="panel panel-default">'+
                    '<div class="panel-heading"><span class="authorTitle">'+singleAuthor.name+' '+singleAuthor.surname+'</span>'+
                    '<button data-id="'+singleAuthor.id+'" class="btn btn-danger pull-right btn-xs btn-author-remove">'+
                    '<i class="fa fa-trash"></i></button>'+
        '            <button data-id="' + singleAuthor.id + '"' +
        '                    class="btn btn-primary pull-right btn-xs btn-book-show-description"><i' +
        '                    class="fa fa-info-circle"></i>' +
                    '</div>'+
                    '</div>'+
                    '</li>'; 
    var list = document.querySelector('#authorsList'); 
    list.innerHTML += newAuthor; 
}
document.addEventListener('DOMContentLoaded', function()
{
    //load authors 
    var authorAddElement = document.querySelector('#authorAdd'); 
    var authorListElement = document.querySelector('#authorsList'); 
    console.log(authorListElement); 
    $.get('http://localhost/Bookstore/rest/rest.php/author', function(data)
        {
            var authorList = data.success; 
            authorList.forEach(function(singleAuthor)
            {
                authorAdd(singleAuthor);  
                var option = document.createElement('option'); 
                var authorname = singleAuthor['name']; 
                var authorsurname = singleAuthor['surname']; 
                var authorid = singleAuthor['id']; 
                var author = authorname + " " + authorsurname; 
                var select = document.querySelector('select').appendChild(option); 
                select.value = authorid; 
                select.innerHTML += author; 
            });
            //author edit selected 
            var optionSearch = document.querySelectorAll('select'); 
            
            for (var i = 0; i<optionSearch.length; i++)
            {
                var elementToEdit = optionSearch[i]; 
                
                elementToEdit.addEventListener('click', function(e)
                {
                    var value = $('#authorEditSelect option:selected').val(); 
                    
                    $.get('http://localhost/Bookstore/rest/rest.php/author/' + value, function(data)
                    {
                        var id = data.success[0]['id']; 
                        var name = data.success[0]['name']; 
                        var surname = data.success[0]['surname']; 
                        var authorEdit = $('#authorEdit').show(); 
                        
                        document.getElementById('id').value = id; 
                    }); 
                }); 
            }
            //delete Author 
            var deleteAuthor = $('.panel-heading button:nth-child(2)');
            var domElement = document.querySelectorAll('.list-group-item');
            for (var i = 0; i< deleteAuthor.length; i++)
            {
                deleteAuthor[i].addEventListener('click', function(e)
                {
                    var id = this.getAttribute('data-id');
                    var elementToDelete = domElement[id - 1]; 
                    elementToDelete.remove(); 
                    
                    $.ajax({
                        url: 'http://localhost/Bookstore/rest/rest.php/author/' + id, 
                        type: "DELETE", 
                        success: function(data)
                        {
                            console.log(data['success']); 
                        }
                    }); 
                }); 
            }
        }); 
        //add author 
    authorAddElement.addEventListener('submit', function(e)
    {
        e.preventDefault(); 
        
        var name = authorAdd.querySelector('#name').value; 
        var surname = authorAdd.querySelector('#surname').value; 
        
        $.post('http://localhost/Bookstore/rest/rest.php/author', 
        {
            name: name, 
            surname: surname
        }); 
    }); 
}); 