import {useEffect, useState} from "react";

export function useTheme() {
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;

        const savedTheme = localStorage.getItem('pwa-theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('pwa-theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('pwa-theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    return {isDark, toggleTheme};
}