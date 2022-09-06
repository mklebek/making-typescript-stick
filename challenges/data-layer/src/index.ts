export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
} & {
  [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (
    id: string
  ) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void;
} & {
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (
    item: DataEntityMap[K]
  ) => DataEntityMap[K];
};

function isDefined<T>(val: T | undefined): val is T {
  return typeof val !== 'undefined';
}

export class DataStore implements DataStoreMethods {
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {},
  };
  getAllSongs(): Song[] {
    return Object.keys(this.#data.song)
      .map((songKey) => this.#data.song[songKey])
      .filter(isDefined);
  }
  getAllMovies(): Movie[] {
    return Object.keys(this.#data.movie)
      .map((songKey) => this.#data.movie[songKey])
      .filter(isDefined);
  }
  getSong(id: string): Song {
    const song = this.#data.song[id];
    if (!song) throw new Error(`Song not found: ${id}`);
    return song;
  }
  getMovie(id: string): Movie {
    const movie = this.#data.movie[id];
    if (!movie) throw new Error(`Movie not found: ${id}`);
    return movie;
  }
  addSong(song: Song) {
    this.#data.song = { [song.id]: song };
    return song;
  }
  addMovie(movie: Movie): Movie {
    this.#data.movie = { [movie.id]: movie };
    return movie;
  }
  clearSongs(): void {
    this.#data.song = {};
  }
  clearMovies(): void {
    this.#data.movie = {};
  }
}
