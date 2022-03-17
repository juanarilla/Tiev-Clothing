let carrito = []
let baseArticulos = []


fetch('./uno.json')
    .then(response => response.json())
    .then( data => {

        baseArticulos = data

        const contenedorDeProdcuto = document.getElementById('producto')
        
        baseArticulos.forEach((producto) => {
        
            let div = document.createElement('div');
            div.className = "col-md-4"
            div.innerHTML = `<div class="row gx-4 gx-lg-9 row-cols-9 justify-content-center">
            <div class="col mb-4">
            <div class="card h-100">
                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                <img class="card-img-top": src="${producto.imagen}"alt="..." />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${producto.nombre}</h5>
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                        </div>
                        <span class="text-muted text-decoration-line-through"></span>
                        ${producto.precio}
                    </div>
                </div>
                <button class="btn btn-outline-dark mt-auto" onclick="agregarAlCarrito(${producto.id})">Comprar</button>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                </div>
            </div>
        </div> 
        </div>`
        
            contenedorDeProdcuto.appendChild(div)
        })
})







// class Producto {
//     constructor(id, nombre, precio, stock, imagen) {
//         this.id = id
//         this.nombre = nombre
//         this.precio = precio
//         this.stock = stock
//         this.imagen = imagen
//     }
// }

// baseArticulos.push(new Producto(1, `Remera`, 5500, 19, `image/uno.jpg`))
// baseArticulos.push(new Producto(2, `Remera`, 11500, 10, `image/dos.jpg`))
// baseArticulos.push(new Producto(3, `Remera`, 12999, 12, `image/tres.jpg`))
// baseArticulos.push(new Producto(4, `Remera`, 5500, 34, `image/cuatro.jpg`))
// baseArticulos.push(new Producto(5, `Remera`, 11500, 10, `image/dos.jpg`))
// baseArticulos.push(new Producto(6, `Remera`, 12999, 12, `image/tres.jpg`))
// baseArticulos.push(new Producto(7, `Remera`, 5500, 6, `image/uno.jpg`))
// baseArticulos.push(new Producto(8, `Remera`, 11500, 10, `image/cuatro.jpg`))
// baseArticulos.push(new Producto(9, `Remera`, 12999, 12, `image/tres.jpg`))
// baseArticulos.push(new Producto(10, `Remera`, 5500, 3, `image/cuatro.jpg`))
// baseArticulos.push(new Producto(11, `Remera`, 11500, 10, `image/dos.jpg`))
// baseArticulos.push(new Producto(12, `Remera`, 12999, 12, `image/tres.jpg`))
// baseArticulos.push(new Producto(10, `Remera`, 5500, 3, `image/cuatro.jpg`))
// baseArticulos.push(new Producto(11, `Remera`, 11500, 10, `image/dos.jpg`))
// baseArticulos.push(new Producto(12, `Remera`, 12999, 12, `image/tres.jpg`))


// Armado Contenedor



// Agregar al Carrito

function agregarAlCarrito(id) {

    const productoEnCarrito = carrito.find((el) => el.id === id)

    if (productoEnCarrito) {

        productoEnCarrito.cantidad += 1
    } else {
        const productoElegido = baseArticulos.find((item) => item.id == id)

        let itemValidado = validarStock(productoElegido.stock)

        if (itemValidado) {
            carrito.push({
                id: productoElegido.id,
                nombre: productoElegido.nombre,
                precio: productoElegido.precio,
                cantidad: 1,
                imagen: productoElegido.imagen,
            })

            console.log(carrito)


        } else {
            alert("No hay stock")
        }
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCarrito()
}


// Validar Stock

function validarStock(stock) {

    if (stock > 0) {
        return true
    } else {
        return false
    }
}

// Quitar al Carrito

function quitarDelCarrito(id) {

    const productoEliminado = carrito.find((item) => item.id == id)

    productoEliminado.cantidad -= 1

    if( productoEliminado.cantidad === 0) {

        let indice = carrito.indexOf(productoEliminado)
        carrito.splice(indice, 1)
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCarrito()
}


const carritoContenedor = document.getElementById("carrito-contenedor")
const precioTotal = document.getElementById("precio-total")
const cantidadTotal = document.getElementById("cantidad-total")

function actualizarCarrito() {

    carritoContenedor.innerHTML = ''

    carrito.forEach((producto) => {
        let div = document.createElement('div')
        div.className = 'table'
        div.innerHTML = `
        <div>
        <table class="table">
        <tbody id="items">
        <tr>
        <th scope="col">${producto.nombre}</th>
        <th scope="col">${producto.cantidad}</th>
        <th scope="col" button class="btn btn-outline-dark mt-auto" onclick="quitarDelCarrito(${producto.id})">-</th>
        <th scope="col">${producto.precio * producto.cantidad}</th>
        <img class="card-img-top": src="${producto.imagen}/>
        </tr>
        </tbody>
        </table>
        <img class="card-img-top": src="${producto.imagen}><img/>
        </div>
        `

        carritoContenedor.appendChild(div)
    })

    precioTotal.innerText = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
    cantidadTotal.innerText = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad , 0)
}


//Modal 

const botonCarritoAbrir = document.getElementById('modalCarrito')
const botonCarritoCerrar = document.getElementById('modal-cerrar')
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]



botonCarritoAbrir.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})



botonCarritoCerrar.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})


// Local Storage

const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'))

if (carritoLocalStorage) {

    carrito = carritoLocalStorage
    actualizarCarrito()
}

