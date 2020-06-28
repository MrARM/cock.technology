import React, { useState, useEffect } from 'react';
import logo from './chicken.png';
import './App.css';

function App() {
    const [ classes, setClasses ] = useState('App-logo');

    const useAudio = url => {
        const [audio] = useState(new Audio(url));
        const [playing, setPlaying] = useState(false);

        const toggle = () => setPlaying(!playing);

        useEffect(() => {
                playing ? audio.play() : audio.pause();
            },
            [playing]
        );

        useEffect(() => {
            audio.addEventListener('ended', () => {
                setPlaying(false);
                setClasses('App-logo');
            });
            return () => {
                audio.removeEventListener('ended', () => setPlaying(false));
            };
        }, []);

        return [playing, toggle];
    };

    const [playing, toggle] = useAudio(require('./vibrate.mp3'));


    return (
        <div className="App">
            <header className="App-header" onClick={() => {
                setClasses('App-logo App-logo-shake');
                toggle();
            }}>
                <img src={logo} className={classes} alt="logo" />
                <p>
                    Click me
                </p>
            </header>
        </div>
    );
}

export default App;
