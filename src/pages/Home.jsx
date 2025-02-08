import React from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import BannerHome from '../components/BannerHome/BannerHome.jsx'
import LastArticles from '../components/LastArticles/LastArticles.jsx'

function Home() {
    return (
        <>
            <header>
                <Navbar/>
            </header>

            <main>
                <BannerHome/>
                <LastArticles/>
            </main>


            <Footer/>
        </>
    )
}


export default Home
