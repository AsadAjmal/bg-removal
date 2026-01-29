import { removeBackground } from '@imgly/background-removal';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, Wand2, Download, Trash2, CheckCircle2,
    AlertCircle, Loader2, RefreshCw, Layers, Palette,
    Monitor, Smartphone, Maximize, Ghost
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [sourceImage, setSourceImage] = useState(null);
    const [removedImage, setRemovedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [bgType, setBgType] = useState('transparent');
    const [bgValue, setBgValue] = useState('');
    const [progress, setProgress] = useState(0);
    const [activeTab, setActiveTab] = useState('background'); // background, effects, shadows

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                alert("File too large. Please use an image under 10MB.");
                return;
            }
            const url = URL.createObjectURL(file);
            setSourceImage(url);
            setRemovedImage(null);
            setBgType('transparent');

            // Auto-start processing
            setTimeout(() => {
                processImage(url);
            }, 100);
        }
    };

    const processImage = async (imgToProcess = sourceImage) => {
        if (!imgToProcess) return;
        setIsProcessing(true);
        setProgress(0);

        try {
            console.log("Initializing ClearLayer AI...");

            const config = {
                progress: (step, current, total) => {
                    const p = Math.round((current / total) * 100);
                    setProgress(p);
                    console.log(`[AI ${step}] ${p}%`);
                },
                // It's often better to not specify publicPath unless hosting locally 
                // to let the library use its built-in optimized CDN routing
            };

            // Perform the removal
            const blob = await removeBackground(imgToProcess, config);

            if (!blob) {
                throw new Error("AI returned no data");
            }

            const url = URL.createObjectURL(blob);
            setRemovedImage(url);
            console.log("Image processed successfully!");
            // No alert needed for success if UI updates clearly, but a transition is nice
        } catch (error) {
            console.error("AI Processing Error:", error);

            let friendlyMessage = "Background removal failed.";

            if (error instanceof TypeError) {
                friendlyMessage = "Connection error: Could not reach the AI processing servers.";
            } else if (error.message?.includes("memory")) {
                friendlyMessage = "System error: The image is too large for your browser's memory.";
            } else {
                friendlyMessage = "Failed to process image. Please try a different photo with a clear subject.";
            }

            alert(friendlyMessage);
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadImage = () => {
        if (!sourceImage) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            if (bgType === 'color') {
                ctx.fillStyle = bgValue;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else if (bgType === 'gradient') {
                const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                const grad = bgOptions.gradients.find(g => g.value === bgValue);
                if (grad) {
                    grad.colors.forEach((c, i) => grd.addColorStop(i / (grad.colors.length - 1), c));
                }
                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);

            const link = document.createElement('a');
            link.download = `clearlayer_${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
        img.crossOrigin = "anonymous";
        img.src = removedImage || sourceImage;
    };

    const bgOptions = {
        colors: ['#ffffff', '#000000', '#f87171', '#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#a78bfa'],
        gradients: [
            { name: 'Purple Night', value: 'purple', colors: ['#818cf8', '#c084fc'], css: 'linear-gradient(135deg, #818cf8 0%, #c084fc 100%)' },
            { name: 'Ocean Breeze', value: 'ocean', colors: ['#0ea5e9', '#22d3ee'], css: 'linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)' },
            { name: 'Sunset Glow', value: 'sunset', colors: ['#f59e0b', '#ef4444'], css: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' },
            { name: 'Mint Leaf', value: 'mint', colors: ['#10b981', '#3b82f6'], css: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' },
        ]
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ paddingTop: '130px', paddingBottom: '50px' }}
        >
            <div className="container">
                <div className="dashboard-grid">

                    {/* Main Workspace */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="glass-heavy slider-container" style={{
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            background: '#0a0c10',
                            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.5)'
                        }}>
                            {/* Pattern Background for Transparency */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                opacity: 0.1,
                                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                                zIndex: 0
                            }}></div>

                            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid var(--border-glass)', zIndex: 10 }}>
                                <div style={{ width: '8px', height: '8px', background: isProcessing ? '#fbbf24' : '#10b981', borderRadius: '50%', boxShadow: isProcessing ? '0 0 10px #fbbf24' : '0 0 10px #10b981' }}></div>
                                {isProcessing ? 'AI Processing...' : 'AI Ready'}
                            </div>

                            {!sourceImage ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const file = e.dataTransfer.files[0];
                                        if (file) handleFileUpload({ target: { files: [file] } });
                                    }}
                                    onClick={() => fileInputRef.current?.click()}
                                    style={{
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        padding: '4rem',
                                        border: '2px dashed var(--border-glass)',
                                        borderRadius: '30px',
                                        width: '80%',
                                        zIndex: 1,
                                        transition: 'all 0.3s ease'
                                    }}
                                    whileHover={{ borderColor: 'var(--primary)', background: 'var(--primary-light)' }}
                                >
                                    <div style={{ background: 'var(--gradient-main)', width: '90px', height: '90px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 10px 30px -5px rgba(129, 140, 248, 0.4)' }}>
                                        <Upload size={40} color="white" />
                                    </div>
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>Upload Image</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Drag and drop or click to browse files</p>
                                    <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)' }}>Supports JPG, PNG, WebP up to 10MB</p>
                                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} accept="image/*" />
                                </motion.div>
                            ) : (
                                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                                    {/* Background Layer */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: bgType === 'color' ? bgValue : bgType === 'gradient' ? bgOptions.gradients.find(g => g.value === bgValue)?.css : 'transparent',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        zIndex: 1
                                    }}></div>

                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        style={{ zIndex: 2, position: 'relative', maxWidth: '100%', maxHeight: '100%' }}
                                    >
                                        <img
                                            src={removedImage || sourceImage}
                                            alt="Workspace"
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '520px',
                                                objectFit: 'contain',
                                                filter: removedImage ? 'drop-shadow(0 20px 50px rgba(0,0,0,0.4))' : 'none'
                                            }}
                                        />
                                    </motion.div>

                                    <AnimatePresence>
                                        {isProcessing && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'rgba(0,0,0,0.8)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    zIndex: 10,
                                                    backdropFilter: 'blur(8px)'
                                                }}
                                            >
                                                <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '2rem' }}>
                                                    <Loader2 size={100} className="animate-spin" style={{ color: 'var(--primary)', opacity: 0.2 }} />
                                                    <motion.div
                                                        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                                                    >
                                                        {progress}%
                                                    </motion.div>
                                                </div>
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>AI Processing...</h3>
                                                <p style={{ color: 'var(--text-muted)' }}>Detecting edges and cleaning background</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.75rem', zIndex: 11 }}>
                                        <button className="btn-secondary" style={{ padding: '0.5rem' }} title="Full Screen"><Maximize size={18} /></button>
                                        <button className="btn-secondary" style={{ padding: '0.5rem' }} title="Mobile View"><Smartphone size={18} /></button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <button
                                className="btn-secondary"
                                onClick={() => { setSourceImage(null); setRemovedImage(null); setBgType('transparent'); }}
                                style={{ height: '48px', px: '1.5rem' }}
                            >
                                <Trash2 size={18} /> Clear Session
                            </button>
                            <div style={{ flex: 1 }}></div>
                            {!removedImage && sourceImage && !isProcessing && (
                                <button
                                    className="btn-primary"
                                    onClick={processImage}
                                    style={{ height: '48px', padding: '0 2.5rem', fontSize: '1.1rem' }}
                                >
                                    <Wand2 size={20} /> Remove Background
                                </button>
                            )}
                            {removedImage && (
                                <button
                                    className="btn-primary"
                                    onClick={downloadImage}
                                    style={{ height: '48px', padding: '0 2.5rem', fontSize: '1.1rem' }}
                                >
                                    <Download size={20} /> Download HD
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Editor Controls Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="glass-heavy" style={{ borderRadius: '24px', padding: '1.75rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: 'var(--glass)', padding: '0.4rem', borderRadius: '14px' }}>
                                {['background', 'adjust'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        style={{
                                            flex: 1,
                                            padding: '0.6rem',
                                            borderRadius: '10px',
                                            background: activeTab === tab ? 'var(--primary)' : 'transparent',
                                            color: activeTab === tab ? 'white' : 'var(--text-muted)',
                                            border: 'none',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {activeTab === 'background' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Solid Colors</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                                            <button
                                                onClick={() => { setBgType('transparent'); setBgValue(''); }}
                                                style={{
                                                    aspectRatio: '1', borderRadius: '12px', cursor: 'pointer',
                                                    background: 'var(--glass)',
                                                    border: bgType === 'transparent' ? '2px solid var(--primary)' : '1px solid var(--border-glass)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}
                                            >
                                                <Ghost size={20} />
                                            </button>
                                            {bgOptions.colors.map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => { setBgType('color'); setBgValue(c); }}
                                                    style={{
                                                        aspectRatio: '1', borderRadius: '12px', cursor: 'pointer',
                                                        background: c,
                                                        border: (bgType === 'color' && bgValue === c) ? '3px solid var(--primary)' : '1px solid var(--border-glass)',
                                                        boxShadow: (bgType === 'color' && bgValue === c) ? '0 0 15px var(--primary)' : 'none'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Gradients</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            {bgOptions.gradients.map(g => (
                                                <button
                                                    key={g.value}
                                                    onClick={() => { setBgType('gradient'); setBgValue(g.value); }}
                                                    style={{
                                                        height: '50px', borderRadius: '14px', cursor: 'pointer',
                                                        background: g.css,
                                                        border: (bgType === 'gradient' && bgValue === g.value) ? '2px solid white' : 'none',
                                                        padding: '0 1.25rem',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                        color: 'white', fontWeight: 600, fontSize: '0.9rem'
                                                    }}
                                                >
                                                    {g.name}
                                                    {(bgType === 'gradient' && bgValue === g.value) && <CheckCircle2 size={18} />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="glass" style={{ padding: '1.25rem', borderStyle: 'dashed', borderRadius: '18px', textAlign: 'center', opacity: 0.7 }}>
                                        <RefreshCw size={24} style={{ marginBottom: '0.75rem', color: 'var(--primary)' }} />
                                        <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Custom Backdrops</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Upload your own backdrops coming in v2.0</p>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
                                    <Palette size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                                    <p style={{ fontSize: '0.9rem' }}>Advanced filters and color adjustments are currently in development.</p>
                                </div>
                            )}
                        </div>

                        <div className="glass-heavy" style={{ padding: '1.5rem', borderRadius: '24px', background: 'rgba(129, 140, 248, 0.05)', border: '1px solid rgba(129, 140, 248, 0.2)' }}>
                            <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '1rem' }}>
                                <AlertCircle size={18} color="var(--primary)" /> Pro Tip
                            </h5>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                For hairs and complex edges, try processing twice or adding a slight shadow in effects to blend perfectly.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
