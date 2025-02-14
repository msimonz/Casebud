let carrito = [];
document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll("button.agregar");
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            agregarAlCarrito(index);
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const botoneLimpiar = document.getElementById("limpiar"); // Solo botones con la clase "agregar"
    
    if(botoneLimpiar) {
        botoneLimpiar.addEventListener("click", () => {
            localStorage.removeItem("productos");
            console.log("LocalStorage limpiado");
            location.reload();
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const contenedorProductos = document.getElementById("productos");
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    console.log("Contenedor: ", contenedorProductos);
    productos.forEach((producto, index) => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("producto");
        divProducto.innerHTML = `
            <img class="imgBorder" src="${producto.imagen}" alt="${producto.titulo}" height="300px">
            <ul>
                <li class="nombre">${producto.titulo}</li>
                <li>Autor: ${producto.autor}</li>
                <li>Año: ${producto.fecha}</li>
                <li>Precio: ${producto.precio.toLocaleString()} COP</li>
            </ul>
            <button>Añadir al carrito</button>
        `;

        const botonAgregar = divProducto.querySelector("button");
        botonAgregar.addEventListener("click", () => {
            const indexProducto = Array.from(contenedorProductos.children).indexOf(divProducto);
            console.log(indexProducto);
            agregarAlCarrito(indexProducto);
        });

        contenedorProductos.appendChild(divProducto);
    });
});

function agregarAlCarrito(index) {
    const productos = document.querySelectorAll(".producto");
    const producto = productos[index];
    const nombre = producto.querySelector(".nombre").textContent;
    
    const precioTexto = producto.querySelector("ul").lastElementChild.innerText;
    const precio = parseInt(precioTexto.replace("Precio: ", "").replace(" COP", "").replace(".", ""));
    const imgProducto = producto.querySelector("img").src;

    const productoSeleccionado = {
        nombre: nombre, 
        precio: precio,
        imagen: imgProducto
    };
    carrito.push(productoSeleccionado);
    console.log(carrito);
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    listaCarrito.innerHTML = "";
    let total = 0;
    if(carrito.length === 0){
        listaCarrito.innerHTML = "<li>El carrito está vacío</li>";
    } else{
        carrito.forEach((producto, index) => {
            total += producto.precio;
            const item = document.createElement("li");
            const img = document.createElement("img");
            img.src = producto.imagen;
            img.alt = producto.nombre;
            img.style.width = "110px";
            img.style.height = "160px";
            img.style.objectFit = "co"; 
            const botonEliminar = document.createElement("button");
            botonEliminar.innerHTML = "❌";
            botonEliminar.onclick = () => eliminarDelCarrito(index);
            const texto = document.createElement("span");
            texto.textContent = `${producto.nombre} - ${producto.precio.toLocaleString()} COP`;

            item.appendChild(img); // Agregar imagen
            item.appendChild(texto); // Agregar nombre y precio
            item.appendChild(botonEliminar); // Agregar botón elimina
            
            listaCarrito.appendChild(item); 
        });
    }
    totalCarrito.innerText = `Total: ${total.toLocaleString()} COP`;;
}
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}



function addCarrito(nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    const productoSeleccionado = { nombre, precio, imagen };
    carrito.push(productoSeleccionado);
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}