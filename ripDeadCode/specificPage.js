import { CanvasApi } from "@kth/canvas-api";
import 'dotenv/config';
import { convert } from "html-to-text"; // Import html-to-text
const canvasApiUrl = process.env.CANVAS_API_URL;
const canvasApiToken = process.env.CANVAS_API_TOKEN;

const canvas = new CanvasApi(
  canvasApiUrl,
  canvasApiToken
);

const courses = canvas.listItems("courses");

const courseSpecificPage = "..."; // Replace with page...

for await (const course of courses) {
    if (course.id = ...) { //Replace with course id...
      console.log("Course found: " + course.name);
      const courseId = course.id;
  
      // Fetch a single page using `get()`
      const coursePage = await canvas.get("courses/" + courseId + "/pages/" + courseSpecificPage);
  
      // Display the contents of the page
      console.log("Page Title:", coursePage.body.title);
      console.log("Page Body:", convert(coursePage.body.body));
    }
  }
