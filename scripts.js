// Url de la API de moviedb
const URL = "https://api.themoviedb.org/3";

//Selectores de elementos
const ant = document.getElementById("btnAnterior");
const sig = document.getElementById("btnSiguiente");
const flex = document.getElementById("trendingFlex");

//Funcion asincrona de carga de peliculas

let paginaActual = 1;

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `${URL}/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${paginaActual}`
    );

    //Verifica una response 200 OK.
    if (respuesta.status === 200) {
      //Almacenamos los datos de la api en una variable
      const datos = await respuesta.json();

      let peliculas = [];

      //Genera un array de peliculas con la informacion recibida de la api
      datos.results.forEach((pelicula) => {
        peliculas += `
             <div class="pelicula">
          <a href="./html/movieInfo.html"><img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="..." class="pIMG" />
            <div class="nombreInvisible">
              <p class="movieTitle">${pelicula.title}</p>
            </div>
          </a>
        </div>
             `;
      });

      //Añade las peliculas al DOM.
      flex.innerHTML = peliculas;
    }
  } catch (error) {
    //catch, en caso de error, queda el fallback (peliculas default en el html)
    console.log(error.message);
  }
};

// Listeners de botones de cambio de pagina, con limites
ant.addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual -= 1;
    cargarPeliculas();
  }
});

sig.addEventListener("click", () => {
  if (paginaActual < 1000) {
    paginaActual += 1;
    cargarPeliculas();
  }
});

//Llamada a carga inicial
cargarPeliculas();
