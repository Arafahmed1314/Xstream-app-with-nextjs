
import VideoDetails from '@/components/VideoDetails';

export default async function videoDetailsPage({ params: { videoId, lang } }) {
    let check = true;
    return (
        <VideoDetails videoId={videoId} lang={lang} check={check} />
    )
}
