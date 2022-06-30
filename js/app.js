// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []; // es importante que sea declarado fuera para que cualquier actualización se presente en todos los niveles

cargarEventListeners();
function cargarEventListeners() {
    // Agrega un curso al presionar "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // Elimina curso al presionar "x"
    carrito.addEventListener('click', eliminarCurso);

    // Vacia el carrito al presionar "vaciar carrito"
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
}

// Funciones
function agregarCurso(e) {
    e.preventDefault(); // Como no tenemos un enlace real, sino un href="#", al hacer click en el enlace, salta la pagina hacia arriba. Con e.preventDefault prevenimos esta accion
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    if(e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute('data-id')

        // Elimina curso del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId )

        // Llamamos al carrito en el HTML para actualizar con la nueva lista de cursos
        carritoHTML();
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {
    // console.log(curso);
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // console.log(infoCurso);

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id )
    if(existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => { // .map genera un nuevo arreglo
            if(curso.id === infoCurso.id) {
                // retorna el objeto/curso repetido actualizado 
                curso.cantidad++;
                return curso; 
            } else {
                // retorna los objetos/cursos que no son los duplicados
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
        // console.log(articulosCarrito);
    }
    
    // Llamamos al carrito en el HTML para actualizar con la nueva lista de cursos
    carritoHTML();
}

// Muestra el Carrito de compras en el HTML
function carritoHTML() {

    // Limpiar HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width=100>
            </td>
        
            <td>
                ${titulo}
            </td>
        
            <td>
                ${precio}
            </td>
        
            <td>
                ${cantidad}
            </td>
        
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbody
function limpiarHTML() {
    // contenedorCarrito.innerHTML = ''; Forma lenta de limpiar

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}