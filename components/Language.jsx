"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Language() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Bangla");

  // On component mount, retrieve the saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en"; // Default to "en" if nothing is saved
    setSelectedLanguage(savedLanguage === "en" ? "English" : "Bangla");
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (language) => {
    const newLocale = language === "en" ? "bn" : "en"; // Determine the new locale
    localStorage.setItem("language", language); // Store the language in localStorage

    // Get the current path
    const currentPath = window.location.pathname;

    // If the path already has a language prefix, replace it; otherwise, prepend it
    const newPath =
      currentPath.startsWith("/en") || currentPath.startsWith("/bn")
        ? currentPath.replace(/^\/(en|bn)/, `/${newLocale}`)
        : `/${newLocale}${currentPath}`;

    // Update the URL to reflect the language change
    router.push(newPath);
    setSelectedLanguage(language === "en" ? "English" : "Bangla"); // Update the UI with the selected language
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative">
      {/* Button to toggle dropdown */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-gray-800 p-2 rounded-md shadow hover:bg-gray-900"
      >
        <span className="text-sm font-medium">{selectedLanguage}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute right-0 top-full mt-2 w-40 rounded-md bg-gray-800 p-2 z-10 shadow-lg">
          <li
            onClick={() => handleSelection("bn")} // Handle Bangla selection
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-900"
          >
            <span className="text-sm font-medium">Bangla</span>
          </li>
          <li
            onClick={() => handleSelection("en")} // Handle English selection
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-900"
          >
            <span className="text-sm font-medium">English</span>
          </li>
        </ul>
      )}
    </div>
  );
}
