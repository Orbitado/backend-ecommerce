import Express from "express";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import userRoutes from "./routes/users.routes.js";
import handlebars from "express-handlebars";
import viewsRoutes from "./routes/views.routes.js";
import __dirname from "./dirname.js";
import path from "path";
import { Server } from "socket.io";
import { connectDb } from "./utils/mongoose.js";

// mongodb connection
connectDb();

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
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.resolve(`${__dirname}/views`));
app.use(Express.static(path.resolve(__dirname, "../public")));

app.use("/", viewsRoutes);
// Fin de la configuración de handlebars

// Configuración del servidor WebSocket

const io = new Server(httpServer);

// Productos Socket

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });

  socket.emit("getProducts", products);
});

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/users", userRoutes);
