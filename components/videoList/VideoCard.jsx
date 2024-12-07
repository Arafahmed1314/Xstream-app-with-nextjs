import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function VideoCard({ data, lang }) {
  return (
    <Link href={`/videos/${data.videoId}`}>
      <div className="rounded-lg overflow-hidden bg-color-gray">
        <Image
          src={data.thumbnail}
          alt="Stream 2"
          height={400}
          width={800}
          className="w-full h-40 object-cover"
        />
        <div className="p-2">
          <p className="font-semibold">
            Resident Evil Remastered Walkthrough Gameplay Part 1
          </p>
          <p className="text-sm text-gray-400">theRadBrad</p>
        </div>
      </div>
    </Link>
  );
}
