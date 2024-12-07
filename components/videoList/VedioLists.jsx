"use client";
import React, { useEffect, useState } from "react";
import StreamCard from "./VideoCard";

export default function VideoLists({ lang }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const importVideos = async () => {
      // Dynamically import the JSON data
      const data = await import("../../public/data/videos.json");
      setVideos(data.default); // `data.default` contains the actual JSON content
    };
    importVideos();
  }, []);
  return (
    <section className="mt-12">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Streams of the day</h2>
        <a
          href="#"
          class="bg-color-gray hover:bg-opacity-80 text-sm px-4 py-2 rounded-full"
        >
          View all
        </a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((data) => (
          <StreamCard key={data.id} data={data} lang={lang} />
        ))}
      </div>
    </section>
  );
}
