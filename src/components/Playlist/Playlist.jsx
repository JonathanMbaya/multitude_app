import React from "react";
import "./Playlist.css";

function Playlist() {

  // Définition des URLs des playlists
  const spotifyPlaylist = "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator";
  const youtubePlaylist = "https://www.youtube.com/embed/videoseries?si=qNZTvNlbDKisy1Qg&amp;list=PLEiHuyQJJ1QVYQehdUjHap0MNJOGt6Kpa";

  // Détermine quelle playlist afficher selon le chemin
  let embedUrl = spotifyPlaylist
//   if (location.pathname.includes("/reco/multimusique")) {
//     embedUrl = spotifyPlaylist;
//   } else if (location.pathname.includes("/reco/multicinema")) {
//     embedUrl = youtubePlaylist;
//   }

  return (
    <div className="music-container">
        <div className="info-playlist">
            <h1>Multi Musique</h1>
            
            <p>
                Multitude vous propose chaque mois sa playlist 
                préparée pour vous sur mesure , les coups de coeurs 
                de la rédaction et les tendances à ne pas manquer.
            </p>

        </div>


        <div className="playlist-container">
        {embedUrl ? (
            <iframe
            className="playlist-frame"
            src={embedUrl}
            width="100%"
            height="380"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            title="Playlist"
            ></iframe>
        ) : (
            <p className="error-message">Aucune playlist disponible pour cette URL.</p>
        )}
        </div>
    </div>

  );
}

export default Playlist;
