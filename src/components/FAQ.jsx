import React from 'react';

const FAQ = () => {
    const faqs = [
        { q: "How do I join the clan?", a: "Navigate to the sidebar, select an admin, and click 'Chat Sekarang' to verify your identity via WhatsApp." },
        { q: "Is membership free?", a: "Basic access is free. Elite status requires passing the combat trials in Sector 4." },
        { q: "What games do you support?", a: "We focus on FPS, Cyber-RPGs, and Battle Royales including Valorant, Apex Legends, and Cyberpunk 2077 Multiplayer Mod." },
        { q: "Can I sponsor an event?", a: "Yes. Corporate entities should contact us via the Contact form for sponsorship packages." }
    ];

    return (
        <div className="sponsor-section" style={{ marginTop: '60px' }}>
            <h2 className="section-title">F.A.Q</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {faqs.map((item, index) => (
                    <div key={index} style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ color: '#667eea', marginBottom: '10px', fontSize: '16px', fontWeight: '600' }}>{item.q}</h3>
                        <p style={{ color: '#b0b0b0', fontSize: '14px' }}>{item.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
