"use client"
import { generateCodeVerifier, generateCodeChallenge } from "lib/pkce";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Image from "next/image";

export default function Home() {
  const clientId = "c6b35cbf9fae4e6c82677484b1f0d84b";
  const params = new URLSearchParams();
  const router = useRouter();

  /**
   * A new URLSearchParams object is created. It adds the client_id, response_type, redirect_uri and scope
   * parameters to it. The redirect_uri parameter is the URL that Spotify will redirect the user back to 
   * after they've authorized the application.
   */
  const handleLogIn = async () => {
      const verifier = generateCodeVerifier(128)
      const challenge = await generateCodeChallenge(verifier)
      const redirectUri = `http://127.0.0.1:3000/callback`;

      localStorage.setItem("verifier", verifier)
      localStorage.setItem("clientId", clientId)

      params.append("client_id", clientId);
      params.append("response_type", "code");
      params.append("redirect_uri", redirectUri);
      params.append("scope", "user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private");
      params.append("code_challenge_method", "S256");
      params.append("code_challenge", challenge)

      router.push(`https://accounts.spotify.com/authorize?${params.toString()}`)
  };

  return (
    <>
      <main className="flex flex-col h-screen w-screen justify-center items-center mt-[-50px] gap-7 sm:items-center">
        {/* Spotify Logo */}
        <Image
          src="/spotify_white.png"
          alt="spotify logo"
          width={50}
          height={50}
        />

        {/* Intro Title */}
        <div className="flex flex-col gap-2 items-center">
          <div className="text-6xl font-bold text-center">Your Year in Music Awaits!</div>
          <div className="text-xl text-center">Log in to relive the songs, artists, and moments that defined your year.</div>
        </div>

        {/* Log In Button */}
        <Button onClick={handleLogIn}>Log In</Button>
      </main>
      <footer className="flex flex-col justify-center items-center text-center text-xs text-[#7c7c7c]">
        <div>Built with Next.js & Spotify Web API | Not affiliated with Spotify.</div>
        <div>© 2025 Tony Hsu Tai</div>
      </footer>
    </>
  );
}
