import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
} from "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();

// Configuración Firebase
const firebaseConfig = {
    apiKey: process.env.VITE_API_KEY,
    authDomain: process.env.VITE_AUTH_DOMAIN,
    projectId: process.env.VITE_PROJECT_ID,
    storageBucket: process.env.VITE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Modelos
export const ProductsModel = {
    async getAll() {
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    async getById(productId) {
        const productRef = doc(db, "products", productId);
        const product = await getDoc(productRef);
        if (!product.exists()) throw new Error("Product not found");
        return { id: product.id, ...product.data() };
    },
    async create(data) {
        const productsCollection = collection(db, "products");
        const docRef = await addDoc(productsCollection, data);
        return docRef.id;
    },
    async update(productId, data) {
        const productRef = doc(db, "products", productId);
        await updateDoc(productRef, data);
    },
    async delete(productId) {
        const productRef = doc(db, "products", productId);
        await deleteDoc(productRef);
    },
};

export const OrdersModel = {
    async getAll() {
        const ordersCollection = collection(db, "orders");
        const snapshot = await getDocs(ordersCollection);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    async getById(orderId) {
        const orderRef = doc(db, "orders", orderId);
        const order = await getDoc(orderRef);
        if (!order.exists()) throw new Error("Order not found");
        return { id: order.id, ...order.data() };
    },
    async create(data) {
        const ordersCollection = collection(db, "orders");
        const docRef = await addDoc(ordersCollection, data);
        return docRef.id;
    },
    async update(orderId, data) {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, data);
    },
    async delete(orderId) {
        const orderRef = doc(db, "orders", orderId);
        await deleteDoc(orderRef);
    },
};
