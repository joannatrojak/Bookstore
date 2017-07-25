document.addEventListener('DOMContentLoaded', function()
{
    var form = document.querySelector('#bookAdd'); 
    form.addEventListener('submit', function(e)
    {
        e.preventDefault(); 
         
        $.post('http://localhost/Bookstore/rest/rest.php/book', {
            title: form.elements[0].value, 
            description: form.elements[1].value
        });
    });
}); 