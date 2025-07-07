import React from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import BannerHome from "../components/BannerHome/BannerHome.jsx";
import LastArticles from "../components/LastArticles/LastArticles.jsx";
import FormContact from "../components/Contact/FormContact.jsx";

function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <BannerHome />
        <LastArticles />
        <FormContact />
      </main>

      <Footer />
    </>
  );
}

export default Home;
