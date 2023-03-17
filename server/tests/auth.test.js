import { login, signUp } from "../src/controllers/seed_controler.js";

describe('login', () => {
  it('should return a response with status 200 and a message', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authentication successful' });
  });
});

describe('signUp', () => {
    it('should return a response with status 200 and a success message', async () => {
      const req = {
        body: {
          firstName : 'John',
          lastName : 'Smith',
          email: 'john@example.com',
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await signUp(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        user: {
          firstName : 'John',
          lastName : 'Smith',
          email: 'john@example.com',
          password: 'password123'
        }
      });
    });
  });
  