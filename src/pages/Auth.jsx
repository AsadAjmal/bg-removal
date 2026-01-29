import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Github, Chrome, Zap, Loader2 } from 'lucide-react';

const Auth = () => {
    const isLogin = useLocation().pathname === '/login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, login, signup } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Invalid credentials or network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            overflow: 'hidden',
            background: 'var(--bg-dark)'
        }}>
            {/* Decorative Side Panel (Desktop) */}
            <div style={{
                flex: 1,
                background: 'var(--gradient-main)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '5rem',
                position: 'relative',
                overflow: 'hidden'
            }} className="nav-labels hide-on-mobile">
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ zIndex: 1 }}
                >
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'white', marginBottom: '4rem' }}>
                        <Zap size={32} fill="white" />
                        <span style={{ fontSize: '2rem', fontWeight: 800 }}>ClearLayer</span>
                    </Link>
                    <h2 style={{ fontSize: '4rem', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '2rem' }}>
                        The future of <br /> visual editing.
                    </h2>
                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '450px', lineHeight: 1.6 }}>
                        Join thousands of creators using our AI to automate their workflow and focus on what matters most.
                    </p>
                </motion.div>
            </div>

            {/* Main Form Area */}
            <div style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative', width: '100%' }}>
                <div className="bg-blob" style={{ top: '20%', right: '10%', width: '500px', height: '500px', opacity: 0.1 }}></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-heavy mobile-p-0"
                    style={{ width: '100%', maxWidth: '440px', padding: 'clamp(1.5rem, 5vw, 3.5rem)', borderRadius: '24px', zIndex: 1 }}
                >
                    <div className="mobile-text-center" style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.2rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-1px' }}>
                            {isLogin ? 'Welcome Back' : 'Get Started'}
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                            {isLogin ? 'Sign in to your account' : 'Created your workspace in seconds'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', color: '#f87171', fontSize: '0.9rem', textAlign: 'center' }}
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!isLogin && (
                            <div style={{ position: 'relative' }}>
                                <User style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1rem 1rem 3.5rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid var(--border-glass)',
                                        borderRadius: '14px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-glass)'}
                                />
                            </div>
                        )}

                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3.5rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--border-glass)',
                                    borderRadius: '14px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-glass)'}
                            />
                        </div>

                        <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                            <Lock style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3.5rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--border-glass)',
                                    borderRadius: '14px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-glass)'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ width: '100%', height: '56px', fontSize: '1.1rem', marginTop: '1rem' }}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div style={{ margin: '2.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border-glass)' }}></div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Social Auth</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border-glass)' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button type="button" className="btn-secondary" style={{ padding: '0.8rem' }}>
                            <Chrome size={20} />
                        </button>
                        <button type="button" className="btn-secondary" style={{ padding: '0.8rem' }}>
                            <Github size={20} />
                        </button>
                    </div>

                    <p style={{ textAlign: 'center', marginTop: '2.5rem', color: 'var(--text-muted)', fontSize: '1rem' }}>
                        {isLogin ? "New to ClearLayer? " : "Already have an account? "}
                        <span
                            onClick={() => navigate(isLogin ? '/signup' : '/login')}
                            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 700 }}
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Auth;
