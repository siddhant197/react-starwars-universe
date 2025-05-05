# React Star Wars Universe

Live Demo: [react-starwars-universe.vercel.app](https://react-starwars-universe-k5e4zs1hn-siddhant197s-projects.vercel.app/)

A responsive, searchable and paginated web application built using **React**, **TypeScript** and the **SWAPI.tech** API to explore characters from the Star Wars universe, manage favourites and view detailed character data.

---

## Features

### Header

- Persistent fixed header with navigation links to **Home** and **Favorites** page.

### Characters List View

- Displays a paginated list of Star Wars characters.
- Shows **name**, **gender** and **home planet**.
- Includes a **Search bar** to filter by character name.
- Pagination controls to navigate across pages.
- Clickable items navigate to the **character details** page.

### Character Details View

- Shows detailed info: **name**, **hair color**, **eye color**, **gender**, **home planet**.
- Dynamically fetches and displays **films** and **starships**.
- Allows adding/removing characters to/from **favourites**.

### Favorites View

- Displays all favourite characters with **name**, **height**, **gender** and **home planet**.
- Supports removing characters from favourites.
- Includes **editing** of height and gender directly in the UI.

---

## Getting Started

### Prerequisites

- Node.js (>= 18.x)
- npm or yarn

### Installation

```bash
git clone https://github.com/siddhant197/react-starwars-universe.git
cd react-starwars-universe
npm install
```

### Running Locally

Create a `.env` file in the root similar to .env.example:

```env
# Example
VITE_API_BASE_URL={API_URL}
```

```bash
npm run dev
```

App will be available at: [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
src/
├── api/            # API services
├── components/     # Reusable components
├── constants/      # Constants
├── context/        # Favorites functionality context
├── hooks/          # Custom React hooks
├── pages/          # Views for routes
├── types/          # TypeScript types and interfaces
├── utils/          # Helper functions and utilities
└── App.tsx         # Root routing component
```

---

## Tech Stack

- **React** + **TypeScript** + **Vite**
- **React Router**
- **Tailwind CSS**
- **React Query** for data fetching and caching
- **Context API** for favourites state
- **SWAPI.tech**
- **LocalStorage** for persistence of favorites
- **Vercel** for deployment

---

## Testing

- Testing is implemented using **Vitest** and **React Testing Library**.
- Includes unit and integration tests covering major flows including:
  - Character listing and search
  - Favourites add/remove and editing
  - Navigation between views
- Coverage reports are generated to ensure code reliability and quality.

```bash
npm run test
npm run coverage
```

---

## Development Practices

- Used **ESLint** and **Prettier** to enforce consistent code quality and style across the codebase.
- This setup ensures maintainability and makes the project scalable and team-friendly.

---

## Considerations

### 1. Data Fetching & API Structure

- Given `swapi.tech` doesn’t return nested data directly (e.g., homeworld names).
  - Solved by **fetching related resources** separately using **React Query** with caching.
- Leveraged **React Query** for:
  - Efficient and cached data fetching.
  - Avoids making the same request multiple times.

### 2. State Management

- Used **Context API** for favourites due to limited global state needs.
  - Would consider **Zustand** or **Redux Toolkit** for scalability.

### 3. Performance

- Debounced search to avoid excessive calls.
- React Query handles caching and minimizes re-fetching.
- Pagination limits network usage and maintains snappy UX.

### 4. Maintainability

- Clean separation of concerns.
- Fully typed interfaces using TypeScript.
- Responsive UI built with utility-first Tailwind CSS.

---

## Scaling Considerations

If scaled to a larger app:

- Adopt **feature-based folder structure** (e.g., `features/characters`, `features/favourites`).
- Extend React Query usage further by **prefetching** related data to improve perceived performance.
- Add **global state management** (e.g., Zustand or Redux Toolkit).
- Integrate **Storybook** and **component tests** for shared UI library.
- Add **lazy loading** and **code splitting** for better performance on larger routes or detail views.
- Set up **error monitoring** (e.g., Datadog RUM) to track runtime issues in production.
- Add **CI/CD pipelines** with testing and linting steps to ensure code quality at scale.

---

## Contact

Built by [Siddhant](https://github.com/siddhant197)
