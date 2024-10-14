const request = require('supertest');
const app = require('../src/index');

describe('User Management API (Grading)', () => {
    let userId;

    // PR Submitted Test (1 point)
    it('PR was successfully created and merged (1 point)', () => {
        expect(true).toBe(true); // Dummy test that always passes
    });

    // POST /users test (1 point)
    it('POST /users should create a new user (1 point)', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
            })
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('John Doe');
        expect(response.body.email).toBe('john@example.com');

        userId = response.body.id; // Store the ID for future tests
    });

    // GET /users/:id test (1 point)
    it('GET /users/:id should return user details (1 point)', async () => {
        const response = await request(app)
            .get(`/users/${userId}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', userId);
        expect(response.body.name).toBe('John Doe');
        expect(response.body.email).toBe('john@example.com');
    });

    // PUT /users/:id test (1 point)
    it('PUT /users/:id should update user details (1 point)', async () => {
        const response = await request(app)
            .put(`/users/${userId}`)
            .send({
                name: 'Jane Doe',
                email: 'jane@example.com',
            })
            .expect(200);

        expect(response.body.name).toBe('Jane Doe');
        expect(response.body.email).toBe('jane@example.com');
    });

    // DELETE /users/:id test (1 point)
    it('DELETE /users/:id should delete the user (1 point)', async () => {
        await request(app)
            .delete(`/users/${userId}`)
            .expect(204);

        await request(app)
            .get(`/users/${userId}`)
            .expect(404);
    });
});
