const request = require('supertest');
const jwt = require('jsonwebtoken');
const { server } = require('../app');
const controller = require('../controllers/controller');

afterAll(done => {
    server.close(done);
});

describe('POST /verify', () => {
    it('should return isValid: true for valid JWT', async () => {
        const token = jwt.sign({ Name: 'John', Role: 'Admin', Seed: 7 }, process.env.JWT_SECRET);

        const res = await request(server)
            .post('/verify')
            .send({ token });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('isValid', true);
    });

    it('should return isValid: false for invalid JWT', async () => {
        const token = jwt.sign({ Name: 'John123', Role: 'Admin', Seed: 7 }, process.env.JWT_SECRET);

        const res = await request(server)
            .post('/verify')
            .send({ token });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('isValid', false, "message", 'Invalid Name claim');
    });
});

describe('isPrime', () => {
    it('should return true for prime numbers', () => {
        expect(controller.isPrime(2)).toBe(true);
        expect(controller.isPrime(3)).toBe(true);
        expect(controller.isPrime(5)).toBe(true);
        expect(controller.isPrime(7)).toBe(true);
        expect(controller.isPrime(11)).toBe(true);
        expect(controller.isPrime(13)).toBe(true);
    });

    it('should return false for non-prime numbers', () => {
        expect(controller.isPrime(1)).toBe(false);
        expect(controller.isPrime(4)).toBe(false);
        expect(controller.isPrime(6)).toBe(false);
        expect(controller.isPrime(8)).toBe(false);
        expect(controller.isPrime(9)).toBe(false);
        expect(controller.isPrime(10)).toBe(false);
    });

    it('should return false for negative numbers and zero', () => {
        expect(controller.isPrime(0)).toBe(false);
        expect(controller.isPrime(-1)).toBe(false);
        expect(controller.isPrime(-2)).toBe(false);
        expect(controller.isPrime(-3)).toBe(false);
    });
});
