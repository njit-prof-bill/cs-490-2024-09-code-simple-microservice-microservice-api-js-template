// Simple implementation of a RESTful API for managing users
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store for users
let users = [];
let nextId = 1;

// POST /users: Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send({ error: 'Name and email are required' });
    }

    const newUser = { id: nextId++, name, email };
    users.push(newUser);

    res.status(201).json(newUser);
});

// GET /users/:id: Retrieve user information by their id
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    res.json(user);
});

// PUT /users/:id: Update user information by their id
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    if (!name || !email) {
        return res.status(400).send({ error: 'Name and email are required' });
    }

    user.name = name;
    user.email = email;

    res.json(user);
});

// DELETE /users/:id: Delete a user by their id
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).send({ error: 'User not found' });
    }

    users.splice(userIndex, 1);

    res.status(204).send(); // No content, user deleted
});

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing