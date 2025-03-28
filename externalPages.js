import { CanvasApi } from "@kth/canvas-api";
import 'dotenv/config';
//import { convert } from "html-to-text"; // Import html-to-text

const canvasApiUrl = process.env.CANVAS_API_URL;
const canvasApiToken = process.env.CANVAS_API_TOKEN;

const canvas = new CanvasApi(canvasApiUrl, canvasApiToken);

// Replace with your actual course ID
const courseId = ...; //Insert the course code here.

const courses = canvas.listItems(`courses/${courseId}/external_tools`);
const pages = [];
const names = [];
let i = 0;

for await (const course of courses) {
  var str = course.name;
  str = str.replace(/\s+/g, "-");
  str = str.toLowerCase();
  str.replace(/\s+/g, "-");
  var url = course.custom_fields.url;
  if (!url.startsWith("https://canvas.kth.se")){
    console.log("Page: " + course.name + " Has no text to extract") // This causes an error if there is no text and we proceed.
  } else{
    pages[i] = course.id;
    names[i] = str;
    i = i + 1;
  }
}

for (let i = 0; i < pages.length; i++){
    const externalPage = await canvas.get(`courses/${courseId}/pages/${names[i]}`);
    console.log("Page Content:", externalPage.body.body);
}
