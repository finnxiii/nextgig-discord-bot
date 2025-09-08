const express = require("express");
const { searchJobs } = require("./services/jobsApi");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from "public" directory
app.use(express.static("public"));

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// Serve all jobs as a webpage
app.get("/jobs", async (req, res) => {
  const { keyword, location = "remote" } = req.query;

  try {
    const jobs = await searchJobs(keyword, location);

    const html = `
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NextGig – Job Results for ${keyword}</title>
        <link rel="stylesheet" href="/style.css" />
        <script src="/app.js" defer></script>
      </head>
      <body>
        <!-- Navbar -->
        <nav class="navbar">
          <div class="nav-container">
            <img src="/assets/nextgig-logo.png" alt="NextGig Logo" class="logo" />
            <span class="brand">NextGig</span>
          </div>
        </nav>

        <!-- Main Content -->
        <main class="container">
          <h1>Jobs for "${keyword}" in "${location}"</h1>
          <div class="jobs-grid">
            ${jobs.map(job => `
              <div class="job-card">
                <h2><a href="${job.url}" target="_blank">${job.title}</a></h2>
                <p>🏢 ${job.company}<br/>🌍 ${job.location}</p>
              </div>
            `).join("")}
          </div>
        </main>

        <!-- Footer -->
        <footer class="footer">
          <p>💼 Powered by NextGig – Your career starts here.</p>
        </footer>
      </body>
      </html>
      `;

    res.send(html);
  } catch (err) {
    res.status(500).send("⚠️ Failed to load jobs");
  }
});

app.listen(PORT, () => console.log(`🌐 Job Webpage running on http://localhost:${PORT}`));