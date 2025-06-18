import { ProductsModel, OrdersModel } from "../models/productModel.js";

export const ProductsController = {
    async getAll(req, res) {
        try {
            let products = await ProductsModel.getAll();

            // Ordenar alfabéticamente por product.name
            products = products.sort((a, b) => a.name.localeCompare(b.name));

            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async getById(req, res) {
        try {
            const product = await ProductsModel.getById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    async create(req, res) {
        try {
            const id = await ProductsModel.create(req.body);
            res.status(201).json({ id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async update(req, res) {
        try {
            await ProductsModel.update(req.params.id, req.body);
            res.status(200).json({ message: "Product updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async delete(req, res) {
        try {
            await ProductsModel.delete(req.params.id);
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export const OrdersController = {
    async getAll(req, res) {
        try {
            const orders = await OrdersModel.getAll();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async getById(req, res) {
        try {
            const order = await OrdersModel.getById(req.params.id);
            res.status(200).json(order);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    async getByDateAndStatus(req, res) {

        try {
            const { startDate, endDate, status } = req.query;
            console.log(startDate, endDate, status);

            if (!startDate || !endDate) {
                return res.status(400).json({ error: "Start date and end date are required." });
            }

            const orders = await OrdersModel.getByDateAndStatus(startDate, endDate, status);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async create(req, res) {
        try {
            const id = await OrdersModel.create(req.body);
            res.status(201).json({ id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async update(req, res) {
        try {
            await OrdersModel.update(req.params.id, req.body);
            res.status(200).json({ message: "Order updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async delete(req, res) {
        try {
            await OrdersModel.delete(req.params.id);
            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params; // ID del pedido desde la URL
            const { estado } = req.body; // Nuevo estado desde el cuerpo de la solicitud

            if (!estado) {
                return res.status(400).json({ error: "The 'estado' field is required." });
            }

            await OrdersModel.update(id, { estado }); // Actualiza el estado
            res.status(200).json({ message: `Order status updated to '${estado}' successfully` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
