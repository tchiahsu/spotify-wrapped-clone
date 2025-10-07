"use client"
import { useEffect } from "react";
// import { fetchTopArtists} from "lib/spotify";

export default function Rewind() {
  // const [topArtists, setTopArtists] = useState<string[]>([]);
  // const [topTracks, setTopTracks] = useState<string[]>([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const token = sessionStorage.getItem("token");

    //   if (!token) {
    //     throw new Error("Token is null or invalid!")
    //   }

    //   const artistData = await fetchTopArtists(token)
    //   console.log(artistData)
    // }

    // fetchData()
  })


  return (
    <main className="flex flex-col justify-center items-center sm:items-center">
      {/* Page Title */}
      <div className="flex flex-col justify-center items-center">
        <div>Your Year In Music</div>
      </div>

      {/* Top Artists and Tracks */}
      {/* Musical DNA */}
      {/* Discovery Journey */}
      {/* Musical Era */}
      {/* Moments Reel */}      
    </main>
  );
}
