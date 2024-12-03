const contenedorRopa = document.getElementById("seccion-articulos");
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
            <button type="button" class="btn btn-secondary">Agregar al carrito</button>
            </div>
            </div>
            `;
    });

    contenedorRopa.innerHTML = productos;

    return productosPorPagina;
  } catch (error) {
    console.log(error.message);
  }
};
cargarRopa(productosPorPagina, paginaActual);

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

function verProducto(id) {
  window.location.href = `../HTMLS/articulo.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login");
  const registerForm = document.querySelector("#register");
  loginForm.addEventListener("submit", validarLogin);
  registerForm.addEventListener("submit", validarRegistro);
});

function validarLogin(event) {
  event.preventDefault(); //que no se envien el form

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-contra").value;

  if (!email || !password) {
    //si son null, undefined, '', etc
    alert("Por favor, completa todos los campos.");
    return false; // cancela el envio del form
  }
  if (!validarEmail(email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return false;
  }
  loginForm.submit();
}

function validarRegistro(event) {
  event.preventDefault();

  const userName = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById(
    "register-repeat-password"
  ).value;

  if (!userName || !email || !password || !confirmPassword) {
    alert("Por favor, completa todos los campos.");
    return false;
  }

  if (!validarEmail(email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return false;
  } else if (userName.length < 3) {
    alert("El usuario debe tener al menos 3 caracteres.");
    return false;
  } else if (password.length < 8) {
    alert("La contraseña debe tener al menos 8 caracteres.");
    return false;
  }

  fetch("http://localhost:3000/api/user/registracion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userName,
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error: ${response.status}, mail o usuario ya en uso`// las otras opciones ya estan validads
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Usuario registrado con éxito:", data);
      alert("Registro exitoso. ¡Bienvenido!");
      document.getElementById("register-username").value = "";
      document.getElementById("register-email").value = "";
      document.getElementById("register-password").value = "";
      document.getElementById("register-repeat-password").value = "";
    })
    .catch((error) => {
      console.error("Error en el registro:", error.message);
      alert(
        `Hubo un error durante el registro: ${error.message} Intenta nuevamente.`
      );
    });
}

function validarEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
