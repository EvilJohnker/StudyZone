import { CanvasApi } from "@kth/canvas-api";
import 'dotenv/config';

const canvasApiUrl = process.env.CANVAS_API_URL;
const canvasApiToken = process.env.CANVAS_API_TOKEN;

const canvas = new CanvasApi(canvasApiUrl, canvasApiToken);

// Replace with your actual course ID
const courseId = ...;

const courses = canvas.listItems(`courses/${courseId}/files`);

const keywordRegex = /exam|tenta|tentor/i; // Case-insensitive regex

for await (const course of courses) {
  if (
    course["content-type"] === "application/pdf" || 
    course["mime_class"] === "pdf"
  ) {
    if (keywordRegex.test(course.display_name) || keywordRegex.test(course.filename)) {
      console.log(course);
    }
  }
}

for await (const course of courses) {
  console.log(course);
}
