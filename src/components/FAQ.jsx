import React from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "How do I join the community?",
            answer: "You can join by contacting one of our admins via the sidebar chat or by following our social media channels."
        },
        {
            question: "Is there a membership fee?",
            answer: "Basic membership is free! We also offer premium tiers with exclusive content and perks."
        },
        {
            question: "How can I submit content for the gallery?",
            answer: "Please reach out to our content team via the Contact Us section with your portfolio or samples."
        },
        {
            question: "When are the livestreams scheduled?",
            answer: "We usually go live on weekends. Check the Info section for the latest schedule announcements."
        }
    ];

    return (
        <div className="faq-section" style={{ marginBottom: '60px' }}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-grid" style={{ display: 'grid', gap: '20px' }}>
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item" style={{ background: '#151515', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ color: '#fff', marginBottom: '10px', fontSize: '18px' }}>{faq.question}</h3>
                        <p style={{ color: '#b0b0b0' }}>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
