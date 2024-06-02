"use client";
import Carousel from "@/components/Carousel";
import {
  ResourceProps,
  TvShowProps,
} from "@/components/Carousel/Carousel.types";
import Heading from "@/components/Heading";
import Hero from "@/components/Hero";
import Loading from "@/components/Loading";
import Text from "@/components/Text";
import { BASE_IMAGE_URL, BASE_URL } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TvShowsCategory() {
  const [popularTvShows, setPopularTvShows] = useState<
    ResourceProps<TvShowProps>[] | []
  >([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState<
    ResourceProps<TvShowProps>[] | []
  >([]);
  const [nowAiringTvShows, setNowAiringTvShows] = useState<
    ResourceProps<TvShowProps>[] | []
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResources = async () =>
      await Promise.all([
        fetch(
          `${BASE_URL}/tv/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        ).then(async (res) => {
          const resJson = await res.json();
          setPopularTvShows(resJson.results);
        }),
        fetch(
          `${BASE_URL}/tv/top_rated?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        ).then(async (res) => {
          const resJson = await res.json();
          setTopRatedTvShows(resJson.results);
        }),
        fetch(
          `${BASE_URL}/tv/on_the_air?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        ).then(async (res) => {
          const resJson = await res.json();
          setNowAiringTvShows(resJson.results);
        }),
      ])
        .finally(() => setLoading(false))
        .catch((err) => {
          setError(err);
          setLoading(false);
        });

    getResources();
  }, []);

  return (
    <>
      {popularTvShows && popularTvShows[0] && (
        <Hero
          imageSrc={`${BASE_IMAGE_URL}/w1280/${popularTvShows[0].backdrop_path}`}
        >
          <Hero.Title>
            <Heading
              level={1}
              className="text-3xl sm:text-4xl xl:text-4xl mb-4 text-white"
            >
              {popularTvShows[0].name}
            </Heading>
          </Hero.Title>
          <Hero.Body>
            <Text className="text-sm mb-4">
              {`${popularTvShows[0].overview.split(".")[0]}.`}
            </Text>
          </Hero.Body>
          <Hero.Actions>
            {
              <Link
                href={`/movies/${popularTvShows[0].id}`}
                className="btn btn-primary bg-accent hover:bg-accent-dark px-6 py-2 rounded-lg"
              >
                See more details
              </Link>
            }
          </Hero.Actions>
        </Hero>
      )}
      {loading ? (
        <Loading />
      ) : error ? (
        <Text role="status">{error}</Text>
      ) : (
        <>
          {popularTvShows && (
            <Carousel
              title="Popular TV shows"
              resourceName="tv-shows"
              resources={popularTvShows}
              width={240}
              height={360}
            />
          )}
          {topRatedTvShows && (
            <Carousel
              title="Top rated TV shows"
              resourceName="tv-shows"
              resources={topRatedTvShows}
              width={240}
              height={360}
            />
          )}
          {nowAiringTvShows && (
            <Carousel
              title="TV shows now airing"
              resourceName="tv-shows"
              resources={nowAiringTvShows}
              width={240}
              height={360}
            />
          )}
        </>
      )}
    </>
  );
}
