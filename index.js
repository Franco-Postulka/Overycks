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

    const cargarRopa = async()=>{
        try{
            const response = await fetch(`https://dummyjson.com/products/category/mens-shirts`);
            const response2 = await fetch(`https://dummyjson.com/products/category/mens-shoes`);

            // console.log(response.status);
            if(response.status === 200 && response2.status ===200){
                let data = await response.json();
                let data2 = await response2.json();

                data = data.products;
                data2 = data2.products;

                combinedData = [...data, ...data2];
                console.log(combinedData);

                
                let productos = [];

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
        }
    
        catch (error){
            console.log(error.message);
        }
    }
    cargarRopa();
});
