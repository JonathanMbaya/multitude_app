import React from 'react';
import './OneArticle.css';

function OneArticle() {
    return (
        <main className='singlePage'>
            {/* Colonne principale : Article */}
            <div className='part-one-article'>
                <h1>Titre de l'article</h1>

                <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>

                <img 
                    src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop" 
                    alt="image-multitude article" 
                />

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Consequatur rem voluptates pariatur, enim mollitia nostrum, 
                    dolore deleniti esse soluta unde tempora quidem assumenda, 
                    libero repellat quae commodi consequuntur eum nemo.
                </p>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Consequatur rem voluptates pariatur, enim mollitia nostrum, 
                    dolore deleniti esse soluta unde tempora quidem assumenda, 
                    libero repellat quae commodi consequuntur eum nemo.
                </p>
            </div>

            {/* Colonne latérale : Suggestions */}
            <aside className='part-suggestion'>
                <h2>Suggestions</h2>

                {[1, 2, 3].map((_, index) => (
                    <div className='post-suggestion' key={index}>
                        <img 
                            src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop" 
                            alt="suggestion article" 
                        />

                        <div className='post-text'>
                            <p><span>Musique</span></p>
                            <h3>Titre de l'article</h3>
                        </div>
                    </div>
                ))}
            </aside>
        </main>
    );
}

export default OneArticle;
