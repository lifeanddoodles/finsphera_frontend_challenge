import { movieMetaTitles, tvShowMetaTitles } from "./utils";

export type MovieMetaKeys = keyof typeof movieMetaTitles;
export type TvShowMetaKeys = keyof typeof tvShowMetaTitles;
export type PossibleKeyValueTypes = string | number | boolean | null;

export type MovieDetailsProps = {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  imdb_id: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
  release_dates: {
    results: {
      iso_3166_1: string;
      release_dates: {
        certification: string;
        descriptors: [];
        iso_639_1: string;
        note: string;
        release_date: string;
        type: number;
      }[];
    }[];
  };
};

export type TvShowDetailsProps = {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: 0 | 1 | 2;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    overview: string;
    name: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
  };
  name: string;
  next_episode_to_air: {
    id: number;
    overview: string;
    name: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: 1;
    episode_type: string;
    production_code: string;
    runtime: null;
    season_number: number;
    show_id: number;
    still_path: string | null;
  };
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  type: string;
};

export type ResourceDetailsProps<T> = {
  adult: boolean;
  backdrop_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    }[];
  };
  credits: {
    cast: {
      adult: boolean;
      gender: 0 | 1 | 2;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }[];
    crew: {
      adult: boolean;
      gender: 0 | 1 | 2;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      job: string;
    }[];
  };
  images: {
    backdrops: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[];
    logos: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[];
    posters: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[];
  };
  external_ids: {
    imdb_id: string | null;
    freebase_mid?: string | number | null;
    freebase_id?: string | number | null;
    tvdb_id?: string | number | null;
    tvrage_id?: string | number | null;
    wikidata_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
  };
} & T;
