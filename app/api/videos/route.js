import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request) {
    const filePath = path.join(process.cwd(), 'public', 'data', 'videos.json');
    try {
        // Read the JSON file
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContents);
        // Return the data as JSON response
        return Response.json(data);
    } catch (error) {
        // Handle errors gracefully
        return Response.json({ error: 'Unable to fetch data' }, { status: 500 });
    }
}
