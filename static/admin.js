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
    };

    try
    {
        const response = await fetch("http://localhost:3000/api/product/create", 
        {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify(datos)
        });
        
        if (!response.ok) 
        {
            const errorData = await response.json();
            if(errorData.message === "")
            {
                
            };
        } 
        else 
        {
            alert("Error al agregar el producto");
        }
    }
    catch
    {
        alert("Hubo un error. Intenta de nuevo.");
    };
};