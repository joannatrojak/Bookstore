function authorAdd(singleAuthor)
{
    var newAuthor = '<li class="list-group-item">' +
                    '<div class="panel panel-default">'+
                    '<div class="panel-heading"><span class="authorTitle">'+singleAuthor.name+' '+singleAuthor.surname+'</span>'+
                    '<button data-id="'+singleAuthor.id+'" class="btn btn-danger pull-right btn-xs btn-author-remove">'+
                    '<i class="fa fa-trash"></i></button>'+
                    '</div>'+
                    '</div>'+
                    '</li>'; 
    var list = document.querySelector('#authorsList'); 
    list.innerHTML += newAuthor; 
}
document.addEventListener('DOMContentLoaded', function()
{
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
                var author = authorname + " " + authorsurname; 
                var select = document.querySelector('select').appendChild(option).innerHTML += author; 
                
            });
            
            var deleteAuthor = $('.panel-heading button:nth-child(2)');
            var domElement = document.querySelectorAll('.list-group-item'); 
            console.log(domElement.length);
            console.log(deleteAuthor.length); 
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