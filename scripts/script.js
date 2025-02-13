let carrito = [];
document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll("button");
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            agregarAlCarrito(index);
        });
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
    const carritoContenido = document.getElementById("carritoContenido");
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
            img.style.width = "80px";
            img.style.height = "160px";
            img.style.objectFit = "contain"; 
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