const fs = require('fs');
const cheerio = require('cheerio');

// Check if the file exists and is readable
fs.readFile('canvas_overview.html', 'utf8', (err, htmlContent) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Load the HTML content with Cheerio
    const $ = cheerio.load(htmlContent);

    // Find all items that contain deadlines
    let foundItems = false;
    $('.PlannerItem-styles__root').each((index, item) => {
        // Extract course name (from class 'css-qbjizl-text')
        const course = $(item).find('.css-qbjizl-text').text().trim();

        // Extract assignment name (from 'a' tag with class 'css-q13fpi-view-link')
        const assignment = $(item).find('a.css-q13fpi-view-link span[aria-hidden="true"]').text().trim();

        // Extract the deadline (from class 'css-1uakmj8-text')
        const deadline = $(item).find('.css-1uakmj8-text').text().trim();

        // Extract link to the assignment (from the 'a' tag)
        const link = $(item).find('a').attr('href');
        const fullLink = link ? `https://canvas.kth.se${link}` : '#';

        // Output the information
        if (course || assignment || deadline || link) {
            foundItems = true;
            console.log(`Course: ${course}`);
            console.log(`Assignment: ${assignment}`);
            console.log(`Deadline: ${deadline}`);
            console.log(`Link: ${fullLink}`);
            console.log('-----------------------------------');
        }
    });

    // If no items are found, inform the user
    if (!foundItems) {
        console.log('No deadlines found in the HTML content.');
    }
});
