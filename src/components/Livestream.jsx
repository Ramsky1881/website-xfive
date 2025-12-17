import React from 'react';

const Livestream = () => {
    return (
        <>
            <h2 className="section-title">Live Now</h2>
            <div className="livestream-section">
                <div className="video-box">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: '20px' }}
                    ></iframe>
                </div>
                <div className="livestream-info">
                    <h2>LIVESTREAM XFIVE</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum.</p>
                </div>
            </div>
        </>
    );
};

export default Livestream;
