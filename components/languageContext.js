"use client";
import { createContext, useContext, useState } from "react";

// Create the context
const LanguageContext = createContext();

// The provider component that holds the state
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en"); // Default to English

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "bn" : "en"));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook to use the LanguageContext
export const useLanguage = () => {
    const context = useContext(LanguageContext);

    return context;
};
