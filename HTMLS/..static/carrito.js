document.addEventListener("DOMContentLoaded", () => {
  mostrarProductosDelCarrito();
});

const mostrarProductosDelCarrito = async () => {
  const token = localStorage.getItem("token");
  const id_usuario = localStorage.getItem("userid");
  if (!token || !id_usuario) {
    alert("Necesitas iniciar sesión para ver tu carrito.");
    window.location.href = "../HTMLS/login.html";
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:3000/api/carrito/productos/${id_usuario}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message === "el token no es valido") {
        alert(`Necesitas iniciar sesión para ver tu carrito.`);
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        window.location.href = "../HTMLS/login.html";
        return;
      }
      if (errorData.message === "El usuario no tiene productos en el carrito") {
        const contenedorCarrito = document.getElementById("carrito");
        contenedorCarrito.innerHTML =
          "<h2>No hay productos cargados todavia.</h2>";
        return;
      } else {
        alert(`Error: ${errorData.message}`);
        return;
      }
    }
    const data = await response.json();
    const productosEnCarrito = data.products;

    let productos = "";
    productosEnCarrito.forEach((articulo) => {
      productos += `
        <div class="productos-carrito">
          <div>
            <img src=${articulo.images[0]} alt="" />
          </div>
          <div>
            <h4>${articulo.titulo}</h4>
          </div>
          <div id="precio-carrito">
            <span>${articulo.precio}</span>
          </div>
          <div>
            <button class="btn btn-outline-dark">Eliminar</button>
            <button class="btn btn-outline-dark">Comprar ahora</button>
          </div>
        </div>
        `;
    });
    const contenedorCarrito = document.getElementById("productos-in-carrito");
    contenedorCarrito.innerHTML = productos;
  } catch (error) {
    console.error("Error al mostrar datos del carrito:", error);
    alert("Hubo un error. Intenta de nuevo.");
  }
};
