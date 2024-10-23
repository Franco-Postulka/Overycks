document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('#navbar-principal');
        const scrollPosicion = window.scrollY;
        const viewportAltura = window.innerHeight;
        const navbarTitle = this.document.querySelector('#div-central');

        if (scrollPosicion >= viewportAltura *0.95) {
            navbar.style.backgroundColor = 'white';
            navbarTitle.style.visibility = 'visible';
            // navbarTitle.style.animationPlayState = 'running'; 
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbarTitle.style.visibility = 'hidden';
            // navbarTitle.style.animationPlayState = 'paused'; 
        }
    });

    const contenedorRopa = document.getElementById("seccion-articulos");

    const fetchCategory = async (category) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=20`);
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
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

    const cargarRopa = async()=>{
        try{
            const categories = ['mens-shirts', 'mens-shoes', 'womens-dresses', 'womens-shoes'];
    
            // se llamam a fetchCategory pasandole como parametro cada categoria
            // devuelve un array de arrays (para cada categoria un array)
            const productPromises = categories.map(fetchCategory);
            const products = await Promise.all(productPromises);//se espera a la promesa y se guarda 
            
            // Convertimos el array de arrays en un array solo 
            const combinedData = products.flat();
            let productos = '';

            combinedData.forEach(articulo => {
                productos += `
                <div class="articulo">
                    <div>
                        <a><img src="${articulo.images[0]}" alt=""></a>
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
        }
    
        catch (error){
            console.log(error.message);
        }
    }
    cargarRopa();
});
