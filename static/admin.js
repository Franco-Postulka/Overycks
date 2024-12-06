const agregar = document.getElementById("agregar");
const administrarProductos = document.getElementById("agregar");

agregar.addEventListener("click", () => {
  agregar.style.display == "block";
});

const containerProductos = document.getElementById("muestra-productos");
const productosPorPagina = 8;
let paginaActual = 1;

const cargarRopa = async (cantidadProductos, pagina) => {
  try {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/product/products`
        );
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error(
            `Error en el fetch de productos, status ${response.status}`
          );
          return [];
        }
      } catch (error) {
        console.error(`Error en el fetch de productos:`, error);
        return [];
      }
    };

    const data = await fetchData();

    // Validar si data está disponible
    if (!data || !data.productsWithImages) {
      throw new Error("No se pudo obtener los productos o están vacíos.");
    }

    const hasta = cantidadProductos * pagina;
    const desde = hasta - cantidadProductos;
    const productosPorPagina = data.productsWithImages.slice(desde, hasta);

    let productos = "";
    productosPorPagina.forEach((articulo) => {
      productos += `
              <div class="articulo" id=${articulo.id}>
              <div>
              <a onclick="verProducto(${articulo.id})" href='#'><img src="${articulo.images[0].url}" alt=""></a>
              </div>
              <div>
              <h5>${articulo.titulo}</h5>
              </div>
              <div>
              <span>$ ${articulo.precio}</span>
              </div>
              <div>
              <button type="button" class="btn btn-dark">Eliminar</button>
              <button type="button" class="btn btn-dark">Modificar</button>
              </div>
              </div>
              `;
    });

    containerProductos.innerHTML = productos;

    return productosPorPagina;
  } catch (error) {
    console.log(error.message);
  }
};

cargarRopa(productosPorPagina, paginaActual);

function verProducto(id) {
  alert("Será redireccionado fuera de la sección de administrador.");
  window.location.href = `../HTMLS/articulo.html?id=${id}`;
}

const adelantar = async () => {
  try {
    paginaActual += 1;
    const productos = await cargarRopa(productosPorPagina, paginaActual);

    if (productos.length === 0) {
      alert("Está en la última página, no hay más productos.");
      paginaActual -= 1;
      cargarRopa(productosPorPagina, paginaActual);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const retroceder = async () => {
  try {
    if (paginaActual === 1) {
      alert("Está en la primer página, no puede retroceder.");
    } else {
      paginaActual -= 1;
      cargarRopa(productosPorPagina, paginaActual);
    }
  } catch (error) {
    console.log(error.message);
  }
};
