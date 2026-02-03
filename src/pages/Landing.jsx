import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Sparkles, Wand2, Download, Layers, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="section-padding" style={{ overflowX: 'hidden', position: 'relative' }}>

            {/* Background Ornaments */}
            <div className="bg-blob" style={{ position: 'absolute', zIndex: -1, pointerEvents: 'none', top: '2%', right: '10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(129, 140, 248, 0.2) 0%, transparent 70%)' }}></div>
            <div className="bg-blob" style={{ position: 'absolute', zIndex: -1, pointerEvents: 'none', bottom: '20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(192, 132, 252, 0.15) 0%, transparent 70%)' }}></div>

            {/* Hero Section */}
            <section className="container" style={{ textAlign: 'center', position: 'relative' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '100px',
                        background: 'var(--primary-light)',
                        border: '1px solid rgba(129, 140, 248, 0.3)',
                        color: 'var(--primary)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        marginBottom: '0.75rem',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <Sparkles size={16} fill="var(--primary)" />
                        <span>AI-Powered Precision Removal</span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '0.75rem',
                        letterSpacing: '-2px'
                    }}>
                        Stunning Images <br />
                        <span className="gradient-text">Without Backgrounds</span>
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                        color: 'var(--text-muted)',
                        maxWidth: '800px',
                        margin: '0 auto 1.5rem',
                        lineHeight: 1.5,
                        fontWeight: 400
                    }}>
                        Join 100k+ users who trust ClearLayer for professional-grade background removal.
                        Powered by next-gen AI that understands hair, transparency, and complex edges.
                    </p>

                    <div className="hero-buttons" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <Link to="/signup" className="btn-primary" style={{ padding: 'clamp(0.8rem, 3vw, 1.2rem) 2.5rem', fontSize: 'clamp(1rem, 2vw, 1.15rem)', width: 'auto' }}>
                            Remove Background Now
                        </Link>
                        <Link to="/login" className="btn-secondary" style={{ padding: 'clamp(0.8rem, 3vw, 1.2rem) 2.5rem', fontSize: 'clamp(1rem, 2vw, 1.15rem)', width: 'auto' }}>
                            View Showcase
                        </Link>
                    </div>
                </motion.div>

                {/* Feature Preview Slider */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    style={{
                        margin: '0 auto',
                        maxWidth: '1100px',
                        position: 'relative',
                        borderRadius: '30px',
                        overflow: 'hidden',
                        boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7), 0 0 0 1px var(--border-glass)'
                    }}
                >
                    <div className="slider-container" style={{ display: 'flex', background: '#0a0c10' }}>
                        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Portrait model" />
                            <div style={{ position: 'absolute', top: '2rem', left: '2rem', background: 'rgba(0,0,0,0.6)', padding: '0.6rem 1.2rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600, backdropFilter: 'blur(10px)' }}>Before</div>
                        </div>

                        {/* Slider Handle Simulation */}
                        <div style={{ width: '2px', background: 'white', position: 'relative', zIndex: 10, boxShadow: '0 0 20px 2px rgba(129, 140, 248, 0.8)' }}>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'black',
                                boxShadow: '0 0 30px rgba(0,0,0,0.5)'
                            }}>
                                <MousePointer2 size={24} />
                            </div>
                        </div>

                        <div style={{
                            flex: 1,
                            position: 'relative',
                            overflow: 'hidden',
                            background: 'linear-gradient(45deg, #1a1c2e 25%, #111 25%, #111 50%, #1a1c2e 50%, #1a1c2e 75%, #111 75%, #111 100%)',
                            backgroundSize: '40px 40px'
                        }}>
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'drop-shadow(0 0 40px rgba(129, 140, 248, 0.3))' }} alt="Portrait model" />
                            <div style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'var(--gradient-main)', padding: '0.6rem 1.2rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600 }}>After</div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Trust Badges / Stats */}
            <section style={{ padding: '8rem 0 4rem' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}>
                    <div>
                        <h4 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }} className="gradient-text">99.9%</h4>
                        <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Accuracy Rate</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }} className="gradient-text">&lt; 3s</h4>
                        <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Processing Time</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }} className="gradient-text">1M+</h4>
                        <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Processed Photos</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem' }} className="gradient-text">4.9/5</h4>
                        <p style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>User Satisfaction</p>
                    </div>
                </div>
            </section>

            {/* Features Detail */}
            <section style={{ padding: '6rem 0 100px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 5rem)' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-1.5px' }}>Powerful features for everyone</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>From pro photographers to social media enthusiasts.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: <Zap color="#818cf8" />, title: 'Edge Detection', desc: 'No more jagged lines. Our AI identifies every strand of hair for a perfect cutout.' },
                            { icon: <Wand2 color="#c084fc" />, title: 'One-Click Magic', desc: 'Completely automated. No manual painting or selection required.' },
                            { icon: <Layers color="#f472b6" />, title: 'Multi-Format Support', desc: 'Works with PNG, JPG, and WEBP. Export in high-res without quality loss.' },
                            { icon: <Download color="#34d399" />, title: 'API Access', desc: 'Integrate our background removal directly into your own apps and tools.' },
                            { icon: <Shield color="#60a5fa" />, title: 'Privacy First', desc: 'We never store your original images. Everything is processed and cleared.' },
                            { icon: <Sparkles color="#fbbf24" />, title: 'Presets Library', desc: 'Choose from 500+ premium backgrounds, textures, and gradients.' }
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="glass"
                                style={{ padding: '2.5rem', borderRadius: '24px' }}
                            >
                                <div style={{ marginBottom: '1.5rem', background: 'var(--primary-light)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {f.icon}
                                </div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 700 }}>{f.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem' }}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="glass" style={{ borderBottom: 'none', borderLeft: 'none', borderRight: 'none', padding: '4rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <span style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.5px' }}>
                            Clear<span className="gradient-text">Layer</span>
                        </span>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>© 2026 ClearLayer AI. All rights reserved.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
                        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</Link>
                        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
