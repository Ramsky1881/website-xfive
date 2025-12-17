import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Sidebar from '../components/Sidebar';
import Slideshow from '../components/Slideshow';
import MemberGrid from '../components/MemberGrid';
import SponsorSection from '../components/SponsorSection';
import Livestream from '../components/Livestream';
import Footer from '../components/Footer';
import About from '../components/About';
import ContactUs from '../components/ContactUs';
import FAQ from '../components/FAQ';

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

                <div id="about"><About /></div>
                <div id="contact"><ContactUs /></div>
                <div id="faq"><FAQ /></div>
            </div>

            <Footer />
        </>
    );
};

export default Home;
