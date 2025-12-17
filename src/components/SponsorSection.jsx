import React from 'react';

const SponsorSection = () => {
    const sponsors = [1, 2, 3, 4, 5, 6];

    return (
        <div className="sponsor-section">
            <h2 className="section-title">Our Sponsors</h2>
            <div className="sponsor-grid">
                {sponsors.map(id => (
                    <div className="sponsor-box" key={id}>
                        <span>LOGO<br/>SPONSOR {id}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SponsorSection;
