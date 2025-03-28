import { CanvasApi } from "@kth/canvas-api";

const canvas = new CanvasApi(
  "https://canvas.kth.se/api/v1",
  "8779~r6MZwBxGnFc7DGnzYu3YuL7V4VnB3eFBWUxF6fQN8zVBxn3UV3tYfUxXzYGLW4u9"
);

// Timeout-funktion för att undvika API-rate-limit
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getExamsFromModules() {
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

      // Filtrera bort kurser med "examination i datorsal"
      if (/examination i datorsal/i.test(course.name)) {
        continue;
      }

      try {
        // Lägg till en kort paus för att undvika rate-limit
        await delay(500);

        // Hämta alla moduler i kursen
        const modulesResponse = await canvas.get(`courses/${courseId}/modules`);

        if (!modulesResponse.json || modulesResponse.json.length === 0) {
          continue; // Om inga moduler finns, gå till nästa kurs
        }

        let examsFound = false;

        // Loopa igenom modulerna
        for (const module of modulesResponse.json) {
          if (/exam|tentor|tentamen|old exams|gamla tentor|tidgare tentor/i.test(module.name)) {
            // Om en modul matchar, hämta dess items (tentorna)
            await delay(500);
            const moduleItemsResponse = await canvas.get(`courses/${courseId}/modules/${module.id}/items`);

            if (!moduleItemsResponse.json || moduleItemsResponse.json.length === 0) {
              continue;
            }

            if (!examsFound) {
              console.log(`Kurs: ${course.name} (${course.course_code})`);
              examsFound = true;
            }

            console.log(`  Modul: ${module.name}`);

            // Loopa igenom alla tentor i modulen
            moduleItemsResponse.json.forEach(item => {
              console.log(`    - ${item.title || "Namnlös tenta"}`);
            });
          }
        }
      } catch (error) {
        console.error(`Fel vid hämtning av moduler för kurs ${course.name}:`, error.message);
      }
    }
  } catch (error) {
    console.error("Fel vid hämtning av kurser eller tentor:", error.message);
  }
}

getExamsFromModules();
