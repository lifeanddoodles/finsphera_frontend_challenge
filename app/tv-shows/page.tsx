"use client";
import {
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

export type ApiResponse = {
  page: number;
  results: ResourceProps<TvShowProps>[] | [];
  total_pages: number;
  total_results: number;
};

const apiRequests = {
  popularTvShows: `${BASE_URL}/tv/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  topRatedTvShows: `${BASE_URL}/tv/top_rated?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  nowAiringTvShows: `${BASE_URL}/tv/airing_today?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
};

export default function TvShowsCategory() {
  const {
    data: popularTvShows,
    loading: popularTvShowsLoading,
    error: popularTvShowsError,
  } = useFetch<ApiResponse>(apiRequests.popularTvShows);
  const {
    data: topRatedTvShows,
    loading: topRatedTvShowsLoading,
    error: topRatedTvShowsError,
  } = useFetch<ApiResponse>(apiRequests.topRatedTvShows);
  const {
    data: nowAiringTvShows,
    loading: nowAiringTvShowsLoading,
    error: nowAiringTvShowsError,
  } = useFetch<ApiResponse>(apiRequests.nowAiringTvShows);

  return (
    <>
      {!popularTvShowsLoading &&
        popularTvShows &&
        popularTvShows.results[0] && (
          <Hero
            imageSrc={`${BASE_IMAGE_URL}/w1280/${popularTvShows.results[0].backdrop_path}`}
          >
            <Hero.Title>
              <Heading
                level={1}
                className="text-3xl sm:text-4xl xl:text-4xl mb-4 text-white"
              >
                {popularTvShows.results[0].name}
              </Heading>
            </Hero.Title>
            <Hero.Body>
              <Text className="text-sm mb-4">
                {`${popularTvShows.results[0].overview.split(".")[0]}.`}
              </Text>
            </Hero.Body>
            <Hero.Actions>
              {
                <Link
                  href={`/tv-shows/${popularTvShows.results[0].id}`}
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
          title="Popular TV shows"
          resourceName="tv-shows"
          resources={popularTvShows?.results as ResourceProps<TvShowProps>[]}
          loading={popularTvShowsLoading}
          error={popularTvShowsError}
          noResultsText="No TV shows found"
        />
        <ReqCarouselResult
          title="Top rated TV shows"
          resourceName="tv-shows"
          resources={topRatedTvShows?.results as ResourceProps<TvShowProps>[]}
          loading={topRatedTvShowsLoading}
          error={topRatedTvShowsError}
          noResultsText="No TV shows found"
        />
        <ReqCarouselResult
          title="TV shows now airing"
          resourceName="tv-shows"
          resources={nowAiringTvShows?.results as ResourceProps<TvShowProps>[]}
          loading={nowAiringTvShowsLoading}
          error={nowAiringTvShowsError}
          noResultsText="No TV shows found"
        />
      </>
    </>
  );
}
