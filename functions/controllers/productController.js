import { ProductsModel, OrdersModel } from "../models/productModel.js";

export const ProductsController = {
    async getAll(req, res) {
        try {
            const products = await ProductsModel.getAll();
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
};
