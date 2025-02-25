# semester-project-2

# Auction Website

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Project Management](#project-management)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This project is an **auction website** where users can create listings, bid on items, and manage their profiles. It is built as part of **Semester Project 2** at Noroff, focusing on front-end development while interacting with a provided API.

Non-registered users can search listings, while registered users can create auctions, place bids, and track their credits. New users receive **1000 credits** upon registration.

---

## Features

✔ **User Authentication** – Register, login, and logout securely.
✔ **Profile Management** – Update avatars and view total credits.
✔ **Create Listings** – Users can list items for auction with images, descriptions, and deadlines.
✔ **Place Bids** – Users can bid on active listings using their credits.
✔ **View Bids on Listings** – Each listing displays all bids placed.
✔ **Search Listings** – Non-registered users can explore auctions.

---

## Technologies Used

- **HTML, CSS, JavaScript** (Vanilla JS, Tailwind CSS)
- **Noroff Auction API** (RESTful API for managing users, listings, and bids)
- **GitHub** (Version control & repository hosting)
- **Netlify** (Deployment & hosting)
- **Figma** (Design prototype)
- **GitHub Projects** (Project management with Kanban board)

---

## Installation & Setup

### Prerequisites

- **Node.js** (Latest version recommended)
- **NPM** (Comes with Node.js)
- **Git** (For cloning the repository)

### Steps to Run Locally

1. **Clone the repository**:
   ```sh
   git clone https://github.com/Inamarie84/semester-project-2.git
   cd semester-project-2
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Run the project** (if using a local server):
   ```sh
   npm run dev
   ```
4. Open the project in your browser at `http://localhost:3000/` (depending on your setup).

---

## Usage

### Register & Login

- Users with a `stud.noroff.no` email can register.
- Logging in allows access to bidding and profile management.

### Creating Listings

- Listings require a **title, description, deadline, and images**.

### Placing Bids

- Bidding on an item deducts credits from the user's balance.
- Users **cannot bid on their own listings**.

### Viewing Listings

- Listings display **current highest bid, bid history, and auction end date**.

---

## API Reference

The project interacts with the **Noroff Auction API**.

- **Authentication**: Login and register users.
- **User Data**: Retrieve profile information, including credits and avatar.
- **Listings**: Fetch, create, and update auction listings.
- **Bidding**: Place bids on listings.

[Full API Documentation](https://docs.noroff.dev/auction-api)

---

## Project Management

The project follows Agile methodologies using:

- **Gantt Chart** ([View Here](#))
- **Kanban Board** ([GitHub Projects](#))
- **Figma Design Prototype** ([View Here](#))
- **Style Guide** ([View Here](#))

---

## Deployment

This project is **hosted on Netlify**.
[Live Demo](#) (Replace `#` with actual link)

---

## Contributing

Contributions are welcome! Feel free to fork the repo and submit pull requests.

---

## License

This project is licensed under the **MIT License**.
