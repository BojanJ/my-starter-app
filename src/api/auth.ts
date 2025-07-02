// src/api/auth.ts
interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

const mockUsers = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123',
    name: 'Test User',
    token: 'mock-jwt-token-123',
  },
];

export const loginUser = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.email === email && u.password === password);
      if (user) {
        // Simulate storing token (e.g., localStorage)
        localStorage.setItem('authToken', user.token);
        resolve({ id: user.id, email: user.email, name: user.name, token: user.token });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};

export const logoutUser = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('authToken');
      resolve();
    }, 200);
  });
};

export const getCurrentUser = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const user = mockUsers.find((u) => u.token === token);
        resolve(
          user ? { id: user.id, email: user.email, name: user.name, token: user.token } : null
        );
      } else {
        resolve(null);
      }
    }, 100);
  });
};
