'use client'

import { usePathname } from "next/navigation";

export default function NotFound() {
    const pathname = usePathname();
    console.log(pathname);
    const videoId = pathname.split('/').pop();
    return (

        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-lg text-center mb-6">
                This video with <span className="text-blue-500 font-semibold">{videoId}</span> id was not found!
            </p>
            <a
                href="/"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Go Back to Home
            </a>
        </div>
    );
}
