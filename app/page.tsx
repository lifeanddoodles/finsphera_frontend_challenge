"use client";
import Carousel from "@/components/Carousel";
import {
  MovieProps,
  ResourceProps,
  TvShowProps,
} from "@/components/Carousel/Carousel.types";
import Text from "@/components/Text";
import { BASE_URL } from "@/utils/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<ResourceProps<MovieProps>[] | []>([]);
  const [tvShows, setTvShows] = useState<ResourceProps<TvShowProps>[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResources = async () =>
      await Promise.all([
        fetch(
          `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        ).then(async (res) => {
          const resJson = await res.json();
          setMovies(resJson.results);
        }),
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
    <main className="flex min-h-screen flex-col">
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
        <div className="overflow-hidden">
          {movies && (
            <Carousel
              title="Popular movies"
              resourceName="movies"
              resources={movies}
              width={240}
              height={360}
            />
          )}
          {tvShows && (
            <Carousel
              title="Popular TV Shows"
              resourceName="tv-shows"
              resources={tvShows}
              width={240}
              height={360}
            />
          )}
        </div>
      )}
    </main>
  );
}
