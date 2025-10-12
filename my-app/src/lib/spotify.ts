/**
 * It loads the verifier from local storage and using both the code returned from the callback and the
 * verifier to perfrom a POST to the Spotify token API. The API uses two values to verify the request and
 * it returns an access token.
 */
export async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier")
    const redirectUri = `http://127.0.0.1:3000/callback`;

    if (!verifier) {
        console.log("Missing Verifier Error")
        throw new Error("Missing Verifier")
    }

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();

    console.log(`Client Id: ${clientId}`)
    console.log(`Code: ${code}`)
    console.log(`Verifier: ${verifier}`)
    console.log(`Access Token: ${access_token}`)

    return access_token;
}

/**
 * Fetch User Top 5 Artists
 */
export async function fetchTopArtists(token: string) {
    const result = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!result.ok) {
        throw new Error(`Spotify API error: ${result.status} ${result.statusText}`)
    }

    return await result.json()
}

/**
 * Fetch User Top 50 Tracks
 */
export async function fetchTopTracks(token: string) {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!result.ok) {
        throw new Error(`Spotify API error: ${result.status} ${result.statusText}`)
    }

    return await result.json()
}

/**
 * Batch artists for unique IDs
 */
export async function getUniqueArtists(token: string, artistsId: string[]) {
    const batchIds = artistsId.join(",");
    const result = await fetch(`https://api.spotify.com/v1/artists?ids=${batchIds}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!result.ok) {
        throw new Error(`Failed to fetch artists: ${result.statusText}`)
    }

    return await result.json()
}

/**
 * Fetch Most Recent 50 songs
 */
export async function fetchRecentTracks(token: string) {
    const result = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!result.ok) {
        throw new Error(`Spotify API error: ${result.status} ${result.statusText}`)
    }

    const recentData = await result.json()
    return recentData
}

/**
 * Create Top 50 song playlist
 */

/**
 * Add Items to Playlist
 */

/**
 * A call is made using the browser's Fetch API to get the profile data.
 * The authorization header, is set to Bearer TOKEN, where token is the access token
 * that we get from the spotify endpoint
 */
export async function fetchProfile(token: string) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}
