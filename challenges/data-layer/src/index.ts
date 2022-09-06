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
  [K in keyof DataEntityMap as `clearAll${Capitalize<K>}s`]: () => void;
};

export class DataStore implements DataStoreMethods {
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {},
  };
  getAllSongs(): Song[] {
    return [];
  }
  getAllMovies(): Movie[] {
    return [];
  }
  getSong(id: string): Song {
    return { singer: "", id };
  }
  getMovie(id: string): Movie {
    return { director: "", id };
  }
  clearAllSongs(): void {}
  clearAllMovies(): void {}
}

const ts: DataStoreMethods = {} as any;

const ds = new DataStore();
