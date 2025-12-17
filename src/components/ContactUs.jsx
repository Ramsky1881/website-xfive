import React from 'react';

const ContactUs = () => {
    return (
        <div className="sponsor-section" style={{ marginTop: '60px' }}>
            <h2 className="section-title">Contact Us</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ color: '#fff', marginBottom: '20px', fontSize: '18px' }}>Get in Touch</h3>
                    <p style={{ color: '#b0b0b0', marginBottom: '15px' }}>
                        Have questions? Partnership opportunities? Reach out to our command center.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
                            <span>📧</span>
                            <span>contact@neraka-portal.com</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
                            <span>📍</span>
                            <span>Neo Jakarta, Sector 7</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
                            <span>🎮</span>
                            <span>discord.gg/neraka</span>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ color: '#fff', marginBottom: '20px', fontSize: '18px' }}>Send Transmission</h3>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input
                            type="text"
                            placeholder="Codename"
                            style={{ padding: '12px', background: '#0f0f0f', border: '1px solid #333', borderRadius: '6px', color: '#fff' }}
                        />
                        <input
                            type="email"
                            placeholder="Secure Email"
                            style={{ padding: '12px', background: '#0f0f0f', border: '1px solid #333', borderRadius: '6px', color: '#fff' }}
                        />
                        <textarea
                            placeholder="Message content..."
                            rows="4"
                            style={{ padding: '12px', background: '#0f0f0f', border: '1px solid #333', borderRadius: '6px', color: '#fff', resize: 'none' }}
                        ></textarea>
                        <button
                            type="button"
                            className="info-bar"
                            style={{ width: '100%', marginTop: '10px' }}
                        >
                            TRANSMIT DATA
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
