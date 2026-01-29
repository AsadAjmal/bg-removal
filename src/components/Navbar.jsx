import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogOut, User, Zap, Menu, X, Home, Tag, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { label: 'Features', to: '/', icon: <Home size={18} /> },
        { label: 'Pricing', to: '/', icon: <Tag size={18} /> },
    ];

    return (
        <nav className="navbar-container glass-heavy">
            <Link to={user ? "/dashboard" : "/"} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                    background: 'var(--gradient-main)',
                    padding: '10px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 4px 15px -5px rgba(129, 140, 248, 0.5)'
                }}>
                    <Zap size={20} color="white" fill="white" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 'clamp(1rem, 4vw, 1.4rem)', letterSpacing: '-0.8px', whiteSpace: 'nowrap' }}>
                    Clear<span className="gradient-text">Layer</span>
                </span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="nav-labels" style={{ display: 'flex', gap: '1.5rem' }}>
                    {navLinks.map((link, idx) => (
                        <Link key={idx} to={link.to} style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: 500 }}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {user ? (
                    <div className="nav-labels" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <Link to="/dashboard" className="btn-secondary" style={{ padding: '0.6rem 1.2rem' }}>
                            Dashboard
                        </Link>
                        <div style={{ height: '24px', width: '1px', background: 'var(--border-glass)' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 500 }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={16} />
                                </div>
                                <span className="nav-labels">{user.name}</span>
                            </div>
                            <button
                                onClick={() => { logout(); navigate('/'); }}
                                className="btn-secondary"
                                style={{ padding: '0.5rem 0.75rem', borderRadius: '10px' }}
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="nav-labels" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 500 }}>Login</Link>
                        <Link to="/signup" className="btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
                            Try for Free
                        </Link>
                    </div>
                )}

                {/* Mobile Toggle */}
                <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`nav-menu-mobile ${isOpen ? 'is-open' : ''}`}>
                <div className="nav-links-mobile">
                    {navLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '1rem' }}
                        >
                            <span style={{ color: 'var(--primary)' }}>{link.icon}</span>
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className="nav-actions-mobile">
                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="btn-secondary"
                                style={{ justifyContent: 'flex-start', gap: '1rem' }}
                            >
                                <LayoutDashboard size={18} color="var(--primary)" /> Dashboard
                            </Link>
                            <div style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--glass)', borderRadius: '12px' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={14} color="white" />
                                </div>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.name}</span>
                            </div>
                            <button
                                onClick={() => { logout(); navigate('/'); setIsOpen(false); }}
                                className="btn-primary"
                                style={{ justifyContent: 'center' }}
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                style={{ textDecoration: 'none', color: 'var(--text-main)', textAlign: 'center', padding: '0.5rem' }}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setIsOpen(false)}
                                className="btn-primary"
                                style={{ justifyContent: 'center' }}
                            >
                                Try for Free
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
