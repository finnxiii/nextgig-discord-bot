require('dotenv').config();
const axios = require('axios');

const JSEARCH_BASE_URL = 'https://jsearch.p.rapidapi.com/search';

async function searchJobs(keyword, location = "remote") {
    try {
        const response = await axios.get(JSEARCH_BASE_URL, {
            params: {
                query: `${keyword} in ${location}`,
                page: 1,
                num_pages: 1,
            },
            headers: {
                'X-RapidAPI-Key': process.env.JSEARCH_API_KEY,
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        });

        // Extract jobs from API responses
        const jobs = response.data.data.map(job => ({
            title: job.job_title,
            company: job.employer_name,
            location: job.job_city || job.job_country,
            url: job.job_apply_link
        }));

        return jobs;
    } catch (error) {
        console.error('Error fetching jobs from JSearch API:', error.message);
        return [];
    }
}

module.exports = { searchJobs };