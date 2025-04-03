const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.post("/log", (req, res) => {
  console.log("Received Data:", req.body);
  res.send("Data logged successfully");
});

// Handle any request to /api/:variable
app.get("/api/:variable", (req, res) => {
  const variable = req.params.variable; // Extract the dynamic part of the URL
  console.log("Received variable:", variable);
  // Example: Use the variable to construct a file path
  const filePath = path.join(__dirname, "database", `${variable}.json`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading file" });
    }
    res.setHeader("Content-Type", "application/json");
    res.send(data); // Send JSON file contents
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
