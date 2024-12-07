import Image from "next/image";
import videos from "@/public/data/videos.json";
import { getDictionary } from "@/app/[lang]/dictionaris";
import PlayIcon from "./svgicon/PlayIcon";

export default async function VideoDetails({ videoId, lang, check }) {
  const video = videos.find((v) => v.videoId === videoId);

  const dictionary = await getDictionary(lang);
  const { live, subscribe, donate, youMayLike } = dictionary.videoDetails;
  console.log(check);

  return (
    <main
      className={`flex flex-col ${
        !check && "justify-center items-center pb-5"
      } lg:flex-row gap-6`}
    >
      <div className="lg:w-3/4">
        <div className="relative">
          <iframe
            src="https://www.youtube.com/embed/hecODa5ZgZM"
            title="YouTube video player"
            frameborder="0"
            className="w-full aspect-video h-[500px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center space-x-4">
              <button className="bg-color-gray hover:bg-opacity-80 rounded-full p-2">
                <PlayIcon />
              </button>
              <div className="bg-color-purple text-white px-2 py-1 rounded text-sm">
                {live}
              </div>
              <span className="text-sm">46:02</span>
              <button className="bg-color-purple hover:bg-opacity-80 text-white px-4 py-1 rounded-full text-sm">
                {donate}
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
        <div className="flex items-center space-x-4 mt-2">
          {/* <!-- যেহেতু videos.json এ কোনো Avatar দেয়া নাই, সেহেতু আপনি যেকোনো র‍্যান্ডম Avatar ব্যবহার করতে পারবেন --> */}
          <Image
            height={400}
            width={800}
            src="/assets/avatar.png"
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{video.channelTitle}</p>
          </div>
          <button className="bg-color-purple hover:bg-opacity-80 text-white px-4 py-1 rounded-full text-sm ml-auto">
            {subscribe}
          </button>
        </div>
      </div>
      {check && (
        <div className="lg:w-1/4">
          <h2 className="text-xl font-semibold mb-4">{youMayLike}</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Image
                height={100}
                width={100}
                src="https://i.ytimg.com/vi/9kjwMTj8ZD0/hqdefault.jpg"
                alt="Fallout Shelter PC Thumbnail"
                className="w-30 h-20 rounded object-cover"
              />
              <div>
                <h3 className="font-semibold">Fallout Shelter PC - Ep. 1</h3>
                <p className="text-sm text-gray-400">Blitz</p>
                <p className="text-sm text-gray-400">26,389M</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <Image
                height={100}
                width={100}
                src="https://i.ytimg.com/vi/Ij7FWQJR0e8/hqdefault.jpg"
                alt="Resident Evil Remastered Thumbnail"
                class="w-30 h-20 rounded object-cover"
              />
              <div>
                <h3 class="font-semibold">
                  Resident Evil Remastered Walkthrough
                </h3>
                <p class="text-sm text-gray-400">theRadBrad</p>
                <p class="text-sm text-gray-400">16,426M View now</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <Image
                height={100}
                width={100}
                src="https://i.ytimg.com/vi/F8BactAXOH4/hqdefault.jpg"
                alt="Open World Games Thumbnail"
                class="w-30 h-20 rounded object-cover"
              />
              <div>
                <h3 class="font-semibold">Top 10 BIGGEST OPEN WORLD Games</h3>
                <p class="text-sm text-gray-400">Lazy Assassin</p>
                <p class="text-sm text-gray-400">7,694M View now</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
