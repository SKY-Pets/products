import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { ProductsController, OrdersController } from "./controllers/productController.js";

const app = express();
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());


// Rutas de productos
router.get("/products", ProductsController.getAll);
router.get("/products/:id", ProductsController.getById);
router.post("/products", ProductsController.create);
router.put("/products/:id", ProductsController.update);
router.delete("/products/:id", ProductsController.delete);

// Rutas de pedidos
router.get("/orders", OrdersController.getAll);
router.get("/orders/:id", OrdersController.getById);
router.post("/orders", OrdersController.create);
router.put("/orders/:id", OrdersController.update);
router.delete("/orders/:id", OrdersController.delete);


// Registrar rutas
app.use("/api", router);

// Configuración del servidor local
const port = process.env.PORT || 4006;
app.listen(port, () => {
    console.log(`SKYPets Service is running on http://localhost:${port}`);
});

// Exportar para serverless (si lo necesitas)
export const handler = serverless(app);


//--> node ./functions/localServer.js


/*
POST http://localhost:3000/products

{
  "id": 80,
  "name": "Croquetas Premium",
  "images": ["/mockimages/croqueta1.jpeg", "/mockimages/croqueta2.jpeg"],
  "price": 4500,
  "stock": true,
  "details": "Croquetas premium con proteínas de alta calidad.",
  "presentation": "Bolsa contenedora de 1kg",
  "instructions": "Administrar según las necesidades del animal."
}

POST http://localhost:3000/orders
{
  "orderId": 1001,
  "customerName": "Juan Pérez",
  "customerEmail": "juan.perez@example.com",
  "deliveryAddress": "Calle Falsa 123, Ciudad",
  "items": [
    {
      "productId": 10,
      "quantity": 2
    },
    {
      "productId": 41,
      "quantity": 1
    }
  ],
  "totalPrice": 10500,
  "orderDate": "2025-06-08",
  "status": "pending"
}


*/