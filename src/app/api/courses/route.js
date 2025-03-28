import { CanvasApi } from "@kth/canvas-api";

export async function GET(req) {
    const canvasApiUrl = process.env.CANVAS_API_URL;
    const canvasApiToken = process.env.CANVAS_API_TOKEN;
    const canvas = new CanvasApi(canvasApiUrl, canvasApiToken);

    try {
        const url = new URL(req.url);
        const  code = url.searchParams.get("code");

        const { json } = await canvas.get("courses");
        const course = json.find((course) => course.name.includes(code));
        
        if (course) {
            const modules = await canvas.get(`courses/${course.id}/modules`);
            return new Response(JSON.stringify(modules.json), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: "Course not found" }), { status: 404 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}