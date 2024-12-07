import Modal from '@/components/Modal'
import VideoDetails from '@/components/VideoDetails'
import React from 'react'

export default function page({ params: { videoId, lang } }) {
    let check = false;
    return (
        <Modal>
            <VideoDetails videoId={videoId} lang={lang} check={check} />
        </Modal>
        // <VideoDetails videoId={videoId} lang={lang} check={check} />
    )
}
