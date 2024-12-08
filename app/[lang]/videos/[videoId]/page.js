
import VideoDetails from '@/components/VideoDetails';
import videos from '../../../../public/data/videos.json'

import { notFound } from 'next/navigation';
export default async function videoDetailsPage({ params: { videoId, lang } }) {
    let check = true;
    // Search for the video in the videos data
    const video = videos.find((v) => v.videoId === videoId);
    if (!video) {
        notFound();
    }
    return (
        <VideoDetails videoId={videoId} lang={lang} check={check} />
    )
}
