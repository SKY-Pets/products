import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { ProductsController, OrdersController } from "./controllers/productController.js";

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

// Rutas de productos
router.get("/products", ProductsController.getAll);
router.get("/products/:id", ProductsController.getById);
router.post("/products", ProductsController.create);
router.put("/products/:id", ProductsController.update);
router.delete("/products/:id", ProductsController.delete);

// Rutas de pedidos
router.get("/orders", OrdersController.getAll);
router.get("/orders/id/:id", OrdersController.getById);
router.get("/orders/filter", OrdersController.getByDateAndStatus);
router.post("/orders", OrdersController.create);
router.put("/orders/:id", OrdersController.update);
router.delete("/orders/:id", OrdersController.delete);


app.use('/.netlify/functions/server', router);

export const handler = serverless(app);
