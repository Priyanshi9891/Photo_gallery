# Photo Gallery

A beginner-friendly React + Vite + Tailwind CSS photo gallery for the Celebrare frontend assignment.

## Run the project

1. Install Node.js (if it is not already installed).
2. Open this folder in VS Code.
3. Open the terminal in this folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL shown in the terminal (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Features

- Fetches 30 photos from the Picsum Photos API when the app loads.
- Shows loading and error states.
- Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop.
- Searches photos by author without another API request.
- Adds and removes favourites using `useReducer`.
- Saves favourites in `localStorage`.
- Uses the `useFetchPhotos` custom hook.
- Uses `useCallback` for the search input handler and `useMemo` for filtered photos.

## Project structure

```text
src/
  components/
    Gallery.jsx
    PhotoCard.jsx
  hooks/
    useFetchPhotos.js
  App.jsx
  index.css
  main.jsx
```
