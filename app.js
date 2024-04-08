// variables
const formulario = document.querySelector('#formulario')
const listaTweet = document.querySelector('#lista_tweet');
let tweets = ['hola'];


// eventos
eventListeners();
function eventListeners(){
    // cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo

    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();

    })
}


// funciones

function agregarTweet(e){
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;

    // validar

    if(tweet === ''){
        alertaError('El mensaje no debe ir vacio');
        return;
    }

    let tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj];

    crearHTML();


    // Reiniciar el fomrulario
    formulario.reset();
}



function alertaError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // insertando el error en pantalla
    formulario.appendChild(mensajeError);

    setTimeout(() =>{
        mensajeError.remove();
    },3000)
}


function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet=>{
            // crear boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar_tweet');
            btnEliminar.innerText = 'X'
            
            // añadir la funcion de eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            // crear lista HTML
            const li = document.createElement('li');

            //asignar texto
            li.innerText = tweet.tweet;
            
            // asisganr boton
            li.appendChild(btnEliminar);

            // Insertando en el html
            listaTweet.appendChild(li);

            
        })
    }

    sincronizarStorage();
}


// limpiar el HTML

function limpiarHTML(){
    while (listaTweet.firstElementChild){
        listaTweet.removeChild(listaTweet.firstElementChild);
    }
}

// guardar los tweet en el local storage

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// eliminar un tweet

function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id)
    console.log(tweets);
    crearHTML();
}