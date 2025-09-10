// Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import FeatureSection from '../components/FetureSection';
import { Testimonial } from '../components/Testimonial';
 import { Newsletter } from '../components/Newsletter';
 // Corrected import
import { Banner } from '../components/Banner';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeatureSection />
      <Banner />
      <Testimonial />
      <Newsletter />
     
    </div>
  );
};

export default Home;