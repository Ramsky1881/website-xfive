import React from 'react';

const About = () => {
    return (
        <div className="about-section" style={{ marginBottom: '60px' }}>
            <h2 className="section-title">About Us</h2>
            <div className="about-content" style={{ background: '#151515', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ color: '#b0b0b0', marginBottom: '20px' }}>
                    Welcome to our platform. We are dedicated to bringing you the best content and community experience.
                    Our mission is to connect people through shared interests and provide a space for creativity and collaboration.
                </p>
                <p style={{ color: '#b0b0b0' }}>
                    Established in 2024, we have grown from a small group of enthusiasts to a vibrant community.
                    Explore our members, gallery, and live streams to see what we are all about.
                </p>
            </div>
        </div>
    );
};

export default About;
