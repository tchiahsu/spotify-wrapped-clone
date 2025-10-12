"use client"
import { useEffect, useState } from "react";
import { fetchTopArtists, fetchTopTracks } from "lib/spotify";
import { Artist, Track } from "types/dataTypes";
import Image from "next/image"

export default function Rewind() {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token is null or invalid!")
      }

      const artistData = await fetchTopArtists(token)
      const artists = artistData.items.map((artist: Artist) => ({
        id: artist.id, name: artist.name, images: artist.images
      }))
      setTopArtists(artists)

      const trackData = await fetchTopTracks(token)
      const tracks = trackData.items.map((track: Track) => ({
        id: track.id, name: track.name, album: track.album, artists: track.artists, images: track.album.images
      }))
      setTopTracks(tracks)
    }

    fetchData()
  }, []);

  return (
    <main className="flex flex-col justify-center items-center sm:items-center">
      {/* Page Title */}
      <div className="flex flex-col justify-center items-center">
        <div>Your Year In Music</div>
      </div>

      {/* Top Artists and Tracks */}
      {topArtists.map((artist: Artist) => (
        <div key={artist.id}>
          <div>{artist.name}</div>
          <Image src={artist.images[0].url} alt={artist.name} width={100} height={100} />
        </div>
      ))}

      {topTracks.map((track: Track) => (
        <div key={track.id}>
          <div className="text-blue-700">{track.name}</div>
          <div className="text-red-700">{track.album.name}</div>
          <div>{track.artists[0].name}</div>
          <Image src={track.images[0].url} alt={track.name} width={100} height={100} />
        </div>
      ))}
    </main>
  );
}
