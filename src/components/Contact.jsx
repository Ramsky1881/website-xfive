import React from 'react';

const Contact = () => {
    return (
        <div className="contact-section" style={{ marginBottom: '60px' }}>
            <h2 className="section-title">Contact Us</h2>
            <div className="contact-content" style={{ background: '#151515', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                <div className="contact-info-box">
                    <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: '18px' }}>Get in Touch</h3>
                    <p style={{ color: '#b0b0b0', marginBottom: '10px' }}>
                        Have questions or suggestions? We'd love to hear from you.
                    </p>
                    <p style={{ color: '#b0b0b0', marginBottom: '5px' }}><strong>Email:</strong> info@example.com</p>
                    <p style={{ color: '#b0b0b0', marginBottom: '5px' }}><strong>Phone:</strong> +62 812 3456 7890</p>
                    <p style={{ color: '#b0b0b0' }}><strong>Address:</strong> Jakarta, Indonesia</p>
                </div>

                <div className="contact-form-placeholder">
                    <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: '18px' }}>Send us a Message</h3>
                    <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            style={{ padding: '12px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            style={{ padding: '12px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="4"
                            style={{ padding: '12px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', resize: 'vertical' }}
                        ></textarea>
                        <button
                            className="info-bar"
                            style={{ marginTop: '10px', width: 'auto', padding: '0 30px' }}
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
