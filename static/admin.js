//Cambiar categorias con click

const agregar = document.getElementById("agregar");
const administrar = document.getElementById("administrar");

const seccionAgregar = document.getElementById("agregarProductos");
const seccionAdministrar = document.getElementById("administrarProductos");
const seccionModificar = document.getElementById("modificarProductos");

agregar.addEventListener("click", () => {
  seccionAgregar.style.display = "block";
  seccionAdministrar.style.display = "none";
  seccionModificar.style.display = "none";
});

administrar.addEventListener("click", () => {
  seccionAdministrar.style.display = "block";
  seccionAgregar.style.display = "none";
  seccionModificar.style.display = "none";
  document.addEventListener("DOMContentLoaded", () => {
    cargarRopa(productosPorPagina, paginaActual);
  });
});

//////////////////////////////////////////////////////////////////////////////////////

//Evento para validar inputs para agregar un producto

const formAgregar = document.getElementById("form-agregar");

if (formAgregar) {
  formAgregar.addEventListener("submit", validarDatos);
}

function validarDatos(e) {
  e.preventDefault();
  const titulo = document.getElementsByName("titulo")[0].value;
  const descripcion = document.getElementsByName("descripcion")[0].value;
  let precio = document.getElementsByName("precio")[0].value;
  const imagenes = document.getElementsByName("imagenes");

  if (!titulo || !descripcion || !precio) {
    alert("Complete los campos requeridos");
    return false;
  }

  if (titulo.length < 3 || titulo.length > 120) {
    alert("El titulo debe estar entre 3 a 120 caracteres");
    return false;
  }
  if (descripcion.length < 10 || descripcion.length > 500) {
    alert("La descripcion debe estar entre 10 a 500 caracteres");
    return false;
  }

  if (isNaN(precio)) {
    alert("El precio debe ser un numero valido");
    return false;
  }

  for (const imagen of imagenes) {
    if (imagen.value == "") {
      alert("Complete los campos requeridos");
      return false;
    }
  }
  agregarDatos();
}

const agregarDatos = async () => {
  console.log("enviando datos al servidor");
  const datos = {
    titulo: document.getElementsByName("titulo")[0].value,
    descripcion: document.getElementsByName("descripcion")[0].value,
    precio: parseFloat(document.getElementsByName("precio")[0].value),
    imagenes: Array.from(document.getElementsByName("imagenes")).map(
      (input) => input.value
    ),
  };

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Debes iniciar sesion para realizar esta operacion");
    window.location.href = "../HTMLS/login.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/product/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datos),
    });
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message === "el token no es valido") {
        console.log(errorData);
        alert(`Necesitas iniciar sesión para crear un producto`);
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        window.location.href = "../HTMLS/login.html";
        return;
      }
      alert(`Error: ${errorData.message}`);
      return;
    }
    const data = await response.json();
    alert("Producto creado con éxito!");
    const formAgregar = document.getElementById("form-agregar");
    if (formAgregar) {
      formAgregar.reset();
    }
  } catch (error) {
    console.error("Error al crear el producto:", error.message);
    alert("Hubo un error. Intenta de nuevo.");
  }
};
/////////////////////////////////////

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
              <button type="button" class="btn btn-dark" onclick="eliminarProducto(${articulo.id})">Eliminar</button>
              <button type="button" class="btn btn-dark" onclick="atualizarProducto(${articulo.id})">Modificar</button>
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

const eliminarProducto = async (id_producto) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Necesitas iniciar sesión para eliminar el producto.");
    window.location.href = "../HTMLS/login.html";
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:3000/api/product/delete/${id_producto}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message === "el token no es valido") {
        console.log(errorData);
        alert(`Necesitas iniciar sesión para eliminar un producto.`);
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        window.location.href = "../HTMLS/login.html";
        return;
      }
      alert(`Error: ${errorData.message}`);
      return;
    }
    const data = await response.json();
    alert("Producto eliminado con éxito!");
    window.location.href = "../HTMLS/admin.html";
  } catch (error) {
    console.error("Error al elimnar el producto:", error.message);
    alert("Hubo un error. Intenta de nuevo.");
  }
};

const atualizarProducto = async (id) => {
  const result = await traerProducto(id);
  const initialValue = result.productWithImages;
  const { titulo, descripcion, precio, images } = result.productWithImages;

  const form = document.querySelector("#form-modificar");
  const inputTitulo = form.querySelector("input[name='titulo-modificar']");
  const inputDescripcion = form.querySelector(
    "textarea[name='descripcion-modificar']"
  );
  const inputPrecio = form.querySelector("input[name='precio-modificar']");
  const inputImagenes = form.querySelectorAll(
    "input[name='imagenes-modificar']"
  );

  inputTitulo.value = titulo;
  inputDescripcion.value = descripcion;
  inputPrecio.value = precio;

  // Cargar las URLs de las imágenes
  images.forEach((imagen, index) => {
    if (inputImagenes[index]) {
      inputImagenes[index].value = imagen.url;
    }
  });
  seccionAgregar.style.display = "none";
  seccionAdministrar.style.display = "none";
  seccionModificar.style.display = "block";

  form.addEventListener("submit", (e) =>
    validarDatosModificar(e, initialValue)
  );
};

function validarDatosModificar(e, initialValues) {
  e.preventDefault();
  const titulo = document.getElementsByName("titulo-modificar")[0].value;
  const descripcion = document.getElementsByName("descripcion-modificar")[0]
    .value;
  let precio = document.getElementsByName("precio-modificar")[0].value;
  const imagenes = document.getElementsByName("imagenes-modificar");

  if (!titulo || !descripcion || !precio) {
    alert("Complete los campos requeridos");
    return false;
  }

  if (titulo.length < 3 || titulo.length > 120) {
    alert("El titulo debe estar entre 3 a 120 caracteres");
    return false;
  }
  if (descripcion.length < 10 || descripcion.length > 500) {
    alert("La descripcion debe estar entre 10 a 500 caracteres");
    return false;
  }

  if (isNaN(precio)) {
    alert("El precio debe ser un numero valido");
    return false;
  }

  for (const imagen of imagenes) {
    if (imagen.value == "") {
      alert("Complete los campos requeridos");
      return false;
    }
  }
  modificarDatos(initialValues);
}

const modificarDatos = async (initialValues) => {
  const datos = {
    titulo: document.getElementsByName("titulo-modificar")[0].value,
    descripcion: document.getElementsByName("descripcion-modificar")[0].value,
    precio: parseFloat(document.getElementsByName("precio-modificar")[0].value),
    imagenes: Array.from(document.getElementsByName("imagenes-modificar")).map(
      (input) => input.value
    ),
  };
  // console.log("Initialvalues: ", initialValues);
  // console.log("datos: ", datos);

  const datosModificados = {};
  let seModifico = false;
  for (const key in datos) {
    if (key === "imagenes") {
      const initialUrls = initialValues.images.map((img) => img.url);
      const currentUrls = datos.imagenes;

      if (JSON.stringify(initialUrls) !== JSON.stringify(currentUrls)) {
        datosModificados[key] = [];
        seModifico = true;
        datosModificados[key] = currentUrls.map((url, index) => {
          const matchingImage = initialValues.images.find(
            (img) => img.url !== url
          );
          return matchingImage
            ? matchingImage
            : { id: initialValues.images.id, url };
        });
      } else {
      }
    } else if (
      JSON.stringify(initialValues[key]) !== JSON.stringify(datos[key])
    ) {
      datosModificados[key] = datos[key];
      seModifico = true;
    }
  }
  if (!seModifico) {
    alert("Debe modificar algun dato para poder enviar la solicitud.");
    return;
  }
  console.log("Para mandar a modificar:", datosModificados);
  actualizarEnServidor(initialValues.id, datosModificados);
};

const actualizarEnServidor = async (id, datosModificados) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Debes iniciar sesion para realizar esta operacion");
    window.location.href = "../HTMLS/login.html";
    return;
  }
  console.log("paso la primera verificacion de token");
  try {
    const response = await fetch(
      `http://localhost:3000/api/product/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosModificados),
      }
    );
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message === "el token no es valido") {
        console.log(errorData);
        alert(`Necesitas iniciar sesión para actualizar un producto`);
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        window.location.href = "../HTMLS/login.html";
        return;
      }
      alert(`Error: ${errorData.message}`);
      return;
    }
    const data = await response.json();
    alert("Producto actualizado con éxito!");
    const formAgregar = document.getElementById("form-modificar");
    if (formAgregar) {
      formAgregar.reset();
    }
    window.location.href = `../HTMLS/articulo.html?id=${id}`;
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    alert("Hubo un error. Intenta de nuevo.");
  }
};

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
