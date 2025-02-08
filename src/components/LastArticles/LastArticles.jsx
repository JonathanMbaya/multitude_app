import React from 'react';
import './LastArticles.css';

function LastArticles() {
    return (
        <div className='latest'>
            <hr />
            <h2>Les derniers articles</h2>

            <div className='post-article-home'>

                <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop" alt="" />


                <div className='post-text-home'>

                    <p><span>Musique</span></p>

                    <h2>Titre de l'article</h2>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Iusto dolorum incidunt quod sint quaerat accusamus impedit 
                        explicabo doloremque iure numquam facere, ullam aspernatur 
                        libero porro. Harum beatae quasi facilis quae!
                    </p>

                    <p><span>3 mins de lecture</span></p>
                    <p><span> 01 Janvier 2024 </span></p>
                </div>

            </div>

            <button className='btn-more-home'>
                Afficher plus 
            </button>


            <hr />
        </div>
    )
}


export default LastArticles
