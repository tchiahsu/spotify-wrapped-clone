"use client"
import { useEffect, useState } from "react";
import { fetchTopArtists, fetchTopTracks, getUniqueArtists } from "lib/spotify";
import { Artist, Track } from "types/dataTypes";
import { toTitleCase } from "lib/util";
import { BsDot } from "react-icons/bs";
import Image from "next/image"
import Tag from "components/Tag";

export default function Rewind() {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topGenres, setTopGenres] = useState<string[]>([]);
  const [songPerGenre, setSongPerGenre] = useState<Record<string, Track[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token is null or invalid!")
      }

      // Get Top Artists
      const artistData = await fetchTopArtists(token)
      const artists = artistData.items.map((artist: Artist) => ({
        id: artist.id, name: artist.name, images: artist.images
      }))
      setTopArtists(artists)

      // Get Top Tracks
      const trackData = await fetchTopTracks(token)
      const tracks = trackData.items.map((track: Track) => ({
        id: track.id, name: track.name, album: track.album, artists: track.artists, images: track.album.images
      }))
      setTopTracks(tracks)

      // Get Unique Artists
      const artistId = tracks.map((track: Track) => track.artists[0].id)
      const uniqueIdSet: Set<string> = new Set(artistId)
      const uniqueIdArray = [...uniqueIdSet]

      // Get Top Genres
      const uniqueArtist = await getUniqueArtists(token, uniqueIdArray)
      const artistGenres = new Map<string, string[]>();
      for (const artist of uniqueArtist.artists as Artist[]) {
        artistGenres.set(artist.id, artist.genres ?? [])
      }

      const genreCount: Record<string, number> = {};
      for (const track of tracks as Track[]) {
        const genreSet = new Set<string>();
        for (const artist of track.artists) {
          const gs = artistGenres.get(artist.id) ?? [];
          gs.forEach(genre => genreSet.add(genre));
        }

        genreSet.forEach(genre => {
          genreCount[genre] = (genreCount[genre] ?? 0) + 1;
        });
      }

      const top3Genres = Object.entries(genreCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([g]) => g)
      setTopGenres(top3Genres)

      const perGenre: Record<string, Track[]> = {};
      for (const g of top3Genres) {
        const list = (tracks as Track[]).filter(t => {
          const gset = new Set<string>();
          for (const art of t.artists) {
            const gs = artistGenres.get(art.id) ?? [];
            gs.forEach(x => gset.add(x));
          }
          return gset.has(g);
        }).slice(0, 5);

        perGenre[g] = list;
      }

      setSongPerGenre(perGenre);
    }

    fetchData()
  }, []);

  return (
    <main className="flex flex-col gap-5 justify-center items-center">

      {/* Page Title */}
      <div className="flex flex-col gap-3 h-[50vh] justify-center items-center">
        <div className="text-6xl font-bold mt-3">Your Year In Music</div>
        <div className="text-[#B3B3B3]">A journey through your Top 50 songs over the last few months</div>
        <Tag>Your Spotify Wrapped</Tag>
      </div>

      {/* Top Artists and Tracks */}
      <div className="flex flex-col w-5xl">
        {/* Title and Subheading */}
        <div className="text-3xl font-bold">Your Top Artists and Tracks</div>
        <div className="text-[#B3B3B3]">The sound that defines you</div>
        <div className="grid grid-cols-2 gap-7 my-10">
          {/* Top Artists */}
          <div className="flex flex-col gap-5">
            {topArtists.map((artist: Artist, index: number) => (
              <div key={artist.id} className="grid grid-cols-[32px_64px_1fr] gap-2 items-center bg-[#535353] rounded-lg p-2">
                <div className="flex justify-center items-center text-3xl">{index + 1}</div>
                <div className="w-[64px] h-[64px] overflow-hidden rounded-lg">
                  <Image src={artist.images[0].url} alt={artist.name} width={64} height={64}/>
                </div>
                <div className="text-lg font-bold mx-3">{artist.name}</div>
              </div>
            ))}
          </div>
          {/* Top Tracks */}
          <div className="flex flex-col gap-5 w-full">
            {topTracks.slice(0, 5).map((track: Track, index: number) => (
              <div key={track.id} className="grid grid-cols-[32px_64px_1fr] gap-2 items-center bg-[#535353] rounded-lg p-2">
                <div className="flex justify-center items-center text-3xl">{index + 1}</div>                
                <div className="w-[64px] h-[64px] overflow-hidden rounded-lg">
                  <Image src={track.images[0].url} alt={track.name} width={64} height={64} />
                </div>
                <div className="grid grid-cols-1 mx-3">
                  <div className="text-lg font-bold text-nowrap overflow-hidden">{track.name}</div>
                    <div className="flex justify-start items-center text-xs text-nowrap overflow-hidden">
                      {track.artists[0].name}
                      <BsDot />
                      {track.album.name}
                    </div>
                </div> 
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Genres and Top 5 Songs per Genre */}
      <div className="flex flex-col w-5xl mt-10">
        {/* Title and Subheading */}
        <div className="text-3xl font-bold">Your Top 3 Genres</div>
        <div className="text-[#B3B3B3]">Your taste across genres</div>

        {/* Top Genre Panels */}
        <div className="grid grid-cols-3 my-10 gap-10">
          {topGenres.map((g) => (
            <div key={g} className="flex flex-col bg-[#535353] rounded-lg px-3 py-5">
                <div className="flex justify-center items-center text-center text-2xl font-bold m-3">{toTitleCase(g)}</div>
                <div className="grid grid-cols-1 gap-y-2">
                  {songPerGenre[g].slice(0,3).map((t) => (
                    <div key={t.id} className="flex flex-row items-center p-2">
                      <div className="w-[64px] h-[64px] overflow-hidden rounded-lg">
                        <Image src={t.images[0].url} alt={t.name} width={64} height={64} />
                      </div>
                      <div className="p-2 font-bold">{toTitleCase(t.name)}</div>
                    </div>
                  ))}
                </div>
              </div>
          ))}
        </div>
      </div>

    </main>
  );
}
