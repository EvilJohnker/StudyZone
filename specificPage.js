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

const coursePageExternalProject = "..."; // Replace with page...

for await (const course of courses) {
    if (course.name == "...") { //replace with course name, exact.
      console.log("Course found: " + course.name);
      const courseId = course.id;
  
      // Fetch a single page using `get()`
      const coursePage = await canvas.get("courses/" + courseId + "/pages/" + coursePageExternalProject);
  
      // Display the contents of the page
      console.log("Page Title:", coursePage.body.title);
      console.log("Page Body:", convert(coursePage.body.body)); //Convert needs "html-to-text".
    }
  }