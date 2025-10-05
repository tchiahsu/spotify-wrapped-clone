import { generateCodeVerifier, generateCodeChallenge } from "lib/pkce";
import { getAccessToken, fetchProfile } from "lib/spotify";

export async function callback() {
    const clientId = "c6b35cbf9fae4e6c82677484b1f0d84b";
    // const params = new URLSearchParams(window.location.search);
    // const code = params.get("code");
    const code = "AQBoBFLNziCGUpXKrzQj-G7j-3Kr7TYt2_UIlY0HQOtzYYLeVrZJUbQRPkJfOo8ZjLqMZ1qxHKdDTDz_SMEhxYEFXHMP2nKvdB0kK9E5hsIMLx3oSQVjqWUJsB7bDyGtmPBDySPPXrfvdaI8mPU6ol7Xae53NegbBRR70nI8rmqa5IuJtub5KH4iPC2H29QI07Ao-rBJKxXXbcbvqk_Nrl-qVTyIUhns9zVi_Vabp4VeWdgDrhalQjO8Sistbmcfu9Gv5zOJz_rh71KnCxGWsFAALJcUAezm6g"

    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        const accessToken = await getAccessToken(clientId, code);
        console.log(accessToken);
        const profile = await fetchProfile(accessToken);
        console.log(profile)
    }
}

/**
 * A new URLSearchParams object is created. It adds the client_id, response_type, redirect_uri and scope
 * parameters to it. The redirect_uri parameter is the URL that Spotify will redirect the user back to 
 * after they've authorized the application.
 */
export async function redirectToAuthCodeFlow(clientId: string) {

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