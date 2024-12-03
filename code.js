document.addEventListener('DOMContentLoaded', () => {
    const articlesApiUrl = 'http://localhost:3000/articles';
    const usersApiUrl = 'http://localhost:3000/users';
    const tableBody = document.getElementById('postsTable');

    async function loadArticles() {
        try {
            // Obtener los artículos y usuarios
            const [articlesResponse, usersResponse] = await Promise.all([
                fetch(articlesApiUrl),
                fetch(usersApiUrl)
            ]);

            if (!articlesResponse.ok || !usersResponse.ok) {
                throw new Error('Error al cargar los datos de la API');
            }

            const articles = await articlesResponse.json();
            const users = await usersResponse.json();

            // Generar filas en la tabla
            articles.forEach(article => {
                const row = document.createElement('tr');

                // Título con enlace
                const titleCell = document.createElement('td');
                const titleLink = document.createElement('a');
                titleLink.textContent = article.title;
                titleLink.href = `post-details.html?id=${article.id}`;
                titleCell.appendChild(titleLink);

                // Autor: recorrer los usuarios para buscar el autor
                const authorCell = document.createElement('td');
                const author = users.find(user => Number(user.id) === article.autorId);
                authorCell.textContent = author ? author.name : 'Desconocido';

                // Acciones
                const actionsCell = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.addEventListener('click', () => {
                    console.log(`Editar artículo ${article.id}`);
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => {
                    console.log(`Eliminar artículo ${article.id}`);
                });

                actionsCell.appendChild(editButton);
                actionsCell.appendChild(deleteButton);

                // Agregar celdas a la fila
                row.appendChild(titleCell);
                row.appendChild(authorCell);
                row.appendChild(actionsCell);

                // Agregar fila a la tabla
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    }


    //cargar la funcion 
    loadArticles();
});





