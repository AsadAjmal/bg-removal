import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="navbar-container glass-heavy">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
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
                <span style={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.8px' }}>
                    Clear<span className="gradient-text">Layer</span>
                </span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div className="nav-labels" style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: 500 }}>Features</Link>
                    <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: 500 }}>Pricing</Link>
                </div>

                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 500 }}>Login</Link>
                        <Link to="/signup" className="btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
                            Try for Free
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
