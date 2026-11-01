function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <img
        src={`https://picsum.photos/id/${photo.id}/500/350`}
        alt={`Photo by ${photo.author}`}
        className="h-52 w-full object-cover"
        loading="lazy"
      />

      <div className="flex items-center justify-between gap-3 p-4">
        <p className="truncate font-medium text-slate-800">{photo.author}</p>

        <button
          type="button"
          onClick={() => onToggleFavourite(photo)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          title={isFavourite ? "Remove from favourites" : "Add to favourites"}
          className="rounded-full p-2 text-2xl leading-none transition  "
        >
         <span
  className={`relative mb-1 mr-1 inline-block h-3 w-3 rotate-45 ${
    isFavourite ? "bg-red-500" : "bg-slate-400"
  }`}
>
  <span
    className={`absolute -left-1.5 top-0 h-3 w-3 rounded-full ${
      isFavourite ? "bg-red-500" : "bg-slate-400"
    }`}
  ></span>

  <span
    className={`absolute left-0 -top-1.5 h-3 w-3 rounded-full ${
      isFavourite ? "bg-red-500" : "bg-slate-400"
    }`}
  ></span>
</span>
        </button>
      </div>
    </article>
  );
}

export default PhotoCard;
