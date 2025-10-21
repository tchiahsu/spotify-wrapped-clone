(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/spotify.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * It loads the verifier from local storage and using both the code returned from the callback and the
 * verifier to perfrom a POST to the Spotify token API. The API uses two values to verify the request and
 * it returns an access token.
 */ __turbopack_context__.s([
    "addTrackToPlaylist",
    ()=>addTrackToPlaylist,
    "createPlaylist",
    ()=>createPlaylist,
    "fetchProfile",
    ()=>fetchProfile,
    "fetchTopArtists",
    ()=>fetchTopArtists,
    "fetchTopTracks",
    ()=>fetchTopTracks,
    "getAccessToken",
    ()=>getAccessToken,
    "getUniqueArtists",
    ()=>getUniqueArtists
]);
async function getAccessToken(clientId, code, verifier) {
    // const redirectUri = `https://tchiahsu.github.io/spotify-wrapped-clone/callback`;
    const redirectUri = "http://127.0.0.1:3000/callback";
    if (!verifier) {
        throw new Error("Missing Verifier");
    }
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifier);
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });
    const { access_token } = await result.json();
    return access_token;
}
async function fetchTopArtists(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5", {
        method: "GET",
        headers: {
            Authorization: "Bearer ".concat(token)
        }
    });
    if (!result.ok) {
        throw new Error("Spotify API error: ".concat(result.status, " ").concat(result.statusText));
    }
    return await result.json();
}
async function fetchTopTracks(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50", {
        method: "GET",
        headers: {
            Authorization: "Bearer ".concat(token)
        }
    });
    if (!result.ok) {
        throw new Error("Spotify API error: ".concat(result.status, " ").concat(result.statusText));
    }
    return await result.json();
}
async function getUniqueArtists(token, artistsId) {
    const batchIds = artistsId.join(",");
    console.log(batchIds);
    const result = await fetch("https://api.spotify.com/v1/artists?ids=".concat(batchIds), {
        headers: {
            Authorization: "Bearer ".concat(token)
        }
    });
    if (!result.ok) {
        throw new Error("Failed to fetch artists: ".concat(result.statusText));
    }
    return await result.json();
}
async function createPlaylist(token, userId) {
    const body = {
        name: "My Wrapped • Top 50",
        description: "Your Top 50 Tracks from Spotify long term data",
        public: false
    };
    const result = await fetch("https://api.spotify.com/v1/users/".concat(userId, "/playlists"), {
        method: "POST",
        headers: {
            Authorization: "Bearer ".concat(token),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if (!result.ok) {
        throw new Error("Failed to create playlist: ".concat(result.statusText));
    }
    return await result.json();
}
async function addTrackToPlaylist(token, playlistId, trackUris) {
    const result = await fetch("https://api.spotify.com/v1/playlists/".concat(playlistId, "/tracks"), {
        method: "POST",
        headers: {
            Authorization: "Bearer ".concat(token),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uris: trackUris
        })
    });
    if (!result.ok) {
        throw new Error("Failed to add tracks: ".concat(result.statusText));
    }
    return result.json();
}
async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
            Authorization: "Bearer ".concat(token)
        }
    });
    return await result.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Tag.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Tag = (param)=>{
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-1/6 min-w-[14em] max-w-[15em] px-6 py-3 rounded-full font-bold text-[#1db954] text-center justify-center items-center",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/Tag.tsx",
        lineNumber: 9,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Tag;
const __TURBOPACK__default__export__ = Tag;
var _c;
__turbopack_context__.k.register(_c, "Tag");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/cookies.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteCookie",
    ()=>deleteCookie,
    "getCookie",
    ()=>getCookie,
    "setCookie",
    ()=>setCookie
]);
function setCookie(name, value, maxAgeSeconds) {
    document.cookie = "".concat(encodeURIComponent(name), "=").concat(encodeURIComponent(value), "; Max-Age=").concat(maxAgeSeconds, "; Path=/; SameSite=Lax; Secure");
}
function getCookie(name) {
    const key = "".concat(encodeURIComponent(name), "=");
    const parts = document.cookie.split("; ");
    const found = parts.find((p)=>p.startsWith(key));
    return found ? decodeURIComponent(found.substring(key.length)) : null;
}
function deleteCookie(name) {
    document.cookie = "".concat(encodeURIComponent(name), "=; Max-Age=0; Path=/; SameSite=Lax; Secure");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/callback/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Callback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spotify$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/spotify.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Tag.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cookies.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function CallbackContent() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const code = params.get("code");
    const ranRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const { setToken, setClientId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    var _process_env_NEXT_PUBLIC_BASE_PATH;
    const prefix = (_process_env_NEXT_PUBLIC_BASE_PATH = ("TURBOPACK compile-time value", "")) !== null && _process_env_NEXT_PUBLIC_BASE_PATH !== void 0 ? _process_env_NEXT_PUBLIC_BASE_PATH : "";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CallbackContent.useEffect": ()=>{
            if (!code || ranRef.current) return;
            ranRef.current = true;
            ({
                "CallbackContent.useEffect": async ()=>{
                    try {
                        const clientId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCookie"])("client_id");
                        if (!clientId) throw new Error("Client ID is invalid of null.");
                        const verifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCookie"])("verifier");
                        if (!verifier) throw new Error("No verifier found.");
                        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spotify$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])(clientId, code, verifier);
                        if (!token) throw new Error("No access token returned.");
                        setClientId(clientId);
                        setToken(token);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteCookie"])("client_id");
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteCookie"])("verifier");
                        setTimeout({
                            "CallbackContent.useEffect": ()=>{
                                router.push("/dashboard");
                            }
                        }["CallbackContent.useEffect"], 600);
                    } catch (error) {
                        console.error("Error getting Access Token:", error);
                    }
                }
            })["CallbackContent.useEffect"]();
        }
    }["CallbackContent.useEffect"], [
        code,
        router,
        setClientId,
        setToken
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex flex-col h-screen w-screen justify-center items-center mt-[-50px] gap-7 sm:items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "".concat(prefix, "/spotify_white.png"),
                        alt: "spotify logo",
                        width: 50,
                        height: 50
                    }, void 0, false, {
                        fileName: "[project]/src/app/callback/page.tsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-6xl font-bold text-center",
                                children: "Authenticating your Account!"
                            }, void 0, false, {
                                fileName: "[project]/src/app/callback/page.tsx",
                                lineNumber: 62,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xl text-center",
                                children: "This will only take a few seconds."
                            }, void 0, false, {
                                fileName: "[project]/src/app/callback/page.tsx",
                                lineNumber: 63,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/callback/page.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "animate-spin rounded-full h-6 w-6 border-b-2 border-black"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/callback/page.tsx",
                                    lineNumber: 69,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ml-2",
                                    children: "Authenticating..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/callback/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/callback/page.tsx",
                            lineNumber: 68,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/callback/page.tsx",
                        lineNumber: 67,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/callback/page.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "flex flex-col justify-center items-center text-center text-xs text-[#7c7c7c]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "Built with Next.js & Spotify Web API | Not affiliated with Spotify."
                    }, void 0, false, {
                        fileName: "[project]/src/app/callback/page.tsx",
                        lineNumber: 75,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "© 2025 Tony Hsu Tai"
                    }, void 0, false, {
                        fileName: "[project]/src/app/callback/page.tsx",
                        lineNumber: 76,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/callback/page.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(CallbackContent, "wHVgIApFj3LynH+EYg22D+kEU10=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = CallbackContent;
function Callback() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex flex-col h-screen w-screen justify-center items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-white"
            }, void 0, false, {
                fileName: "[project]/src/app/callback/page.tsx",
                lineNumber: 86,
                columnNumber: 17
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/src/app/callback/page.tsx",
            lineNumber: 85,
            columnNumber: 13
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CallbackContent, {}, void 0, false, {
            fileName: "[project]/src/app/callback/page.tsx",
            lineNumber: 89,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/callback/page.tsx",
        lineNumber: 84,
        columnNumber: 9
    }, this);
}
_c1 = Callback;
var _c, _c1;
__turbopack_context__.k.register(_c, "CallbackContent");
__turbopack_context__.k.register(_c1, "Callback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_ce48df6e._.js.map