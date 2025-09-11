document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Job Finder Webpage Loaded!");

    // Example: highlight job cards on click
    const jobs = document.querySelectorAll(".job-card");
    jobs.forEach(job => {
        job.addEventListener("click", () => {
            job.style.backgroundColor = "#f0f4ff";
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ NextGig Job Finder Loaded");

    const form = document.querySelector(".search-form");
    if (form) {
        form.addEventListener("submit", () => {
            console.log("🔎 Searching for jobs...");
        });
    }
});