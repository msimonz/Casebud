document.addEventListener("DOMContentLoaded", function() {
    const inputImagen = document.getElementById("imagen");
    
    if (inputImagen) { // Verificamos que el elemento exista
        inputImagen.addEventListener("change", function(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById("preview");

                    if (preview) {
                        preview.src = e.target.result;
                        preview.style.display = "block"; // Muestra la imagen
                    } else {
                        console.error("No se encontró el elemento con ID 'preview'");
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    } else {
        console.error("No se encontró el input con ID 'imagen'");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const inputImagen = document.getElementById("imagen");
    const form = document.querySelector("form");

    if (inputImagen) {
        inputImagen.addEventListener("change", function(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById("preview");

                    if (preview) {
                        preview.src = e.target.result;
                        preview.style.display = "block";
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Evento para guardar el producto en localStorage
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario

        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const fecha = document.getElementById("fecha").value;
        const precio = document.getElementById("precio").value;
        const imagen = document.getElementById("preview").src; // Imagen convertida en base64

        if (!titulo || !autor || !fecha || !precio || !imagen) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const nuevoProducto = {
            titulo,
            autor,
            fecha,
            precio,
            imagen
        };

        console.log(nuevoProducto);

        // Obtener productos anteriores o crear un array vacío
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        productos.push(nuevoProducto);

        console.log(productos);
        // Guardar en localStorage
        localStorage.setItem("productos", JSON.stringify(productos));
        //limpiarLocalStorage();
        // Redireccionar a index.html para ver el nuevo producto
        window.location.href = "index.html";
    });
});

function limpiarLocalStorage() {
    localStorage.clear();
}
