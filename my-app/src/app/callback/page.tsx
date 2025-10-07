"use client"
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getAccessToken } from "lib/spotify";
import Button from "../../components/Button";
import Image from "next/image";

export default function Callback() {
    const router = useRouter();
    const params = useSearchParams();
    const code = params.get("code");

    useEffect(() => {
        const getToken = async () => {
            try {
                const clientId = sessionStorage.getItem("clientId")
                console.log(clientId)
                if (!clientId) {
                    throw new Error("Client ID is Invalid or Null")
                }

                if (!code) {
                    throw new Error("Code is Invalid or Null")
                }

                const token = await getAccessToken(clientId, code)
                sessionStorage.setItem("token", token);
            } catch (error) {
                console.error("Error getting Access Token: ", error)
                return null
            }
        };
        
        /** Waits until getToken() gets resolved before proceedings */
        getToken().then(() => {
            setTimeout(() => {
                router.push("http://127.0.0.1:3000/dashboard")
            }, 1000)
        })
    });

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
                <div className="text-6xl font-bold text-center">Authenticating your Account!</div>
                <div className="text-xl text-center">This will only take a few seconds.</div>
                </div>

                {/* Log In Button */}
                <Button>
                    <div className="flex justify-center items-center gap-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                        <span className="ml-2">Authenticating...</span>
                    </div>
                </Button>
            </main>
            <footer className="flex flex-col justify-center items-center text-center text-xs text-[#7c7c7c]">
                <div>Built with Next.js & Spotify Web API | Not affiliated with Spotify.</div>
                <div>© 2025 Tony Hsu Tai</div>
            </footer>
        </>
    );
}