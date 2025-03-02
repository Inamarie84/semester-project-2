# semester-project-2

### Auction Website - Auction Vintage Items

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation-setup)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Project Management](#project-management)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project is an auction website where users can create listings, bid on items, and manage their profiles. It is built as part of Semester Project 2 at Noroff, focusing on front-end development while interacting with a provided API.

Non-registered users can search listings, while registered users can create listings, place bids, and track their credits. New users receive 1000 credits upon registration.

## Features

- ✔ **User Authentication** – Register, login, and logout securely.
- ✔ **Profile Management** – Update avatars, bio and view total credits.
- ✔ **Create Listings** – Users can list items for auction with images, descriptions, and deadlines.
- ✔ **Place Bids** – Users can bid on active listings using their credits.
- ✔ **View Bids on Listings** – Each listing displays all bids placed.
- ✔ **Search Listings** – Non-registered users can explore auctions.

## Technologies Used

- **HTML, CSS, JavaScript** (Vanilla JS, Tailwind CSS)
- **Noroff Auction API** (RESTful API for managing users, listings, and bids)
- **GitHub** (Version control & repository hosting)
- **Netlify** (Deployment & hosting)
- **Figma** (Design prototype)
- **Trello** (Kanban board)
- **Notion** (Gantt Chart, Timeline)

## Installation & Setup

### Prerequisites

- Node.js (Latest version recommended)
- NPM (Comes with Node.js)
- Git (For cloning the repository)

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

The project follows Agile methodologies using:

- **Gantt Chart**: [Click here](https://picturesque-harmony-535.notion.site/1a8da066747b8011880bef11bfd78ec4?v=1a9da066747b807b8b50000cd2731471)
- **Figma Design Prototype**:
  - [View Design Prototype (Dev Mode)](https://www.figma.com/design/ls8KmToOzwn7YtqZx8NCn7/semester-project-2?node-id=0-1&m=dev&t=zKiixMlqNMHz5L7m-1)
  - [View Desktop Prototype](https://www.figma.com/proto/ls8KmToOzwn7YtqZx8NCn7/semester-project-2?node-id=0-1&t=zKiixMlqNMHz5L7m-1)
  - [View Mobile Prototype](https://www.figma.com/proto/ls8KmToOzwn7YtqZx8NCn7/semester-project-2?node-id=12-127&t=zKiixMlqNMHz5L7m-1)
- **Kanban Board**: ![Kanban Board](assets/images/kanban-board.png)

## Deployment

This project is hosted on **Netlify**. [Live Demo](https://auction-vintageitems.netlify.app/)

## Contributing

Contributions are welcome! Feel free to fork the repo and submit pull requests.

## License

About
No description, website, or topics provided.
