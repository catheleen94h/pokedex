// 1. Declaración de variables globales
let favorito = JSON.parse(localStorage.getItem("favorito")) || [];
let pokemonActual = null;

const pokemon = document.getElementById('barra-b');
const botonBuscar = document.getElementById('btn-buscar');
const contenedorCartas = document.querySelector(".contendor-cartas");

// 2. Evento de búsqueda
botonBuscar.addEventListener('click', (evento) => {
    evento.preventDefault(); 
    const busqueda = pokemon.value.trim().toLowerCase(); 

    if (busqueda !== "") {
        apiRequest(busqueda);
    }
});

// 3. Petición a la PokéAPI
const apiRequest = async (busqueda) => {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`);
        
        if (!respuesta.ok) {
            throw new Error("Pokémon no encontrado");
        }

        const data = await respuesta.json();
        if (data) {
            pokemonActual = data; // Guardamos la referencia global
            paintPokemon(data);
        }
    } catch (error) {
        console.log("Hubo un error al pedir los datos en la PokeApi: " + error);
        document.getElementById('mensaje').innerHTML = 'Pokémon no encontrado';
        contenedorCartas.innerHTML = "";
    }
};

// 4. Renderizado de la tarjeta principal
const paintPokemon = (data)=>{
    // Obtenemos los PS (HP) de las estadísticas de la API
    const hp = data.stats.find(stat => stat.stat.name === 'hp').base_stat;

    contenedorCartas.innerHTML = `
        <div class="tarjeta-tcg">
            <div class="tarjeta-header">
                <span class="tipo-etiqueta">BÁSICO</span>
                <span class="pokemon-nombre">${data.name}</span>
                <div class="pokemon-hp">
                    <span class="hp-texto">PS</span>
                    <span class="hp-numero">${hp}</span>
                    <span class="icono-tipo-mini">◓</span>
                </div>
            </div>

            <div class="tarjeta-marco-imagen">
                <img class="tarjeta-imagen" src="${data.sprites.other.dream_world.front_default}" alt="${data.name}">
            </div>

            <div class="tarjeta-info-tecnica">
                <span>N.º ${data.id} • Pégemon Ratón • Alt: ${data.height/10}m • Peso: ${data.weight/10}kg</span>
            </div>

            <div class="tarjeta-cuerpo">
                <div class="tipos">
                    ${data.types.map(type => `<span class='pokemon-tipo'>${type.type.name}</span>`).join("")}
                </div>
                <button type="button" id="btn-guardar">Guardar en Colección</button>
            </div>
        </div>
    `;
    document.getElementById('mensaje').innerHTML= '';
};

// 5. Escuchador para el botón "Guardar" en las cartas
contenedorCartas.addEventListener("click", (evento) => {
    if (evento.target && evento.target.id === "btn-guardar") {
        if (pokemonActual) {
            const yaExiste = favorito.some(poke => poke.id === pokemonActual.id);

            if (yaExiste) {
                alert("¡Este Pokémon ya está en tu lista de favoritos!");
            } else {
                const pokemonParaGuardar = { 
                    id: pokemonActual.id, 
                    nombre: pokemonActual.name,
                    // Usamos imagen oficial o sprite por si dream_world viene nulo
                    imagen: pokemonActual.sprites.other['official-artwork'].front_default || pokemonActual.sprites.front_default 
                };

                favorito.push(pokemonParaGuardar);
                localStorage.setItem("favorito", JSON.stringify(favorito));
                pintarGuardados(); // Actualizamos la lista inferior
            }
        }
    }
});

// 6. Función para pintar la lista de Pokémon guardados en la parte inferior
const pintarGuardados = () => {
    const contenedorGuardados = document.getElementById("pokemones-guardados");
    
    if (favorito.length === 0) {
        contenedorGuardados.innerHTML = `<p class="sin-guardados">No tienes Pokémon guardados aún.</p>`;
        return;
    }

    contenedorGuardados.innerHTML = favorito.map(poke => `
        <div class="tarjeta-guardada">
            <div class="img-contenedor-guardado">
                <img src="${poke.imagen}" alt="${poke.nombre}">
            </div>
            <div class="info-guardado">
                <p class="nombre-guardado">${poke.nombre}</p>
                <span class="numero-guardado">#${poke.id}</span>
            </div>
            <button class="btn-eliminar" data-id="${poke.id}">×</button>
        </div>
    `).join("");
};

// 7. Eliminar de favoritos al hacer clic en la 'x'
document.getElementById("pokemones-guardados").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const idAEliminar = parseInt(e.target.getAttribute("data-id"));
        favorito = favorito.filter(poke => poke.id !== idAEliminar);
        localStorage.setItem("favorito", JSON.stringify(favorito));
        pintarGuardados();
    }
});

// 8. Carga inicial
document.addEventListener("DOMContentLoaded", () => {
    pintarGuardados(); // Cargamos los guardados existentes del localStorage
    apiRequest("pikachu"); // Carga un Pokémon por defecto al abrir
});