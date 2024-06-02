"use client";
import Carousel from "@/components/Carousel";
import {
  ResourceProps,
  TvShowProps,
} from "@/components/Carousel/Carousel.types";
import Heading from "@/components/Heading";
import Hero from "@/components/Hero";
import Text from "@/components/Text";
import { BASE_IMAGE_URL, BASE_URL } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TvShowsCategory() {
  const [tvShows, setTvShows] = useState<ResourceProps<TvShowProps>[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResources = async () =>
      await Promise.all([
        fetch(
          `${BASE_URL}/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        ).then(async (res) => {
          const resJson = await res.json();
          setTvShows(resJson.results);
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
      {tvShows && tvShows[0] && (
        <Hero imageSrc={`${BASE_IMAGE_URL}/w1280/${tvShows[0].backdrop_path}`}>
          <Hero.Title>
            <Heading
              level={1}
              className="text-3xl sm:text-4xl xl:text-4xl mb-4 text-white"
            >
              {tvShows[0].name}
            </Heading>
          </Hero.Title>
          <Hero.Body>
            <Text className="text-sm mb-4">
              {`${tvShows[0].overview.split(".")[0]}.`}
            </Text>
          </Hero.Body>
          <Hero.Actions>
            {
              <Link
                href={`/movies/${tvShows[0].id}`}
                className="btn btn-primary bg-accent hover:bg-accent-dark px-6 py-2 rounded-lg"
              >
                See more details
              </Link>
            }
          </Hero.Actions>
        </Hero>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <Text role="status">{error}</Text>
      ) : (
        tvShows && (
          <Carousel
            title="Popular TV Shows"
            resourceName="tv-shows"
            resources={tvShows}
            width={240}
            height={360}
          />
        )
      )}
    </>
  );
}
