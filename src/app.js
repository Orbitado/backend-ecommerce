import Express from "express";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import handlebars from "express-handlebars";
import viewsRoutes from "./routes/views.routes.js";
import __dirname from "./dirname.js";

const app = Express();

const PORT = 8080;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
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

app.use("/", viewsRoutes);
// Fin de la configuración de handlebars

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
