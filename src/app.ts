import { connectDB } from './db/db.js';
import express from 'express';

const clientDB = await connectDB();
export const collection = clientDB.db('Evaluation');
const app = express();
app.use(express.json());

const port = process.env.PORT ?? 8080;

// Middleware to check app health
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Routes
const usersCollection = collection.collection('users');
const dishesCollection = collection.collection('dishes');

// Create a new user
app.post('/users', async (req, res) => {
    const user = req.body;
    try {
        await usersCollection.insertOne(user);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await usersCollection.find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve users" });
    }
});

// Get a specific user
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usersCollection.findOne({ id });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user" });
    }
});

// Update a user
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    try {
        const result = await usersCollection.updateOne({ id }, { $set: updatedUser });
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "User updated successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await usersCollection.deleteOne({ id });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});

// Create a new dish
app.post('/dishes', async (req, res) => {
    const dish = req.body;
    try {
        await dishesCollection.insertOne(dish);
        res.status(201).json({ message: "Dish added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add dish" });
    }
});

// Get all dishes
app.get('/dishes', async (req, res) => {
    try {
        const dishes = await dishesCollection.find({}).toArray();
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve dishes" });
    }
});

// Get a specific dish
app.get('/dishes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const dish = await dishesCollection.findOne({ id });
        if (dish) {
            res.status(200).json(dish);
        } else {
            res.status(404).json({ error: "Dish not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve dish" });
    }
});

// Update a dish
app.put('/dishes/:id', async (req, res) => {
    const { id } = req.params;
    const updatedDish = req.body;
    try {
        const result = await dishesCollection.updateOne({ id }, { $set: updatedDish });
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Dish updated successfully" });
        } else {
            res.status(404).json({ error: "Dish not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update dish" });
    }
});

// Delete a dish
app.delete('/dishes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await dishesCollection.deleteOne({ id });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Dish removed successfully" });
        } else {
            res.status(404).json({ error: "Dish not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete dish" });
    }
});

// Start the server
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;