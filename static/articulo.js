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
            <button class="btn btn-secondary" onclick=agregarAlCarrito(${
              producto.id
            })>Agregar al carrito</button>
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
const agregarAlCarrito = async (id_producto) => {
  const token = localStorage.getItem("token");
  const id_usuario = localStorage.getItem("userid");
  if (!token || !id_usuario) {
    alert("Necesitas iniciar sesión para agregar al carrito.");
    window.location.href = "../HTMLS/login.html";
    return;
  }
  try {
    const response = await fetch(
      "http://localhost:3000/api/carrito/addcarrito",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_producto: id_producto,
          id_usuario: id_usuario,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message === "el token no es valido") {
        console.log(errorData);
        alert(`Necesitas iniciar sesión para agregar al carrito.`);
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        window.location.href = "../HTMLS/login.html";
        return;
      }
      alert(`Error: ${errorData.message}`);
      return;
    }
    const data = await response.json();
    alert("Producto agregado al carrito con éxito.");
  } catch (error) {
    console.error("Error al agregar al carrito:", error.message);
    alert("Hubo un error. Intenta de nuevo.");
  }
};
