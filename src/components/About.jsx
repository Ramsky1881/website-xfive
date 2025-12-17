import React from 'react';

const About = () => {
    return (
        <div className="sponsor-section" style={{ marginTop: '60px' }}>
            <h2 className="section-title">About Neraka Portal</h2>
            <div style={{ color: '#b0b0b0', lineHeight: '1.8', background: '#1a1a1a', padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ marginBottom: '20px' }}>
                    <strong>NERAKA PORTAL</strong> is the ultimate cyberpunk gaming community established in 2077.
                    We connect elite gamers, streamers, and developers in a unified ecosystem designed for the future of digital entertainment.
                </p>
                <p style={{ marginBottom: '20px' }}>
                    Our mission is to bridge the gap between virtual reality and hardcore gaming performance.
                    With over 10,000 active members, we dominate the competitive scene across multiple dimensions.
                </p>
                <p>
                    <em>"We don't just play the game, we rewrite the code."</em>
                </p>
            </div>
        </div>
    );
};

export default About;
