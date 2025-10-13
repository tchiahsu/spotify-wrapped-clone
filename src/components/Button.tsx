import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="bg-[#1db954] w-1/6 min-w-[14em] max-w-[15em] px-6 py-3 rounded-full font-bold text-black hover:bg-[#1ed760] hover:scale-105 transition-opacity duration-75 active:scale-100 active:bg-[#1db954] active:opacity-95"
        >
            {children}
        </button>
    )
}

export default Button;