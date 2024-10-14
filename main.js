const productos = [
    { nombre: "cerveza", precio: 1200 },
    { nombre: "tequila", precio: 2000 },
    { nombre: "vino", precio: 1800 },
    { nombre: "wishky", precio: 2200 }
];

const confirmarEdad = confirm("¿Eres mayor de 18 años?")

if(confirmarEdad === false){
    alert("Para comprar, debes ser mayor de 18 años.");
    location.reload();
}

let totalPago = 0;
const carrito = {};

const actualizarTotal = () => {
    document.getElementById("precioTotal").innerText = totalPago;
};

const agregarAlCarrito = (nombre, precio) => {
    if (!carrito[nombre]) {
        carrito[nombre] = 0;
    }
    carrito[nombre] += 1;
    totalPago += precio;
    actualizarTotal();
};

const eliminarDelCarrito = (nombre, precio) => {
    if (carrito[nombre] && carrito[nombre] > 0) {
        carrito[nombre] -= 1;
        totalPago = Math.max(0, totalPago - precio);
        actualizarTotal();
    } else {
        alert(`No hay ${nombre} en el carrito para eliminar.`);
    }
};

// Seleccionar botones de agregar y eliminar
const botonesAgregar = document.querySelectorAll("button:not(.botonE)");
const botonesEliminar = document.querySelectorAll("button.botonE");

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
        const productoNombre = boton.parentElement.querySelector('.card-title').innerText.toLowerCase();
        const producto = productos.find(p => p.nombre === productoNombre);
        if (producto) {
            agregarAlCarrito(producto.nombre, producto.precio);
        } else {
            console.error("Producto no encontrado");
        }
    });
});

botonesEliminar.forEach(boton => {
    boton.addEventListener("click", () => {
        const productoNombre = boton.parentElement.querySelector('.card-title').innerText.toLowerCase();
        const producto = productos.find(p => p.nombre === productoNombre);
        if (producto) {
            eliminarDelCarrito(producto.nombre, producto.precio);
        } else {
            console.error("Producto no encontrado para eliminar");
        }
    });
});
