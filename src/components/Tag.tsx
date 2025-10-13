import React from "react";

type TagProps = {
    children: React.ReactNode;
};

const Tag = ({ children }: TagProps) => {
    return (
        <div
            className="bg-[#1db954] w-1/6 min-w-[14em] max-w-[15em] px-6 py-3 rounded-full font-bold text-black text-center justify-center items-center"
        >
            {children}
        </div>
    )
}

export default Tag;