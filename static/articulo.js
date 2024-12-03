const traerProducto = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/product/products/${id}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        `Error en el fetch del producto con id:${id}, status ${response.status}`
      );
      return null;
    }
  } catch (error) {
    console.log(error.message);
  }
};
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    const fetchProducto = await traerProducto(productId);
    const producto = fetchProducto.productWithImages;
    const div = document.getElementById("articulo_particular_div");
    div.innerHTML = `
        <div id='imagenes-chicas'>
            <img src=${
              producto.images[0].url
            } onclick='cambiarFoto(0, ${JSON.stringify(
      producto.images
    )})'alt="producto">
            <img src=${
              producto.images[1].url
            } onclick='cambiarFoto(1, ${JSON.stringify(
      producto.images
    )})'alt="producto">
            <img src=${
              producto.images[2].url
            } onclick='cambiarFoto(2, ${JSON.stringify(
      producto.images
    )})' alt="producto">
            <img src=${
              producto.images[3].url
            } onclick='cambiarFoto(3, ${JSON.stringify(
      producto.images
    )})' alt="producto">
        </div>
        <div id='imagen-principal'>
            <img src=${producto.images[0].url} alt="producto">
        </div>
        <div id='info-principal'>
            <h2>${producto.titulo}</h2>
            <p>${producto.descripcion}</p>
            <span>$ ${producto.precio}</span>
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
  const divImagenPrincipal = document.getElementById("imagen-principal");
  divImagenPrincipal.innerHTML = `
        <img src=${images[id].url} alt="producto">
    `;
}
