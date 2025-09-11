const express = require("express");
const { searchJobs } = require("./services/jobsApi");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable EJS templates
app.set("view engine", "ejs");
app.set("views", "./views"); // folder for EJS templates


// Serve static files from "public" directory
app.use(express.static("public"));

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// Serve all jobs as a webpage
app.get("/jobs", async (req, res) => {
  const { keyword = "", location = "remote" } = req.query;

  try {
    const jobs = keyword ? await searchJobs(keyword, location) : [];

    res.render("jobs", { keyword, location, jobs });
  } catch (err) {
    res.status(500).send("Failed to load jobs");
  }
});

app.listen(PORT, () => console.log(`Job Webpage running on http://localhost:${PORT}`));