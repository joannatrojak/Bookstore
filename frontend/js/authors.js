function authorAdd(singleAuthor)
{
    var newAuthor = '<li class="list-group-item">' +
                    '<div class="panel panel-default">'+
                    '<div class="panel-heading"><span class="authorTitle">'+singleAuthor.name+' '+singleAuthor.surname+'</span>'+
                    '<button data-id="'+singleAuthor.id+'" class="btn btn-danger pull-right btn-xs btn-author-remove">'+
                    'class="fa fa-trash"></i></button>'+
                    '</div>'+
                    '</div>'+
                    '</li>-->'; 
    var list = document.querySelector('#authorsList'); 
    list.innerHTML += newAuthor; 
}
document.addEventListener('DOMContentLoaded', function()
{
    var authorAddelement = document.querySelector('#authorAdd'); 
    var authorListElement = document.querySelector('#authorsList'); 
    console.log(authorListElement); 
    $.get('http://localhost/Bookstore/rest/rest.php/author', function(data)
        {
            var authorList = data.success; 
            authorList.forEach(function(singleAuthor)
            {
                authorAdd(singleAuthor);  
            });
        }); 
    authorAddelement.addEventListener('submit', function(e)
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