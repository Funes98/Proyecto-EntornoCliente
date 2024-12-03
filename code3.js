document.addEventListener('DOMContentLoaded', () => {

const serverUsers = 'http://localhost:3000/users';
const serverArticles = 'http://localhost:3000/articles';
const selectAuthor=document.getElementById('postAuthor');

//Funcion para crear un post
async function createPost(){

    //obtener los post
    let loadPost= await fetch(serverArticles);
    loadPost= await loadPost.json();
    let cont=Object.keys(loadPost).length;
    cont=(cont+1).toString();

    // Obtener los autores
    const authors = await fetch(serverUsers);
    const users = await authors.json();

    users.forEach(newUser => {
        const option = document.createElement('option');

        // añadir todos los autores al select
        option.textContent = newUser.name;
        option.value = newUser.id;//id del autor
        selectAuthor.appendChild(option);
       

    })

    form=document.getElementById('postForm');

    form.addEventListener('submit',function(event){
        event.preventDefault();

    //obtener los valores con los que crear el post
    const title=document.getElementById('postTitle').value;
    const authorId = document.getElementById('postAuthor').value;
    const content=document.getElementById('postContent').value;

    //variable del articulo, no incluimos el id del articulo de momento
    const newArticle = {
        id:cont,
        title:title,
        content:content,
        authorId:parseInt(authorId)
    }

    // Enviar el nuevo artículo al servidor
    fetch(serverArticles, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle)//convierte a json
    })
    .then(response => response.json()) //manejar respuesta
    .then(data => {
        console.log('Artículo creado:', data);
        //limpia los campos del formulario
        form.reset();
    })



    

    })



}


createPost();







})
