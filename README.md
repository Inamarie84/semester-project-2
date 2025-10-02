# Semester Project 2 - Auction Vintage Items

**Live demo:** https://auction-vintageitems.netlify.app/  
**Repository:** https://github.com/Inamarie84/semester-project-2

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Project Management](#project-management)
- [Deployment](#deployment)
- [Recent Portfolio Improvements](#recent-portfolio-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

An auction website where users can create listings, bid on items, and manage their profiles. Built for **Semester Project 2 (Noroff)**, focusing on front-end development with a provided REST API.

- Non-registered users can **search listings**.
- Registered users can **create listings**, **place bids**, and **track credits**.
- New users receive **1000 credits** upon registration.

---

## Features

- ✔ **User Authentication** — Register, login, logout
- ✔ **Profile Management** — Update avatar, bio; view total credits
- ✔ **Create Listings** — Title, description, media, end date
- ✔ **Place Bids** — Bid on active listings with credits
- ✔ **View Bids** — Listing pages show bid history and counts
- ✔ **Search Listings** — Public search with results view
- ✔ **Responsive UI** — Tailwind CSS + skeleton loaders

---

## Technologies Used

- **HTML, CSS, JavaScript (Vanilla JS)** + **Tailwind CSS**
- **Noroff Auction API** (users, listings, bids)
- **GitHub** (version control)
- **Netlify** (hosting)
- **Figma** (design)
- **Trello** (Kanban)
- **Notion** (timeline / Gantt)

---

## Installation & Setup

### Prerequisites

- **Node.js** (LTS recommended)
- **npm** (bundled with Node)
- **Git** (to clone)

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Inamarie84/semester-project-2.git
   cd semester-project-2
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the project (if using a local server):

   ```bash
   npm run dev
   ```

4. Open the project in your browser at [http://localhost:3000/](http://localhost:3000/) (depending on your setup).

5. Optional - Browserlist warning fix:

   ```bash
   npx update-db-browserslist@latest
   ```

## Usage

### Register & Login

- Users with a **stud.noroff.no** email can register.
- Logging in allows access to bidding and profile management.

### Creating Listings

- Listings require a title, description, deadline, and images.

### Placing Bids

- Bidding on an item deducts credits from the user's balance.
- Users cannot bid on their own listings.

### Viewing Listings

- Listings display the current highest bid, bid history, and auction end date.

## API Reference

The project interacts with the **Noroff Auction API**:

- **Authentication**: Login and register users.
- **User Data**: Retrieve profile information, including credits and avatar.
- **Listings**: Fetch, create, and update auction listings.
- **Bidding**: Place bids on listings.

## Project Management

- **Gantt Chart**: [Click here](https://picturesque-harmony-535.notion.site/1a8da066747b8011880bef11bfd78ec4?v=1a9da066747b807b8b50000cd2731471)
- **Figma Design Prototype**:
  - [View Design Prototype (Dev Mode)](https://www.figma.com/design/ls8KmToOzwn7YtqZx8NCn7/semester-project-2?node-id=0-1&m=dev&t=zKiixMlqNMHz5L7m-1)
  - [View Desktop Prototype](https://www.figma.com/proto/ls8KmToOzwn7YtqZx8NCn7/semester-project-2?node-id=0-1&t=zKiixMlqNMHz5L7m-1)
  - [View Mobile Prototype](https://www.figma.com/proto/ls8KmToOzwn7YtqZx8NCn7/semester-project-2?node-id=12-127&t=zKiixMlqNMHz5L7m-1)

## Deployment

This project is hosted on **Netlify**. [Live Demo](https://auction-vintageitems.netlify.app/)

## Recent Portfolio Improvements

Targeted teacher feedback fixes to improve code quality and robustness:

- Switched to template literals (readability & consistency).
- Removed console logs from production code.
- Consistent return values in async functions (no “sometimes undefined”).
- URL-encoded search queries for reliability with spaces/special chars.
- Safer JSON parsing in fetch flows to avoid runtime crashes.

(See commit history for detailed changes and context.)

## Contributing

Contributions are welcome! Feel free to fork the repo and submit pull requests.

## License

About
No description, website, or topics provided.
