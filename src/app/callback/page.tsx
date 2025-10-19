"use client"
import { Suspense, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getAccessToken } from "lib/spotify";
import Tag from "../../components/Tag";
import Image from "next/image";
import { getCookie, deleteCookie } from "lib/cookies";
import { useAuth } from "context/AuthContext";


function CallbackContent() {
    const router = useRouter();
    const params = useSearchParams();
    const code = params.get("code");
    const ranRef = useRef(false);
    const { setToken, setClientId } = useAuth();

    useEffect(() => {
        if (!code || ranRef.current) return;
        ranRef.current = true;

        (async () => {
            try {
                const clientId = getCookie("client_id");
                if (!clientId) throw new Error("Client ID is invalid of null.");
                
                const verifier = getCookie("verifier");
                if (!verifier) throw new Error("No verifier found.");

                const token = await getAccessToken(clientId, code, verifier);
                if (!token) throw new Error("No access token returned.")

                setClientId(clientId);
                setToken(token);

                deleteCookie("client_id");
                deleteCookie("verifier");

                setTimeout(() => {
                    router.push("/dashboard");
                }, 600);
            } catch (error) {
                console.error("Error getting Access Token:", error)
            }
        })();
    }, [code, router, setClientId, setToken]);

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

                {/* Authenticating Tag */}
                <Tag>
                    <div className="flex justify-center items-center gap-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                        <span className="ml-2">Authenticating...</span>
                    </div>
                </Tag>
            </main>
            <footer className="flex flex-col justify-center items-center text-center text-xs text-[#7c7c7c]">
                <div>Built with Next.js & Spotify Web API | Not affiliated with Spotify.</div>
                <div>© 2025 Tony Hsu Tai</div>
            </footer>
        </>
    );
}

export default function Callback() {
    return (
        <Suspense fallback={
            <main className="flex flex-col h-screen w-screen justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </main>
        }>
            <CallbackContent />
        </Suspense>
    );
}