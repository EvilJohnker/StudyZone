document.getElementById("sendData").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: grabData
      });
    });
});  
  
function grabData() {
const data = {
    url: window.location.href,
    title: document.title,
    //html: document.documentElement.outerHTML, // Grabs the full page HTML
    html: document.documentElement.innerHTML, // Grabs the full page HTML
};

fetch("http://localhost:5000/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
})
    .then(response => response.text())
    .then(result => console.log("Data sent:", result))
    .catch(error => console.error("Error:", error));
}