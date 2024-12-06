//Cambiar categorias con click

const agregar = document.getElementById("agregar");
const administrar = document.getElementById("administrar");

const formAgregar = document.getElementById("agregarProductos");
const formAdministrar = document.getElementById("administrarProductos");

agregar.addEventListener("click", () =>
{
    formAgregar.style.display = "block";
    formAdministrar.style.display = "none";
});

administrar.addEventListener("click", () =>
{
    formAdministrar.style.display = "block";
    formAgregar.style.display = "none";
});

//////////////////////////////////////////////////////////////////////////////////////

//Evento para validar inputs para agregar un producto

const botonAgregar = document.getElementById("botonAgregar");

botonAgregar.addEventListener("submit", (e) =>
{
    e.preventDefault();
    if(validarDatos())
    {
        agregarDatos();
    }
});

//Funcion para validar los datos

function validarDatos()
{
    const titulo = document.getElementsByName("titulo")[0].value;
    const descripcion = document.getElementsByName("descripcion")[0].value;
    const precio = document.getElementsByName("precio")[0].value;
    const imagenes = document.getElementsByName("imagenes");

    if(!titulo || !descripcion || !precio)
    {
        alert("Complete los campos requeridos");
        return false;
    }

    if(titulo.length > 25 || titulo.length < 25)
    {
        alert("El titulo no debe estar entre 3 a 25 caracteres")
        return false;
    }

    precio = precio.replace(",", ".");
    if(isNaN(precio))
    {
        alert("El precio debe ser un numero valido")
        return false;
    };
    
    for (const imagen of imagenes) 
    {
        if(imagen.value == "")
        {
            alert("Complete los campos requeridos")
            return false;
        }
    };

};

//Variable asincronica para mandar los datos a la bd

const agregarDatos = async () =>
{
    const datos = 
    {
        titulo : document.getElementsByName("titulo")[0].value,
        descripcion : document.getElementsByName("descripcion")[0].value,
        precio : document.getElementsByName("precio")[0].value,
        imagenes :document.getElementsByName("imagenes")
    };

    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userId");

    if(!token || !userid)
    {
        alert("Debes iniciar sesion para realizar esta operacion")
        window.location.href = "../HTMLS/login.html";
    };

    try
    {
        const response = await fetch("http://localhost:3000/api/product/create", 
        {
            method : "POST",
            headers : {"Content-Type": "application/json",
            Authorization: `Bearer ${token}`},
            body : JSON.stringify(datos)
        });
        
        if (!response.ok) 
        {
            const errorData = await response.json();
            if(errorData.message === "el token no es valido")
            {
              alert("No tienes acceso a esta seccion");
              localStorage.removeItem("token");
              localStorage.removeItem("userid");
              window.location.href = "../HTMLS/login.html";
            };
        } 
        alert(`Error: ${errorData.message}`);
    }
    catch
    {
        alert("Hubo un error. Intenta de nuevo.");
    };
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
