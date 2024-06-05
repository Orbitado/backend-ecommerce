const socket = io();
const products_list = document.getElementById("products_list");

socket.on("products_list", (data) => {
    products_list.innerHTML = data.map((product) => {
        return `<li>${product.title} - ${product.price}</li>`
    })
})