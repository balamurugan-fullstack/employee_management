const TOKEN_KEY = 'employee-management-token';
const USER_KEY = 'employee-management-user';

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const authService = {
  async login({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password.trim()) {
      throw new Error('Please provide both email and password.');
    }

    if (!isValidEmail(normalizedEmail) || password.trim().length < 6) {
      throw new Error('Please enter a valid email and password.');
    }

    const user = {
      id: 1,
      name: 'Admin User',
      email: normalizedEmail,
      role: 'HR Admin',
    };

    const token = `fake-jwt-${Date.now()}`;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { token, user };
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getStoredUser() {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  },
};
