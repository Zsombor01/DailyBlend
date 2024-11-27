const MovieListType = Object.freeze({
    WATCHLIST: 0,
    FAVOURITE: 1,
    WATCHED: 2,

    toString(listType) {
        return listType == MovieListType.WATCHED ? "Watched" : listType == MovieListType.FAVOURITE ? "Favourite" : "Watchlist";
    },

    toInternalName(listType) {
        return listType == MovieListType.WATCHED ? "watchedList" : listType == MovieListType.FAVOURITE ? "favouritesList" : "watchList";
    }
});

export { MovieListType };