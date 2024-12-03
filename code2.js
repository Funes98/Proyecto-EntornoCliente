
////////////////////////TITULO Y AUTOR 
document.addEventListener('DOMContentLoaded', async () => {
    const apiUrlArticles = 'http://localhost:3000/articles';
    const apiUrlUsers = 'http://localhost:3000/users';
    const titleElement = document.getElementById('postTitle');
    const authorElement = document.getElementById('postAuthor');

    // Obtener el ID del artículo desde la URL
    const articleId = new URLSearchParams(window.location.search).get('id');

    // Obtener el artículo y los usuarios
    const [article, users] = await Promise.all([
        fetch(`${apiUrlArticles}/${articleId}`).then(res => res.json()),
        fetch(apiUrlUsers).then(res => res.json())
            ]);

    // Mostrar título 
    titleElement.textContent = article.title || 'Título no encontrado';
    
    //Mostrar autor
    const author = users.find(user => Number(user.id) === article.autorId);
    authorElement.textContent = author ? author.name : 'Desconocido';

});

/////INSERTAR ARTICULO
document.addEventListener('DOMContentLoaded', async () => {
    const apiUrlArticles = 'http://localhost:3000/articles';
    const postContent = document.getElementById('postContent');
    
    // Obtener el ID del artículo desde la URL
    const articleId = new URLSearchParams(window.location.search).get('id');

    
        // Obtener el artículo desde la API
        const response = await fetch(`${apiUrlArticles}/${articleId}`);

        const article = await response.json();

        // Insertar el contenido del artículo en el DOM
        const insertPost = document.createElement('p');
        insertPost.textContent = article.content || 'No hay contenido para mostrar';
        postContent.appendChild(insertPost);

});

//INSERTAR COMENTARIOS 
document.addEventListener('DOMContentLoaded', async () =>{
    const urlComments = 'http://localhost:3000/comments';
    const postComments = document.getElementById('commentsList');

    // Obtener el ID del artículo desde la URL
    const articleId = new URLSearchParams(window.location.search).get('id');

    //
    const response = await fetch(urlComments);  // Primero, obtenemos la respuesta
    const comments = await response.json();    // Luego, convertimos la respuesta a JSON


    comments.forEach(element => {

    //aseguramos que ambos sean tipo number
    if(Number(element.articleId) === Number(articleId)){
        const insertComment = document.createElement('li');
        insertComment.textContent=element.comment;
        postComments.appendChild(insertComment);
    }

    });

})


//cargar autores en el select
document.addEventListener('DOMContentLoaded', async () =>{
    const urlUsers='http://localhost:3000/users';
    //id del select autores
    const selectUsers=document.getElementById('commentAuthor');

    const response = await fetch(urlUsers);  // Primero, obtenemos la respuesta
    const users = await response.json();    // Luego, convertimos la respuesta a JSON

    users.forEach(user => {
        const option=document.createElement('option');
        option.textContent=user.name;
        selectUsers.appendChild(option);

            
    });


})


///AÑADIR COMENTARIO
const form=document.getElementById('commentForm');
form.addEventListener('submit',function(event){
    event.preventDefault();


    //url
    const urlComments='http://localhost:3000/comments';
    const urlUsers='http://localhost:3000/users';

    //id del select autores
    const authors=document.getElementById('commentAuthor');


    async function createComment() {

        //id comentario
        const response= await fetch(urlComments);
        const comments = await response.json(); 

        let cont=Object.keys(comments).length;
        cont=(cont+1).toString();


        const comment=document.getElementById('commentContent').value;
        const commentAuthor=document.getElementById('commentAuthor').value;
        const articleId=new URLSearchParams(window.location.search).get('id');

        //
        const newComment={
            id:cont,
            comment:comment,
            userId:commentAuthor,
            articleId:articleId
        }

        // Enviar nuevo comentario al servidor
        fetch(urlComments, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment)//convierte a json
        })
        .then(response => response.json()) //manejar respuesta
        .then(data => {
        console.log('Comentario creado:', data);
        //limpia los campos del formulario
        form.reset();
        })


        
    }

createComment();

})