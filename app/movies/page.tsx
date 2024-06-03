"use client";
import {
  MovieProps,
  ResourceProps,
} from "@/components/Carousel/Carousel.types";
import Heading from "@/components/Heading";
import Hero from "@/components/Hero";
import ReqCarouselResult from "@/components/ReqCarouselResult";
import Text from "@/components/Text";
import useFetch from "@/hooks/useFetch";
import { BASE_IMAGE_URL, BASE_URL } from "@/utils/constants";
import Link from "next/link";

const apiRequests = {
  popularMovies: `${BASE_URL}/movie/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  topRatedMovies: `${BASE_URL}/movie/top_rated?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  upcomingMovies: `${BASE_URL}/movie/upcoming?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  nowPlayingMovies: `${BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
};

export type ApiResponse = {
  page: number;
  results: ResourceProps<MovieProps>[] | [];
  total_pages: number;
  total_results: number;
};

export default function MoviesCategory() {
  const {
    data: popularMovies,
    loading: popularMoviesLoading,
    error: popularMoviesError,
  } = useFetch<ApiResponse>(apiRequests.popularMovies);
  const {
    data: topRatedMovies,
    loading: topRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useFetch<ApiResponse>(apiRequests.topRatedMovies);
  const {
    data: upcomingMovies,
    loading: upcomingMoviesLoading,
    error: upcomingMoviesError,
  } = useFetch<ApiResponse>(apiRequests.upcomingMovies);
  const {
    data: nowPlayingMovies,
    loading: nowPlayingMoviesLoading,
    error: nowPlayingMoviesError,
  } = useFetch<ApiResponse>(apiRequests.nowPlayingMovies);

  return (
    <>
      {!popularMoviesLoading && popularMovies && popularMovies.results[0] && (
        <Hero
          imageSrc={`${BASE_IMAGE_URL}/w1280/${popularMovies.results[0].backdrop_path}`}
        >
          <Hero.Title>
            <Heading
              level={1}
              className="text-3xl sm:text-4xl xl:text-4xl mb-4 text-white"
            >
              {popularMovies.results[0].title}
            </Heading>
          </Hero.Title>
          <Hero.Body>
            <Text className="text-sm mb-4">
              {`${popularMovies.results[0].overview.split(".")[0]}.`}
            </Text>
          </Hero.Body>
          <Hero.Actions>
            {
              <Link
                href={`/movies/${popularMovies.results[0].id}`}
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
          resources={popularMovies?.results as ResourceProps<MovieProps>[]}
          loading={popularMoviesLoading}
          error={popularMoviesError}
          noResultsText="No movies found"
        />
        <ReqCarouselResult
          title="Top rated movies"
          resourceName="movies"
          resources={topRatedMovies?.results as ResourceProps<MovieProps>[]}
          loading={topRatedMoviesLoading}
          error={topRatedMoviesError}
          noResultsText="No movies found"
        />
        <ReqCarouselResult
          title="Upcoming movies"
          resourceName="movies"
          resources={upcomingMovies?.results as ResourceProps<MovieProps>[]}
          loading={upcomingMoviesLoading}
          error={upcomingMoviesError}
          noResultsText="No movies found"
        />
        <ReqCarouselResult
          title="Movies now playing"
          resourceName="movies"
          resources={nowPlayingMovies?.results as ResourceProps<MovieProps>[]}
          loading={nowPlayingMoviesLoading}
          error={nowPlayingMoviesError}
          noResultsText="No movies found"
        />
      </>
    </>
  );
}
