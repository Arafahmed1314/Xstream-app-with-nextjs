import Hero from "@/components/Hero";
// import { LanguageProvider } from "@/components/languageContext";
import VideoLists from "@/components/videoList/VedioLists";


export default function Home({ params }) {
  const { lang } = params;
  return (
    <>

      <Hero />
      <VideoLists lang={lang} />


    </>
  );
}
