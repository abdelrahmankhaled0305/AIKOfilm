# AIKOfilm

An interactive movie discovery web application built with **React**, **Vite**, **React Router**, and the **TMDB API**. Browse movies, filter by genre, search in real time, view movie details and trailers, and manage a local favorites list.

## Live Demo & Repository

- **Live Demo:** [https://aik-ofilm-7rp0apt65-aiko-c1cd.vercel.app/](https://aik-ofilm-7rp0apt65-aiko-c1cd.vercel.app/)
- **GitHub Repository:** [https://github.com/abdelrahmankhaled0305/AIKOfilm](https://github.com/abdelrahmankhaled0305/AIKOfilm)

## Features

- **Search & Genre Filtering:** Find movies by title or filter by genre with pagination.
- **Movie Details & Dedicated Trailer Route:** Inspect movie info and watch trailers on a dedicated page.
- **Favorites (`localStorage`):** Save and remove favorite movies with instant state updates in the browser.
- **Multi-Route Navigation & `404` Page:** Dedicated routes for Home, Movies, Movie Details, Movie Trailer, Favorites, and Not Found (`404`).
- **Responsive Design & Image Fallback:** Custom responsive CSS with a sticky layout and poster load error handling (`onError`).

## Tech Stack

- **Frontend:** React, Vite, JavaScript
- **Routing:** React Router (`react-router-dom`)
- **API & Networking:** TMDB API, Axios
- **Styling & Storage:** Custom CSS, `localStorage`

## Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/abdelrahmankhaled0305/AIKOfilm.git](https://github.com/abdelrahmankhaled0305/AIKOfilm.git)
   cd AIKOfilm
