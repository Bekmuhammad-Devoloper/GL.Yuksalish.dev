const AUTH_KEY = 'gl_admin_auth';
const CREDENTIALS = { username: 'GL2026', password: '20262030' };

export function login(username: string, password: string): boolean {
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, '1');
    }
    return true;
  }
  return false;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_KEY) === '1';
}
