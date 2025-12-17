import React from 'react';

const Gallery = () => {
    // Generate some dummy image placeholders
    const images = [
        { id: 1, color: '#FF6B6B' },
        { id: 2, color: '#4ECDC4' },
        { id: 3, color: '#45B7D1' },
        { id: 4, color: '#96CEB4' },
        { id: 5, color: '#FFEEAD' },
        { id: 6, color: '#D4A5A5' },
        { id: 7, color: '#9B59B6' },
        { id: 8, color: '#3498DB' }
    ];

    return (
        <div className="gallery-section" style={{ marginBottom: '60px' }}>
            <h2 className="section-title">Gallery</h2>
            <div className="gallery-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px'
            }}>
                {images.map(img => (
                    <div key={img.id} className="gallery-item" style={{
                        height: '200px',
                        backgroundColor: img.color,
                        borderRadius: '12px',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <div style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            width: '100%',
                            padding: '10px',
                            background: 'rgba(0,0,0,0.5)',
                            color: '#fff',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            Image {img.id}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
