/**
 * It loads the verifier from local storage and using both the code returned from the callback and the
 * verifier to perfrom a POST to the Spotify token API. The API uses two values to verify the request and
 * it returns an access token.
 */
export async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = sessionStorage.getItem("verifier")

    if (!verifier) {
        console.log("Missing Verifier Error")
        throw new Error("Missing Verifier")
    }

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://127.0.0.1:5173/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    if (!result.ok) {
        console.log(result.statusText)
        console.log(await result.text())
    }

    const { access_token } = await result.json();
    return access_token;
}

/**
 * A call is made using the browser's Fetch API to get the profile data.
 * The authorization header, is set to Bearer TOKEN, where token is the access token
 * that we get from the spotify endpoint
 */
export async function fetchProfile(token: string): Promise<string> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}`}
    });

    return await result.json();
}
