import axios from "axios";

import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "@env";

export async function getSpotifyToken() {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        Authorization: `Basic ${btoa(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        )}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
}

export async function getSongDetails(songTitle, artist) {
  const token = await getSpotifyToken();

  const response = await axios.get(`https://api.spotify.com/v1/search`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: `${songTitle} ${artist}`,
      type: "track",
      limit: 1,
    },
  });

  const track = response.data.tracks.items[0];

  if (!track) return null;

  return {
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    cover: track.album.images[0]?.url || "",
    previewUrl: track.preview_url || "",
    spotifyUrl: track.external_urls.spotify,
  };
}
