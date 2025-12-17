import React, { useEffect, useRef } from 'react';

const Gallery = () => {
    const scrollContainerRef = useRef(null);

    const images = [
        { id: 1, url: 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=600&h=400&fit=crop', title: 'Neon City' },
        { id: 2, url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&h=400&fit=crop', title: 'Cyber Street' },
        { id: 3, url: 'https://images.unsplash.com/photo-1535868463750-c78d9543614f?w=600&h=400&fit=crop', title: 'Tech Hub' },
        { id: 4, url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop', title: 'Hardware' },
        { id: 5, url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=400&fit=crop', title: 'Neon Sign' },
        { id: 6, url: 'https://images.unsplash.com/photo-1504384308090-c54be3855085?w=600&h=400&fit=crop', title: 'Digital Art' },
        { id: 7, url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop', title: 'Cyberpunk' },
        { id: 8, url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&h=400&fit=crop', title: 'Light Trails' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                root: scrollContainerRef.current,
                threshold: 0.1,
            }
        );

        const items = document.querySelectorAll('.gallery-item');
        items.forEach((item) => observer.observe(item));

        return () => {
            items.forEach((item) => observer.unobserve(item));
        };
    }, []);

    return (
        <div className="gallery-section">
            <h2 className="section-title">Gallery</h2>
            <div className="gallery-scroll-container" ref={scrollContainerRef}>
                {images.map(img => (
                    <div key={img.id} className="gallery-item">
                        <img src={img.url} alt={img.title} loading="lazy" />
                        <div className="gallery-overlay">
                            <span>{img.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
