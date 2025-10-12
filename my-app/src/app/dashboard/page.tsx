"use client"
import { useEffect, useState } from "react";
import { fetchTopArtists} from "lib/spotify";
import { Artist } from "types/spotify";
import Image from "next/image"

export default function Rewind() {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token is null or invalid!")
      }

      const artistData = await fetchTopArtists(token)
      const artists = artistData.items.map((artist: Artist) => ({ id: artist.id, name: artist.name, images: artist.images }))
      setTopArtists(artists)
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

      {/* Musical DNA */}
      <div>

      </div>

      {/* Discovery Journey */}
      <div>

      </div>

      {/* Musical Era */}
      <div>

      </div>

      {/* Moments Reel */}   
      <div>

      </div>
    </main>
  );
}
