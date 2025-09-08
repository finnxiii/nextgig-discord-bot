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