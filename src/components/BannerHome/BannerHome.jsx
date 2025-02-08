import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BannerHome.css';

function BannerHome() {
    const navigate = useNavigate();
    return (
        <>
            <div className='bannerhome'> 

                <div className='partOne'>
                    <img onClick={navigate('/article')}
                        src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop" 
                        alt="première image multitude mise en avant" 
                    />
                    <div className="overlay">
                        <h2 className='bannerh1'>A la une</h2>

                        <h3>Titre de l'article</h3>
                        <p>Description rapide de l'article en question...</p>
                        <Link to='/article'>
                            <button>Voir plus</button>
                        </Link>
                    </div>
                </div>


                <div className='part'>

                    <div className='secondImage'>
                        <img onClick={navigate('/article')}
                            src="https://images.unsplash.com/photo-1556962021-9d0303621643?q=80&w=1974&auto=format&fit=crop" 
                            alt="deuxième image multitude mise en avant" 
                        />
                        <div className="overlay">
                            <h3>Titre de l'article</h3>
                            <p>Description rapide de l'article en question...</p>
                            <button>Voir plus</button>
                        </div>
                    </div>


                    <div className='secondImage'>
                        <img onClick={navigate('/article')}
                            src="https://images.unsplash.com/photo-1738682085346-6a6faff97fb1?q=80&w=1920&auto=format&fit=crop" 
                            alt="troisième image multitude mise en avant" 
                        />
                        <div className="overlay">
                            <h3>Un autre article</h3>
                            <p>Un petit descriptif pour donner envie de cliquer...</p>
                            <button>Voir plus</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default BannerHome;
