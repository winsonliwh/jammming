import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

import { useState } from 'react';

const App = () => {
    const [searchedTracks, setSearchedTracks] = useState([]);

    const [playlistName, setPlaylistName] = useState('New Playlist');

    const [playlistTracks, setPlaylistTracks] = useState([]);

    const addTrack = track => {
        if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        } else {
            setPlaylistTracks(prev => [track, ...prev])
        }
    }

    const removeTrack = track => {
        setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id))
    }

    const updatePlaylistName = name => {
        setPlaylistName(name)
    }

    const savePlaylist = () => {
        const trackURIs = playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(playlistName, trackURIs);
            setPlaylistName('New Playlist');
            setPlaylistTracks([]);
    }

    const search = async (term) => {
        const search = await Spotify.search(term);
        setSearchedTracks(search);
    }

    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing11
        </h1>
        <div className="App">
          <SearchBar onSearch={search} />
          <div className="App-playlist">
            <SearchResults searchedTracks={searchedTracks} onAdd={addTrack} />
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
            />
          </div>
        </div>
      </div>
    );
}

export default App;