import { addTrackToPlaylist, createPlaylist, fetchProfile, fetchTopTracks } from "./spotify";
import { Track } from "types/dataTypes";

/**
 * Create a playlist with the user's top 50 tracks
 */
export async function createTop50Playlist(token: string): Promise<string> {
    try {
        // 1. Get user profile to get the user ID
        const profile = await fetchProfile(token);
        const userId = profile.id;
        
        console.log(`Creating playlist for user: ${userId}`);
        
        // 2. Fetch top 50 tracks
        const topTracksData = await fetchTopTracks(token);
        const tracks = topTracksData.items;
        
        if (!tracks || tracks.length === 0) {
            throw new Error("No top tracks found");
        }
        
        console.log(`Found ${tracks.length} top tracks`);
        
        // 3. Create the playlist
        const playlist = await createPlaylist(token, userId);
        const playlistId = playlist.id;
        
        console.log(`Created playlist: ${playlist.name} (ID: ${playlistId})`);
        
        // 4. Extract track URIs
        const trackUris = tracks.map((track: Track) => track.uri);
        
        // 5. Add tracks to the playlist
        // Spotify allows up to 100 tracks per request, so 50 is fine
        await addTrackToPlaylist(token, playlistId, trackUris);
        
        console.log(`Added ${trackUris.length} tracks to playlist`);
        
        return playlistId;
        
    } catch (error) {
        console.error("Error creating top 50 playlist:", error);
        throw error;
    }
}