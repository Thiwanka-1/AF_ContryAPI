import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [users, setUsers] = useState({}); // map: username → password

  // On mount, load registered users and current user
  useEffect(() => {
    const regs = JSON.parse(localStorage.getItem('users') || '{}');
    setUsers(regs);
    const cur = JSON.parse(localStorage.getItem('currentUser'));
    if (cur) setUser(cur);
  }, []);

  // Sign up: add to users map if not exists
  const signup = (username, password) => {
    if (users[username]) {
      throw new Error('Username already taken');
    }
    const updated = { ...users, [username]: password };
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
    // auto-login after signup
    localStorage.setItem('currentUser', JSON.stringify({ username }));
    setUser({ username });
  };

  // Log in: only if registered & password match
  const login = (username, password) => {
    if (!users[username] || users[username] !== password) {
      throw new Error('Invalid username or password');
    }
    localStorage.setItem('currentUser', JSON.stringify({ username }));
    setUser({ username });
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
