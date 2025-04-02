import { CanvasApi } from "@kth/canvas-api";
import fs from "fs";
import path from "path";
import "dotenv/config";

const canvasApiUrl = process.env.CANVAS_API_URL;
const canvasApiToken = process.env.CANVAS_API_TOKEN;

const canvas = new CanvasApi(canvasApiUrl, canvasApiToken);

// Replace with your actual course ID
const courseId = ...;

// Define the directory where files will be saved
const directoryPath = "C:\\Users\\Darka\\OneDrive\\Skrivbord\\githubStudyzone\\StudyZone";

// Ensure directory exists
if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

async function fetchAndSaveQuizzes() {
  const quizzes = canvas.listItems(`courses/${courseId}/quizzes`);

  for await (const quiz of quizzes) {
    const quizData = {
      title: quiz.title,
      description: quiz.description.replace(/<\/?[^>]+(>|$)/g, ""), // Remove HTML tags
      quiz_type: quiz.quiz_type,
      question_count: quiz.question_count,
      points_possible: quiz.points_possible,
      due_at: quiz.due_at,
      lock_at: quiz.lock_at,
      unlock_at: quiz.unlock_at,
    };

    // Define file path for each quiz
    const filePath = path.join(directoryPath, `quiz_${quiz.id}.json`);

    // Write quiz data to its own JSON file
    fs.writeFileSync(filePath, JSON.stringify(quizData, null, 2), "utf-8");

    console.log(`Saved: ${filePath}`);
  }
}

// Run the function
fetchAndSaveQuizzes();
