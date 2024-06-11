const socket = io();

socket.on("getProducts", (data) => {
    console.log(data);
})