"use client"
import { createContext, useContext, useState, useMemo } from "react";

type AuthContextType = {
    clientId: string | null;
    token: string | null;
    setClientId: (id: string | null) => void;
    setToken: (t: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [clientId, setClientId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const value = useMemo(
        () => ({ clientId, token, setClientId, setToken }),
        [clientId, token]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within <AuthProvider>");
    return context;
}
