import React from 'react';
import About from './About/About';
import Ads from './Ads/Ads';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import Contact from './Contact/Contact';
import Statistic from './Statistic/Statistic';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Ads></Ads>
            <Category></Category>
            <Statistic></Statistic>
            <Contact></Contact>
        </div>
    );
};

export default Home;