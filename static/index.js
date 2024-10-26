const contenedorRopa = document.getElementById("seccion-articulos");

const fetchCategory = async (category) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=20`);
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

const cargarRopa = async()=>{
    try{
        const categories = ['mens-shirts', 'mens-shoes', 'womens-dresses', 'womens-shoes'];

        // se llamam a fetchCategory pasandole como parametro cada categoria
        // devuelve un array de arrays (para cada categoria un array)
        const productPromises = categories.map(fetchCategory);
        const products = await Promise.all(productPromises);//se espera a la promesa y se guarda 
        
        // Convertimos el array de arrays en un array solo 
        const combinedData = products.flat();
        console.log(combinedData);
        let productos = '';
        combinedData.forEach(articulo => {
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
    }

    catch (error){
        console.log(error.message);
    }
}
cargarRopa();

const verProducto = async(id) =>{
    window.location.href = `../HTMLS/articulo.html?id=${id}`;
}