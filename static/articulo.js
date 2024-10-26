const traerProducto = async(id) => {
    try{
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error(`Error en el fetch del producto con id:${id}, status ${response.status}`);
            return null;
        }
    } catch(error){
        console.log(error.message);
    }
}
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        const producto = await traerProducto(productId); 
        console.log(producto);
        const div = document.getElementById('articulo_particular_div');
        div.innerHTML = `
        <div id='imagenes-chicas'>
            <img src=${producto.images[0]} onclick='cambiarFoto(0, ${JSON.stringify(producto.images)})'alt="producto">
            <img src=${producto.images[1]} onclick='cambiarFoto(1, ${JSON.stringify(producto.images)})'alt="producto">
            <img src=${producto.images[2]} onclick='cambiarFoto(2, ${JSON.stringify(producto.images)})' alt="producto">
            <img src=${producto.images[3]} onclick='cambiarFoto(3, ${JSON.stringify(producto.images)})' alt="producto">
        </div>
        <div id='imagen-principal'>
            <img src=${producto.images[0]} alt="producto">
        </div>
        <div id='info-principal'>
            <h2>${producto.title}</h2>
            <p>${producto.description}</p>
            <span>$ ${producto.price}</span>
            <div id='talles'>
                <button class="btn btn-outline-dark">XS</button>
                <button class="btn btn-outline-dark">S</button>
                <button class="btn btn-outline-dark">M</button>
                <button class="btn btn-outline-dark">L</button>
                <button class="btn btn-outline-dark">XL</button>
            </div>
            <button class="btn btn-secondary">Agregar al carrito</button>
        </div>
        <div>
            <div>
            </div>
            
        </div>
        `;
    }
});

function cambiarFoto(id, images) {
    const divImagenPrincipal = document.getElementById('imagen-principal');
    divImagenPrincipal.innerHTML = `
        <img src=${images[id]} alt="producto">
    `;
}