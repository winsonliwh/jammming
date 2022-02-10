
//const clientId = 'fb7d40f7652e4d2e957e1eaba5b4aaa9'; // Insert client ID here.
const clientId = '613bf0d51dae4a17bfb6568491aad709';
//const redirectUri = 'http://localhost:3000/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
//const redirectUri = 'https://winsonliwh.github.io/jammming/';
const redirectUri = 'http://localhost:3000/';
let accessToken;

// Henry ID and his redirectUri
//const cliendId = 'f30a6f538f754ab39de16ca6262fd1fa';
//const redirectUri = 'https://yuen-yu-wing.github.io/jammming/';

const Spotify = {
  getAccessToken() {
      if (accessToken) {
          return accessToken;
      }
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

      if (accessTokenMatch && expiresInMatch) {
          accessToken = accessTokenMatch[1];
          const expiresIn = Number(expiresInMatch[1]);

          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
          return accessToken;
      } else {
          const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
          window.location = accessUrl;
      }
  },

  async search(term) {
      const accessToken = Spotify.getAccessToken();
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      }).then(response => {
          return response.json();
      }).then(jsonResponse => {
          if (!jsonResponse.tracks) {
              return [];
          }
          return jsonResponse.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
          })) 
      }) 
  },

  savePlaylist(name, trackUris) {
      if (!name || !trackUris.length) {
          return;
      }

      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}`};
      let userId;

      return fetch('https://api.spotify.com/v1/me', {headers: headers}
      ).then(response => response.json()
      ).then(jsonResponse => {
          userId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
          {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({ name: name})
          }).then(response => response.json()
          ).then(jsonResponse => {
              const playlistId = jsonResponse.id;
              return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                  headers: headers,
                  method: 'POST',
                  body: JSON.stringify({ uris: trackUris})
              })
          })
      })
  }
};

export default Spotify;