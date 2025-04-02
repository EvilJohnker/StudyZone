import { CanvasApi } from "@kth/canvas-api";
import 'dotenv/config';

const canvasApiUrl = process.env.CANVAS_API_URL;
const canvasApiToken = process.env.CANVAS_API_TOKEN;

const canvas = new CanvasApi(canvasApiUrl, canvasApiToken);

const courseId = ...;

const params = {
  context_codes: [`course_${courseId}`],  // Required
  start_date: "2024-03-01",  // Optional: Fetch from this date, default is 14 days ago
  end_date: "2024-03-28",    // Optional: Fetch until this date, defaults to 28 days from start date 
  //active_only: true,                    // Optional: Fetch only active announcements, some announcements can be prepared before publishing
                                          //Only teachers can see unactive annoncements, default is true
};

(async () => {
  try {
    // Await the API response and extract JSON
    const response = await canvas.get("announcements", params);
    const announcements = response.json; // ✅ Extract announcements array

    // ✅ Ensure response is an array before looping
    if (Array.isArray(announcements)) {
      for (const announcement of announcements) {
        console.log(announcement);
      }
    } else {
      console.error("Unexpected response format:", announcements);
    }
  } catch (error) {
    console.error("Error fetching announcements:", error);
  }
})();

//const courses = canvas.listItems("courses/53175/quizzes");

/*for await (const course of courses) {
  console.log(course);
} */
