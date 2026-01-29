import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persistent session
        try {
            const savedUser = localStorage.getItem('clearlayer_user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (e) {
            console.error("Failed to parse user session", e);
            localStorage.removeItem('clearlayer_user');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const users = JSON.parse(localStorage.getItem('clearlayer_users') || '[]');
                    const foundUser = users.find(u => u.email === email && u.password === password);

                    if (foundUser) {
                        const { password: _, ...userData } = foundUser;
                        setUser(userData);
                        localStorage.setItem('clearlayer_user', JSON.stringify(userData));
                        resolve(userData);
                    } else {
                        reject(new Error("Invalid credentials"));
                    }
                } catch (e) {
                    reject(new Error("Authentication failed"));
                }
            }, 1000);
        });
    };

    const signup = async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (!email.includes('@')) {
                        reject(new Error("Invalid email format"));
                        return;
                    }
                    if (password.length < 6) {
                        reject(new Error("Password must be at least 6 characters"));
                        return;
                    }

                    const users = JSON.parse(localStorage.getItem('clearlayer_users') || '[]');
                    if (users.some(u => u.email === email)) {
                        reject(new Error("User already exists"));
                        return;
                    }

                    const userData = {
                        email,
                        password, // Storing password in plain text as requested by "localStorage logic" for a simple bypass/mock
                        name: email.split('@')[0],
                        id: 'usr_' + Date.now().toString(36),
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
                    };

                    users.push(userData);
                    localStorage.setItem('clearlayer_users', JSON.stringify(users));

                    const { password: _, ...userSession } = userData;
                    setUser(userSession);
                    localStorage.setItem('clearlayer_user', JSON.stringify(userSession));
                    resolve(userSession);
                } catch (e) {
                    reject(new Error("Signup failed"));
                }
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('clearlayer_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
