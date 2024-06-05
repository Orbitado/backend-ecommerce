import Express from "express";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import handlebars from "express-handlebars";
import viewsRoutes from "./routes/views.routes.js";
import __dirname from "./dirname.js";
import path from "path";
import { Server } from "socket.io";

const app = Express();

const PORT = 8080;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Configuracion de handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
app.use(Express.static(path.resolve(__dirname, "../public")));

app.use("/", viewsRoutes);
// Fin de la configuración de handlebars

// Configuración del servidor WebSocket

const io = new Server(httpServer);

// Productos Socket
let products_list = [];

io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on("products_list", (data) => {
        console.log(data)
    })
});

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
