const pokemonList = document.querySelector('.All-Pokemon');
let URL = "https://pokeapi.co/api/v2/pokemon/";
let resultsArray = [];
const listaPokemon = document.querySelector("#listaPokemonBuscados");
let pokemonEncontrados = [];
var objetoEncontrado;
var pokemonAleatorio;
let pokemonAleatorios = [];

const fetchAndSaveData = async () => {
    try {
        const fetchPromises = [];

        for (let i = 1; i <= 1025; i++) {
            fetchPromises.push(fetch(URL + i).then(response => response.json()));
        }

        const responses = await Promise.all(fetchPromises);
        resultsArray = responses;
        
        console.log("Todas las solicitudes fetch se completaron.");
        console.log("Array de resultados:", resultsArray);

        const pokemonAleatorio = generarPokemonAleatorio();
        console.log("Pokemon aleatorio:", pokemonAleatorio);
    } catch (error) {
        console.error("Ocurrió un error al realizar las solicitudes fetch:", error);
    }
};

fetchAndSaveData();

generarNumeroAleatorio = () => {
    var numeroAleatorio = Math.floor(Math.random() * 1025) + 1;
    return numeroAleatorio;
}

const generarPokemonAleatorio = () => {
    const numeroAleatorio = generarNumeroAleatorio();
    const pokemonAleatorio = resultsArray[numeroAleatorio - 1];
    const nombre = pokemonAleatorio.name;
    let tipos = pokemonAleatorio.types.map(type => type.type.name);
    let tipos2 = pokemonAleatorio.types.map(type => `<p class="${type} tipo">${type}</p>`).join(''); 
    const habilidad = pokemonAleatorio.abilities[0].ability.name;
    const altura = pokemonAleatorio.height / 10 + "m";
    const peso = pokemonAleatorio.weight / 10 + "kg";
    pokemonAleatorios.push({
        nombre: nombre,
        imagenURL: pokemonAleatorio.sprites.other["official-artwork"].front_default,
        habilidad: habilidad,
        tipos: tipos,
        altura: altura,
        peso: peso
    });
    const PokemonEncontrar = document.createElement("div");
    PokemonEncontrar.classList.add("Pokemon");
    PokemonEncontrar.innerHTML = `
        <h3 class="pokemon-name">${nombre}</h3>
        <div class="pokemon-image">
            <img id="pokemonImg" src="${pokemonAleatorio.sprites.other["official-artwork"].front_default}" alt="${nombre}">
        </div>
        <p class="pokemon-ability">${habilidad}</p>
        <div class="pokemon-types">
            ${tipos2}
        </div>
        
        <div class="pokemon-stats">
            <p class="height">${altura}</p> <!-- Mostrar la altura -->
            <p class="weight">${peso}</p> <!-- Mostrar el peso -->
        </div>
        
    `;
    document.getElementById("listaPokemonEncontrado").appendChild(PokemonEncontrar);
    return pokemonAleatorio;
}
let intentos = 0;

function handleKeyPress(event) {
    if (intentos >= 4) { 
        showModal();
    }

    if (event.key === "Enter") {
        let nombrePokemon = document.querySelector('.searchpoke').value;      
        let pokemonEncontrado = buscarPokemon(nombrePokemon);
        if (pokemonEncontrado) {
            compararPokemon();
        }
        console.log(pokemonEncontrado);

        intentos++;

        // Limpiar el input
        document.querySelector('.searchpoke').value = '';
    }
}

function buscarPokemon(nombrePokemon) {
    let objetoEncontrado = resultsArray.find(objeto => objeto.name === nombrePokemon);
    if (objetoEncontrado) {
        let tipos = objetoEncontrado.types.map(type => type.type.name); 
        let habilidad = objetoEncontrado.abilities[0].ability.name; 
        let altura = objetoEncontrado.height / 10 + "m"; 
        let peso = objetoEncontrado.weight / 10 + "kg"; 

        pokemonEncontrados.push({
            nombre: nombrePokemon,
            imagenURL: objetoEncontrado.sprites.other["official-artwork"].front_default,
            habilidad: habilidad,
            tipos: tipos,
            altura: altura,
            peso: peso
        });

        console.log(`${nombrePokemon} ha sido encontrado!`);
        agregarPokemonAlHTML(pokemonEncontrados[pokemonEncontrados.length - 1], habilidad); // Pasa la habilidad como parámetro
    } else {
        console.log(`${nombrePokemon} no fue encontrado.`);
    }
    return pokemonEncontrados;
}


function agregarPokemonAlHTML(pokemon, habilidad) {
    let nuevoPokemon = document.createElement("div");
    let tipos = pokemon.tipos.map(type => `<p class="${type} tipo">${type}</p>`).join(''); 
    nuevoPokemon.classList.add("searchedPokemonContainer");
    const pesoAleatorio = parseFloat(pokemonAleatorios[0].peso);
    const pesoPokemon = parseFloat(pokemon.peso);
    let pesoSymbol = '';
    if (pesoPokemon < pesoAleatorio) {
        pesoSymbol = ' < '; 
    } else if (pesoPokemon > pesoAleatorio) {
        pesoSymbol = ' > '; 
    } else {
        pesoSymbol = ' = ';
        nuevoPokemon.classList.add("matching-type"); 
    }

    const alturaAleatoria = parseFloat(pokemonAleatorios[0].altura);
    const alturaPokemon = parseFloat(pokemon.altura);
    let alturaSymbol = '';
    if (alturaPokemon < alturaAleatoria) {
        alturaSymbol = ' < '; 
    } else if (alturaPokemon > alturaAleatoria) {
        alturaSymbol = ' > '; 
    } else {
        alturaSymbol = ' = ';
        nuevoPokemon.classList.add("matching-type"); 
    }

    nuevoPokemon.innerHTML = `
        <h3 class="pokemon-name-chosen">${pokemon.nombre}</h3>
        <div class="pokemon-image-chosen">
            <img src="${pokemon.imagenURL}" alt="${pokemon.nombre}">
        </div>
        <p class="pokemon-ability-chosen">${pokemon.habilidad}</p>
        <div class="pokemon-types-chosen">
            ${tipos}
        </div>
        <div class="pokemon-stats-chosen">
            <p class="height">${pokemon.altura}</p> <!-- Mostrar la altura -->
            <p class="weight">${pokemon.peso}</p> <!-- Mostrar el peso -->
        </div>
    `;
    const tiposAleatorio = pokemonAleatorios[0].tipos;
    const tiposHTML = nuevoPokemon.querySelectorAll('.tipo');
    tiposHTML.forEach(tipoHTML => {
        if (tiposAleatorio.includes(tipoHTML.textContent)) {
            tipoHTML.classList.add("matching-type");
        }
    });

    const habilidadAleatoria = pokemonAleatorios[0].habilidad;
    const habilidadHTML = nuevoPokemon.querySelector('.pokemon-ability-chosen');
    if (habilidadAleatoria === habilidad) {
        habilidadHTML.classList.add("matching-ability");
    }

    document.getElementById("listaPokemonBuscados").appendChild(nuevoPokemon);
    document.getElementById("listaPokemonBuscados").appendChild(nuevoPokemon);
}
function mostrarModalGanador() {
    const modalGanador = document.getElementById("modalGanador");
    modalGanador.style.display = "block"; // Mostrar el modal
}

// Verificar si todas las características del Pokémon encontrado coinciden con las del Pokémon aleatorio
function verificarVictoria() {
    if (pokemonEncontrados.length > 0 && pokemonAleatorios.length > 0) {
        const pokemonAleatorio = pokemonAleatorios[0];
        const pokemonEncontrado = pokemonEncontrados[0];

        const alturaPokemon1 = parseFloat(pokemonAleatorio.altura);
        const alturaPokemon2 = parseFloat(pokemonEncontrado.altura);
        const pesoPokemon1 = parseFloat(pokemonAleatorio.peso);
        const pesoPokemon2 = parseFloat(pokemonEncontrado.peso);
        const habilidadPokemon1 = pokemonAleatorio.habilidad;
        const habilidadPokemon2 = pokemonEncontrado.habilidad;

        if (
            alturaPokemon1 === alturaPokemon2 &&
            pesoPokemon1 === pesoPokemon2 &&
            habilidadPokemon1 === habilidadPokemon2
        ) {
            mostrarModalGanador(); // Mostrar el modal si todas las características coinciden
        }
    }
}
function compararPokemon() {
    if (pokemonAleatorios.length === 0 || pokemonEncontrados.length === 0) {
        console.log("No hay suficientes Pokémon para comparar.");
        return;
    }

    const pokemonAleatorio = pokemonAleatorios[0];
    const pokemonEncontrado = pokemonEncontrados[0];

    const tiposPokemon1 = pokemonAleatorio.tipos;
    const tiposPokemon2 = pokemonEncontrado.tipos;
    const tiposComunes = tiposPokemon1.filter(tipo => tiposPokemon2.includes(tipo));

    if (tiposComunes.length === 0) {
        console.log("Los Pokémon tienen tipos diferentes.");
    } else {
        console.log(`Los Pokémon tienen tipos comunes: ${tiposComunes.join(", ")}`);
        tiposComunes.forEach(tipo => {
            const elements = document.querySelectorAll(`.pokemon-types-chosen.${tipo}`);
            elements.forEach(element => {
                element.classList.add("matching-type");
            });
        });
    }

    const alturaPokemon1 = parseFloat(pokemonAleatorio.altura);
    const alturaPokemon2 = parseFloat(pokemonEncontrado.altura);
    if (alturaPokemon1 === alturaPokemon2) {
        console.log(`La altura de ambos Pokémon es igual: ${alturaPokemon1}m`);
    } else if (alturaPokemon1 > alturaPokemon2) {
        console.log(`El Pokémon aleatorio es más alto que el Pokémon buscado: ${alturaPokemon1}m vs ${alturaPokemon2}m`);
    } else {
        console.log(`El Pokémon buscado es más alto que el Pokémon aleatorio: ${alturaPokemon2}m vs ${alturaPokemon1}m`);
    }

    const pesoPokemon1 = parseFloat(pokemonAleatorio.peso);
    const pesoPokemon2 = parseFloat(pokemonEncontrado.peso);
    if (pesoPokemon1 === pesoPokemon2) {
        console.log(`El peso de ambos Pokémon es igual: ${pesoPokemon1}kg`);
    } else if (pesoPokemon1 > pesoPokemon2) {
        console.log(`El Pokémon aleatorio es más pesado que el Pokémon buscado: ${pesoPokemon1}kg vs ${pesoPokemon2}kg`);
    } else {
        console.log(`El Pokémon buscado es más pesado que el Pokémon aleatorio: ${pesoPokemon2}kg vs ${pesoPokemon1}kg`);
    }

    const habilidadPokemon1 = pokemonAleatorio.habilidad;
    const habilidadPokemon2 = pokemonEncontrado.habilidad;
    if (habilidadPokemon1 === habilidadPokemon2) {
        console.log(`Ambos Pokémon tienen la misma habilidad: ${habilidadPokemon1}`);
    } else {
        console.log(`Los Pokémon tienen habilidades diferentes: ${habilidadPokemon1} vs ${habilidadPokemon2}`);
    }

    verificarVictoria(); // Verificar si se ganó el juego después de comparar los Pokémon

    pokemonEncontrados.splice(0);
}



//Botón MOSTRAR SILUETA

document.getElementById('cambiarImagen').addEventListener("click", function(event){
    const pokemonImg = document.getElementById('pokemonImg');
    const contenedor2 = document.getElementById('contenedor2');

    // Si el elemento pokemonImg está visible, lo oculta y muestra contenedor2
    if (pokemonImg.classList.contains('visible-img')) {
        pokemonImg.classList.remove('visible-img');
        pokemonImg.classList.add('invisible-img');
        contenedor2.classList.remove('invisible-contenedor');
        contenedor2.classList.add('visible-contenedor');
    } else { // Si el elemento pokemonImg está oculto, lo muestra y oculta contenedor2
        pokemonImg.classList.remove('invisible-img');
        pokemonImg.classList.add('visible-img');
        contenedor2.classList.remove('visible-contenedor');
        contenedor2.classList.add('invisible-contenedor');
    }


    


});
function showModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block"; // Mostrar el modal
}

// Llamar a showModal cuando se alcance el límite de intentos
if (intentos >= 4) {
    document.querySelector('.searchpoke').disabled = true; // Deshabilitar el campo de entrada
    showModal(); // Mostrar el modal
}
function reiniciar(){
    const restartButton = document.getElementById("restartButton");
restartButton.onclick = function() {
    window.location.reload(); // Reiniciar la página
}
}
// Resto de tu código JavaScript ...

// Esta función se encarga de reiniciar la página cuando se hace clic en el botón
function reiniciarPagina() {
    window.location.reload(); // Recargar la página
}

// Asignar el evento de clic al botón de reinicio
const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", reiniciarPagina);
function reiniciarPagina() {
    window.location.reload(); // Recargar la página
}