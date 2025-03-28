/*
import { CanvasApi } from "@kth/canvas-api";

const canvas = new CanvasApi(
  "https://canvas.kth.se/api/v1",
  "Din Key"
);

async function getLabsFromCourses() {
  try {
    // Hämta alla kurser
    const courses = await canvas.get("courses");
    
    for (const course of courses.json) {
      const courseId = course.id;
      console.log(`Kurs: ${course.name} (${course.course_code})`);

      // Hämta uppgifter (assignments) för kursen
      const assignments = await canvas.get(`courses/${courseId}/assignments`);

      // Filtrera ut labbar (baserat på namn eller annan regel)
      const labs = assignments.json.filter(a => a.name.toLowerCase().includes("lab"));

      if (labs.length > 0) {
        console.log("Labbar:");
        labs.forEach(lab => console.log(`- ${lab.name} (${lab.due_at})`));
      } else {
        console.log("Inga labbar hittades.");
      }
    }
  } catch (error) {
    console.error("Fel vid hämtning av labbar:", error);
  }
}

getLabsFromCourses();
*/

/*
import { CanvasApi } from "@kth/canvas-api";

const canvas = new CanvasApi(
  "https://canvas.kth.se/api/v1",
  "8779~r6MZwBxGnFc7DGnzYu3YuL7V4VnB3eFBWUxF6fQN8zVBxn3UV3tYfUxXzYGLW4u9"
);

async function getAllCourses() {
  try {
    // Hämtar alla kurser du någonsin varit registrerad på
    const courses = await canvas.get("courses?enrollment_state=all&per_page=100&include[]=total_scores");

    console.log("Dina kurser:");
    for (const course of courses.json) {
      console.log(`- ${course.name} (${course.course_code}) [Status: ${course.enrollment_state}]`);
    }
  } catch (error) {
    console.error("Fel vid hämtning av kurser:", error);
  }
}

getAllCourses();
*/

/*
import { CanvasApi } from "@kth/canvas-api";

const canvas = new CanvasApi(
  "https://canvas.kth.se/api/v1",
  "8779~r6MZwBxGnFc7DGnzYu3YuL7V4VnB3eFBWUxF6fQN8zVBxn3UV3tYfUxXzYGLW4u9"
);

// Timeout-funktion för att undvika API-rate-limit
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getLabsFromAllCourses() {
  try {
    console.log("Hämtar alla kurser du gått/går...");

    // Hämta alla kurser
    const coursesResponse = await canvas.get("courses?enrollment_state=all&per_page=100");
    
    if (!coursesResponse.json || coursesResponse.json.length === 0) {
      console.log("Inga kurser hittades.");
      return;
    }

    console.log(`Hittade ${coursesResponse.json.length} kurser.\n`);

    for (const course of coursesResponse.json) {
      const courseId = course.id;
      console.log(`Kurs: ${course.name} (${course.course_code}) [Status: ${course.enrollment_state || "Okänd"}]`);

      try {
        // Lägg till en kort paus för att undvika rate-limit
        await delay(500);

        // Hämta uppgifter för kursen
        const assignmentsResponse = await canvas.get(`courses/${courseId}/assignments`);

        if (!assignmentsResponse.json || assignmentsResponse.json.length === 0) {
          console.log("  Inga uppgifter hittades.");
          continue;
        }

        // Filtrera ut labbar
        const labs = assignmentsResponse.json.filter(a => a.name.toLowerCase().includes("lab"));

        if (labs.length > 0) {
          console.log("  Labbar:");
          labs.forEach(lab => console.log(`  - ${lab.name} (Deadline: ${lab.due_at || "Ingen deadline"})`));
        } else {
          console.log("  Inga labbar hittades.");
        }

      } catch (error) {
        console.error(`Fel vid hämtning av uppgifter för kurs ${course.name}:`, error.message);
      }
    }
  } catch (error) {
    console.error("Fel vid hämtning av kurser eller labbar:", error.message);
  }
}

getLabsFromAllCourses();
*/
import { CanvasApi } from "@kth/canvas-api";

const canvas = new CanvasApi(
  "https://canvas.kth.se/api/v1",
  "8779~r6MZwBxGnFc7DGnzYu3YuL7V4VnB3eFBWUxF6fQN8zVBxn3UV3tYfUxXzYGLW4u9"
);

// Timeout-funktion för att undvika API-rate-limit
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getLabsFromAllCourses() {
  try {
    console.log("Hämtar alla kurser du gått/går...");

    // Hämta alla kurser
    const coursesResponse = await canvas.get("courses?enrollment_state=all&per_page=100");

    if (!coursesResponse.json || coursesResponse.json.length === 0) {
      console.log("Inga kurser hittades.");
      return;
    }

    console.log(`Hittade ${coursesResponse.json.length} kurser.\n`);

    for (const course of coursesResponse.json) {
      const courseId = course.id;

      // Hämta uppgifter för kursen
      try {
        // Lägg till en kort paus för att undvika rate-limit
        await delay(500);

        const assignmentsResponse = await canvas.get(`courses/${courseId}/assignments`);

        if (!assignmentsResponse.json || assignmentsResponse.json.length === 0) {
          continue;  // Om inga uppgifter hittades, hoppa vidare till nästa kurs
        }

        // Filtrera ut labbar
        const labs = assignmentsResponse.json.filter(a => a.name.toLowerCase().includes("lab"));

        if (labs.length > 0) {
          // Skriv ut kursnamn innan labbarna
          console.log(`Kurs: ${course.name} (${course.course_code})`);

          labs.forEach(lab => {
            console.log(`  - ${lab.name} (Deadline: ${lab.due_at || "Ingen deadline"})`);
          });
        }
      } catch (error) {
        console.error(`Fel vid hämtning av uppgifter för kurs:`, error.message);
      }
    }
  } catch (error) {
    console.error("Fel vid hämtning av kurser eller labbar:", error.message);
  }
}

getLabsFromAllCourses();

