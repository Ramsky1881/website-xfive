import React, { useState, useEffect } from 'react';

const Slideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { id: 1, text: "FEATURED HIGHLIGHT 1", bg: "linear-gradient(135deg, #1a1a1a 0%, #3700b3 100%)" },
        { id: 2, text: "CYBERPUNK EVENT", bg: "linear-gradient(135deg, #1a1a1a 0%, #b00020 100%)" },
        { id: 3, text: "NEW TOURNAMENT", bg: "linear-gradient(135deg, #1a1a1a 0%, #03dac6 100%)" },
        { id: 4, text: "JOIN OUR SQUAD", bg: "linear-gradient(135deg, #1a1a1a 0%, #bb86fc 100%)" },
        { id: 5, text: "LATEST UPDATES", bg: "linear-gradient(135deg, #1a1a1a 0%, #cf6679 100%)" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="slideshow">
            <div className="slideshow-content" style={{ background: slides[currentSlide].bg }}>
                {slides[currentSlide].text}
            </div>

            <div className="slideshow-indicators">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Slideshow;
