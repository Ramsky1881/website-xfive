import React from 'react';

const Banner = ({ text, link, height }) => {
    // Example usage of props for size customization, though CSS handles main height.
    // In a real scenario, style={{ height: height }} could be applied.

    return (
        <div className="banner" style={height ? { padding: height } : {}}>
            {/* Example of how a link could be wrapped, though design is just text scroller */}
            <a href={link || "#"} style={{ textDecoration: 'none' }}>
                <div className="banner-content">
                    <span className="banner-icon">📢</span>
                    <h1>{text || "SELAMAT DATANG DI NERAKA"}</h1>
                    <span className="banner-icon">📢</span>
                    <h1>{text || "SELAMAT DATANG DI NERAKA"}</h1>
                    <span className="banner-icon">📢</span>
                    <h1>{text || "SELAMAT DATANG DI NERAKA"}</h1>
                </div>
            </a>
        </div>
    );
};

export default Banner;
