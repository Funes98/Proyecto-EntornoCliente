document.addEventListener('DOMContentLoaded', ()=>{

const serverUsers="http://localhost:3000/users";

async function createUser() {

    const authors = await fetch(serverUsers);
    const users = await authors.json();

    let cont = Object.keys(users).length;
    cont=(cont+1).toString();

    const form=document.getElementById('userForm');

    form.addEventListener('submit',function(event){

        event.preventDefault();

        //pillamos los valores
        const name=document.getElementById('username').value;
        const email=document.getElementById('email').value;

        //creamos el objeto
        const newUser={
            id:cont,
            name:name,
            email:email
        }


        // Enviar el nuevo artículo al servidor
        fetch(serverUsers, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)//convierte a json
        })
        .then(response => response.json()) //manejar respuesta
        .then(data => {
        console.log('Usuario creado:', data);
        //limpia los campos del formulario
        form.reset();
        })


    })


}

createUser();

})