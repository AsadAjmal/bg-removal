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
        // Simulated API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password.length < 4) {
                    reject(new Error("Password too short"));
                    return;
                }
                const userData = {
                    email,
                    name: email.split('@')[0],
                    id: 'usr_' + Math.random().toString(36).substr(2, 9),
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
                };
                setUser(userData);
                localStorage.setItem('clearlayer_user', JSON.stringify(userData));
                resolve(userData);
            }, 1500);
        });
    };

    const signup = async (email, password) => {
        // Simulated API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!email.includes('@')) {
                    reject(new Error("Invalid email format"));
                    return;
                }
                const userData = {
                    email,
                    name: email.split('@')[0],
                    id: 'usr_' + Date.now().toString(36),
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
                };
                setUser(userData);
                localStorage.setItem('clearlayer_user', JSON.stringify(userData));
                resolve(userData);
            }, 1500);
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
