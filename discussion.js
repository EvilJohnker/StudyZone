import { CanvasApi } from "@kth/canvas-api";
import 'dotenv/config';

const canvasApiUrl = process.env.CANVAS_API_URL;
const canvasApiToken = process.env.CANVAS_API_TOKEN;

const canvas = new CanvasApi(canvasApiUrl, canvasApiToken);

// Replace with your actual course ID
const courseId = ...;

const courses = canvas.listItems(`courses/${courseId}/discussion_topics`);

for await (const course of courses) {
  console.log(course);
}