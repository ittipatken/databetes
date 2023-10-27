"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
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
                {theme === "dark" ? (
                    <MoonIcon />
                ) : (
                    <SunIcon />
                )}
            </button>
        </>
    )
}
