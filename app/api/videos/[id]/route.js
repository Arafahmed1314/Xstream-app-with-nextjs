import path from 'path';
import { promises as fs } from 'fs';

const filePath = path.join(process.cwd(), 'public', 'data', 'videos.json');

async function readData() {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents);
}

async function writeData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function GET(_request, { params }) {
    const { id } = params;

    try {
        const data = await readData();
        const video = data.find((item) => item.videoId === id);

        if (video) {
            return Response.json(video);
        }

        return Response.json({ error: 'Video not found' }, { status: 404 });
    } catch (error) {
        return Response.json({ error: 'Unable to fetch video data' }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    const { id } = params;

    try {
        const requestBody = await request.json();
        const { title, description } = requestBody;

        if (!title && !description) {
            return Response.json(
                { error: 'Only "title" and "description" fields can be updated.' },
                { status: 400 }
            );
        }

        const data = await readData();
        const videoIndex = data.findIndex((item) => item.videoId === id);

        if (videoIndex === -1) {
            return Response.json({ error: 'Video not found' }, { status: 404 });
        }

        if (title) data[videoIndex].title = title;
        if (description) data[videoIndex].description = description;

        await writeData(data);

        return Response.json(data[videoIndex]);
    } catch (error) {
        return Response.json({ error: 'Unable to update video data' }, { status: 500 });
    }
}

export async function DELETE(_request, { params }) {
    const { id } = params;

    try {
        const data = await readData();
        const videoIndex = data.findIndex((item) => item.videoId === id);

        if (videoIndex === -1) {
            return Response.json({ error: 'Video not found' }, { status: 404 });
        }

        const deletedVideo = data.splice(videoIndex, 1);
        // await writeData(data);

        return Response.json({ message: 'Video deleted successfully', deletedVideo: deletedVideo[0] });
    } catch (error) {
        return Response.json({ error: 'Unable to delete video' }, { status: 500 });
    }
}
