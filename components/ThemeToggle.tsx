"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

export default function ThemeToggle() {
    const [theme, setTheme] = useState('pastel');
    const toggleTheme = () => {
        setTheme(theme === 'dracula' ? 'pastel' : 'dracula');
    };
    useEffect(() => {
        const htmlElement = document.querySelector('html');
        if (htmlElement) {
            htmlElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    return (
        <>
            <button className="btn btn-circle p-2" onClick={toggleTheme}>
                {theme === "dracula" ? (
                    <MoonIcon />
                ) : (
                    <SunIcon />
                )}
            </button>
        </>
    )
}
