import React from 'react';
import AppAppBar from '../components/AppAppBar';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../theme/AppTheme';
import Box from '@mui/material/Box';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

function Home() {
  return (
    console.log(import.meta.env.VITE_STRAPI_URL),

    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Hero/>
      <Features/>
      <FAQ/>
      <Footer/>
    </AppTheme>

  );
}

export default Home;
