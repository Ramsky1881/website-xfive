import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Sidebar from '../components/Sidebar';
import Slideshow from '../components/Slideshow';
import MemberGrid from '../components/MemberGrid';
import SponsorSection from '../components/SponsorSection';
import Livestream from '../components/Livestream';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Header />
            {/* Banner: link dan height (padding) bisa dikustomisasi */}
            <Banner link="#" height="12px 20px" />

            <div className="container">
                <div className="two-column">
                    <Sidebar />
                    <Slideshow />
                </div>

                <div id="profil"><MemberGrid /></div>
                <div id="gallery"><SponsorSection /></div>
                <div id="info"><Livestream /></div>
            </div>

            <Footer />
        </>
    );
};

export default Home;
