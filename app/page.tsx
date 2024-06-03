"use client";
import {
  MovieProps,
  ResourceProps,
  TvShowProps,
} from "@/components/Carousel/Carousel.types";
import Heading from "@/components/Heading";
import Hero from "@/components/Hero";
import ReqCarouselResult from "@/components/ReqCarouselResult";
import Text from "@/components/Text";
import useFetch from "@/hooks/useFetch";
import { BASE_IMAGE_URL, BASE_URL } from "@/utils/constants";
import Link from "next/link";

type ApiResponse<T> = {
  page: number;
  results: ResourceProps<T>[] | [];
  total_pages: number;
  total_results: number;
};

const apiRequests = {
  movies: `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  tvShows: `${BASE_URL}/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
};

export default function Home() {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch<ApiResponse<MovieProps>>(apiRequests.movies);
  const {
    data: tvShows,
    loading: tvShowsLoading,
    error: tvShowsError,
  } = useFetch<ApiResponse<TvShowProps>>(apiRequests.tvShows);

  return (
    <>
      {!moviesLoading && movies && movies.results[0] && (
        <Hero
          imageSrc={`${BASE_IMAGE_URL}/w1280/${movies.results[0].backdrop_path}`}
        >
          <Hero.Title>
            <Heading
              level={1}
              className="text-3xl sm:text-4xl xl:text-4xl mb-4 text-white"
            >
              {movies.results[0].title}
            </Heading>
          </Hero.Title>
          <Hero.Body>
            <Text className="text-sm mb-4">
              {`${movies.results[0].overview.split(".")[0]}.`}
            </Text>
          </Hero.Body>
          <Hero.Actions>
            {
              <Link
                href={`/movies/${movies.results[0].id}`}
                className="btn btn-primary bg-accent hover:bg-accent-dark px-6 py-2 rounded-lg"
              >
                See more details
              </Link>
            }
          </Hero.Actions>
        </Hero>
      )}
      <>
        <ReqCarouselResult
          title="Popular movies"
          resourceName="movies"
          resources={movies?.results as ResourceProps<MovieProps>[]}
          loading={moviesLoading}
          error={moviesError}
          noResultsText="No movies found"
        />
        <ReqCarouselResult
          title="Popular TV shows"
          resourceName="tv-shows"
          resources={tvShows?.results as ResourceProps<TvShowProps>[]}
          loading={tvShowsLoading}
          error={tvShowsError}
          noResultsText="No TV shows found"
        />
      </>
    </>
  );
}
