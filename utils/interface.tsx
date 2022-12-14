export interface SearchResult{
    adult?: boolean;
    poster_path?: string;
    genre_ids?:number[];
    id: number;
    media_type?: string;
    name?:string;
    original_language?:string;
    original_title?:string;
    overview?: string;
    popularity?: number;
    backdrop_path?:string;
    profile_path?:string;
    realease_date?:string;
    title?:string;
    video?:boolean;
    vote_average?:number;
    vote_count?:number;
  }
export interface SearchData{
      page: number;
      results: SearchResult[];
      total_pages: number;
      total_results: number;
  }
export interface MovieData{
  id:number;
  title?: string;
  description?:string;
  backdropPath?:string;
  posterPath?:string;
  lastSeen?:string;
  tier?:"s" | "a" | "b" | "c" | "g";
}
export interface ShowData{
  id:number;
  title?: string;
  description?:string;
  backdropPath?:string;
  posterPath?:string;
  lastSeen?:string;
  tier?:"s" | "a" | "b" | "c" | "g";
}
export interface UserData{
  movies: MovieData[];
  shows: ShowData[];
}

export interface ResultPropTypes{
  addMovie: (id: number, title: string, description:string, backdropPath:string, posterPath:string) => void
  removeMovie: (id: number) => void;
  addShow: (id: number, title: string, description:string, backdropPath:string, posterPath:string) => void
  removeShow: (id: number) => void;
  user: UserData
}