import { CanvasApi } from "@kth/canvas-api";
import 'dotenv/config';
const canvasApiUrl = process.env.CANVAS_API_URL;
const canvasApiToken = process.env.CANVAS_API_TOKEN;

console.log(canvasApiUrl);
console.log(canvasApiToken);

const canvas = new CanvasApi(
  canvasApiUrl,
  canvasApiToken
);

const courses = canvas.listItems("courses");

for await (const course of courses) {
  console.log(course);
}