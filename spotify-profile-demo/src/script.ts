const clientId = "c6b35cbf9fae4e6c82677484b1f0d84b";
const params = new URLSearchParams(window.location.search);
// const code = params.get("code");
const code = "AQBoBFLNziCGUpXKrzQj-G7j-3Kr7TYt2_UIlY0HQOtzYYLeVrZJUbQRPkJfOo8ZjLqMZ1qxHKdDTDz_SMEhxYEFXHMP2nKvdB0kK9E5hsIMLx3oSQVjqWUJsB7bDyGtmPBDySPPXrfvdaI8mPU6ol7Xae53NegbBRR70nI8rmqa5IuJtub5KH4iPC2H29QI07Ao-rBJKxXXbcbvqk_Nrl-qVTyIUhns9zVi_Vabp4VeWdgDrhalQjO8Sistbmcfu9Gv5zOJz_rh71KnCxGWsFAALJcUAezm6g"

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    console.log(accessToken);
    const profile = await fetchProfile(accessToken);
    populateUI(profile);
}

export async function redirectToAuthCodeFlow(clientId: string) {
    /**
     * A new URLSearchParams object is created. It adds the client_id, response_type, redirect_uri and scope
     * parameters to it. The redirect_uri parameter is the URL that Spotify will redirect the user back to 
     * after they've authorized the application.
     */
    const verifier = generateCodeVerifier(128)
    const challenge = await generateCodeChallenge(verifier)

    localStorage.setItem("verifier", verifier)

    const params = new URLSearchParams
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://127.0.0.1:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge)

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
    let text = "";
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(clientId: string, code: string): Promise<string> {
    /**
     * It loads the verifier from local storage and using both the code returned from the callback and the
     * verifier to perfrom a POST to the Spotify token API. The API uses two values to verify the request and
     * it returns an access token.
     */
    const verifier = localStorage.getItem("verifier")

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

async function fetchProfile(token: string): Promise<any> {
    /**
     * A call is made using the browser's Fetch API to get the profile data.
     * The authorization header, is set to Bearer TOKEN, where token is the access token
     * that we get from the spotify endpoint
     */
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}`}
    });

    return await result.json();
}

function populateUI(profile: any) {
    document.getElementById("displayName")!.innerText = profile.displayName;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar")!.appendChild(profileImage);
    }
    document.getElementById("id")!.innerText = profile.id;
    document.getElementById("email")!.innerText = profile.email;
    document.getElementById("uri")!.innerText = profile.uri;
    document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url")!.innerText = profile.url;
    document.getElementById("url")!.setAttribute("href", profile.href);
    document.getElementById("imgUrl")!.innerText = profile.images[0]?.url ?? "(no profile images)";
}