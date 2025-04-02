import { CanvasApi } from "@kth/canvas-api";

const canvas = new CanvasApi(
  "https://canvas.kth.se/api/v1",
  "DIN KEY"
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

