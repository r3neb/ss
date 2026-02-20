import React, { useState, useEffect } from 'react';
import { SpotifyIcon } from './Icons';

const juiceWRLDPlaylist = [
    {
        song: 'Lucid Dreams',
        artist: 'Juice WRLD',
        album_art: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: 239000
    },
    {
        song: 'All Girls Are The Same',
        artist: 'Juice WRLD',
        album_art: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: 165000
    },
    {
        song: 'Robbery',
        artist: 'Juice WRLD',
        album_art: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: 240000
    }
];

const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const SpotifyCard = ({ spotify }) => {
    const [simulatedIndex, setSimulatedIndex] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());

    useEffect(() => {
        if (spotify) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const currentElapsed = now - startTime;
            const currentSong = juiceWRLDPlaylist[simulatedIndex];

            if (currentElapsed >= currentSong.duration) {
                setSimulatedIndex((prev) => (prev + 1) % juiceWRLDPlaylist.length);
                setStartTime(Date.now());
                setElapsed(0);
            } else {
                setElapsed(currentElapsed);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [spotify, simulatedIndex, startTime]);

    // If real spotify data exists
    if (spotify) {
        const totalDuration = spotify.timestamps.end - spotify.timestamps.start;
        const currentProgress = Date.now() - spotify.timestamps.start;
        const progressPercent = Math.min((currentProgress / totalDuration) * 100, 100);

        return (
            <div className="spotify-card">
                <div className="spotify-header">
                    <SpotifyIcon />
                    <span>Listening to Spotify</span>
                </div>
                <div className="spotify-content">
                    <div className="album-art">
                        <img src={spotify.album_art_url} alt="Album Art" />
                    </div>
                    <div className="song-info">
                        <h4 className="song-title">{spotify.song}</h4>
                        <p className="artist-name">{spotify.artist}</p>
                        <div className="playback-controls">
                            <svg className="pause-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                        </div>
                        <div className="time-info">
                            <span className="current-time">{formatTime(currentProgress)}</span>
                            <span className="total-time">{formatTime(totalDuration)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Simulated playback
    const currentSong = juiceWRLDPlaylist[simulatedIndex];
    const progressPercent = (elapsed / currentSong.duration) * 100;

    return (
        <div className="spotify-card">
            <div className="spotify-header">
                <SpotifyIcon />
                <span>Featured Playlist</span>
            </div>
            <div className="spotify-content">
                <div className="album-art">
                    <img src={currentSong.album_art} alt="Album Art" />
                </div>
                <div className="song-info">
                    <h4 className="song-title">{currentSong.song}</h4>
                    <p className="artist-name">{currentSong.artist}</p>
                    <div className="playback-controls">
                        <svg className="pause-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                    </div>
                    <div className="time-info">
                        <span className="current-time">{formatTime(elapsed)}</span>
                        <span className="total-time">{formatTime(currentSong.duration)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpotifyCard;
