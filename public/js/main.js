const socket = io();
const products_list = document.getElementById("products_list");
const data = await getProducts();
const getProducts = async () => {
    return await JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));
}

socket.on("getProducts", async () => {
    const products = await getProducts();
    
    products_list.innerHTML = "";
    products.forEach(product => {        
        products_list.innerHTML += `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${product.thumbnail}" class="img-fluid rounded-start" alt="${product.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><small class="text-muted">${product.code}</small></p>
                            <p class="card-text"><small class="text-muted">${product.stock}</small></p>
                            <p class="card-text"><small class="text-muted">${product.price}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    })
})