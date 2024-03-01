import { defineStore } from 'pinia';

export const useComicStore = defineStore('comicStore', {
  state: () => ({
    selectedComic: null,
  }),
  actions: {
    setSelectedComic(comic) {
      this.selectedComic = comic;
    },
    clearSelectedComic() {
      this.selectedComic = null;
    },
  },
});
