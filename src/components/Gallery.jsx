import React, { useCallback, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";

const STORAGE_KEY = "celebrare-gallery-favourites";

// Read saved favourites once when the reducer is first created.
function getSavedFavourites() {
  try {
    const savedPhotos = localStorage.getItem(STORAGE_KEY);
    return savedPhotos ? JSON.parse(savedPhotos) : [];
  } catch {
    return [];
  }
}

// The reducer handles adding and removing a favourite photo.
function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const alreadySaved = state.some(
        (photo) => photo.id === action.photo.id
      );

      if (alreadySaved) {
        return state.filter((photo) => photo.id !== action.photo.id);
      }

      return [...state, action.photo];
    }

    default:
      return state;
  }
}

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchText, setSearchText] = useState("");
  const [showFavourites, setShowFavourites] = useState(false);

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    getSavedFavourites
  );

  // Save the favourites whenever the list changes.
  // This keeps them available after a page refresh.
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  // useCallback keeps the same handler function between renders.
  const handleSearch = useCallback((event) => {
    setSearchText(event.target.value);
  }, []);

  function handleToggleFavourite(photo) {
    dispatch({ type: "TOGGLE_FAVOURITE", photo });
  }

  // useMemo recalculates the visible list only when its inputs change.
  const filteredPhotos = useMemo(() => {
    const photoList = showFavourites ? favourites : photos;
    const search = searchText.toLowerCase().trim();

    return photoList.filter((photo) =>
      photo.author.toLowerCase().includes(search)
    );
  }, [photos, favourites, searchText, showFavourites]);

  const favouriteIds = favourites.map((photo) => photo.id);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search by author name..."
          className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <button
          type="button"
          onClick={() => setShowFavourites(false)}
          className={`rounded-md px-5 py-3 font-medium ${
            !showFavourites
              ? "bg-indigo-600 text-white"
              : "border border-slate-300 bg-white text-slate-700"
          }`}
        >
          All photos
        </button>

        <button
          type="button"
          onClick={() => setShowFavourites(true)}
          className={`rounded-md px-5 py-3 font-medium ${
            showFavourites
              ? "bg-indigo-600 text-white"
              : "border border-slate-300 bg-white text-slate-700"
          }`}
        >
          Favourites ({favourites.length})
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
          <p className="mt-4 text-slate-600">Loading photos...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="rounded-md bg-white p-8 text-center text-slate-600">
          {showFavourites
            ? "You have not added any favourites yet."
            : "No photos found for this author."}
        </p>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <>
          <p className="mb-4 text-sm text-slate-500">
            Showing {filteredPhotos.length} photo
            {filteredPhotos.length === 1 ? "" : "s"}
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favouriteIds.includes(photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Gallery;
