const contenedorRopa = document.getElementById("seccion-articulos");
const productosPorPagina = 8;
let paginaActual = 1;



const fetchCategory = async (category) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}`);
        if (response.ok) {
            const data = await response.json();
            return data.products;
        } else {
            console.error(`Error en el fetch de ${category}, status ${response.status}`);
            return [];
        }
    } catch (error) {
        console.error(`Error en el fetch de ${category}:`, error);
        return [];
        }
    };

const cargarRopa = async(cantidadProductos,pagina)=>{
    try{
        const categories = ['mens-shirts', 'mens-shoes', 'womens-dresses', 'womens-shoes'];
        
        // se llamam a fetchCategory pasandole como parametro cada categoria
        // devuelve un array de arrays (para cada categoria un array)
        const productPromises = categories.map(fetchCategory);
        const products = await Promise.all(productPromises);//se espera a la promesa y se guarda 
        
        // Convertimos el array de arrays en un array solo 
        const combinedData = products.flat();
        
        const hasta = cantidadProductos*pagina;
        const desde = hasta - cantidadProductos;
        const productosPorPagina = combinedData.slice(desde,hasta);
        
        console.log(productosPorPagina);
        
        let productos = '';
        productosPorPagina.forEach(articulo => {
            productos += `
            <div class="articulo" id=${articulo.id}>
            <div>
            <a onclick="verProducto(${articulo.id})" href='#'><img src="${articulo.images[0]}" alt=""></a>
            </div>
            <div>
            <h5>${articulo.title}</h5>
            </div>
            <div>
            <span>$ ${articulo.price}</span>
            </div>
            <div>
            <button type="button" class="btn btn-secondary">Agregar al carrito</button>
            </div>
            </div>
            `;            
        });
            
        contenedorRopa.innerHTML = productos; 
        
        return productosPorPagina;
    }
    catch (error){
        console.log(error.message);
    }
}
cargarRopa(productosPorPagina,paginaActual);

const adelantar = async () => {
    try {
        paginaActual += 1;
        const productos = await cargarRopa(productosPorPagina, paginaActual);
        
        if (productos.length === 0) {
            alert('Está en la última página, no hay más productos.');
            paginaActual -= 1; 
            cargarRopa(productosPorPagina, paginaActual);
        }
    } catch (error) {
        console.log(error.message);
    }
};

const retroceder = async()=>{
    try{
        if (paginaActual === 1){
            alert('Está en la primer página, no puede retroceder.')
        }
        else{
            paginaActual -=1;
            cargarRopa(productosPorPagina,paginaActual);
        }
    }
    catch (error){
        console.log(error.message);
    }
}

function verProducto(id) {
    window.location.href = `../HTMLS/articulo.html?id=${id}`;
}

const loginForm = document.querySelector('.login');
const registerForm = document.querySelector('#register');

loginForm.addEventListener('submit', validarLogin);
registerForm.addEventListener('submit', validarRegistro);


function validarLogin(event){
    event.preventDefault(); //que no se envien el form
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-contra').value;
    
    if (!email || !password) { //si son null, undefined, '', etc
        alert("Por favor, completa todos los campos.");
        return false; // cancela el envio del form
    }
    if (!validarEmail(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return false;
    }
    loginForm.submit();
}

function validarRegistro(event){
    event.preventDefault();

    const name = document.getElementById('register-name').value;
    const lastName = document.getElementById('register-lastName').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-repeat-password').value;

    if (!name || !lastName || !email || !password || !confirmPassword) {
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
    }

    registerForm.submit();
}

function validarEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}