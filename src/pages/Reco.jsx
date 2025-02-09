import React from 'react';
import { useLocation } from "react-router-dom";

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Playlist from '../components/Playlist/Playlist';
import LectureList from '../components/LectureList/LectureList';
import CinemaList from '../components/CinemaList/CinemaList';

function Reco() {
    const location = useLocation(); // ✅ Récupère l'URL actuelle

    return (
        <>
            <Navbar/>

            {location.pathname.includes("/reco/multimusique") && <Playlist />}
            {location.pathname.includes("/reco/multilecture") && <LectureList />}
            {location.pathname.includes("/reco/multicinema") && <CinemaList />}

            <Footer/>
        </>
    );
}

export default Reco;
