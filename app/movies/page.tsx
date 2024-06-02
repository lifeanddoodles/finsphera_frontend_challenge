"use client";
import Carousel from "@/components/Carousel";
import {
  MovieProps,
  ResourceProps,
} from "@/components/Carousel/Carousel.types";
import Heading from "@/components/Heading";
import Hero from "@/components/Hero";
import Loading from "@/components/Loading";
import Text from "@/components/Text";
import { BASE_IMAGE_URL, BASE_URL } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MoviesCategory() {
  const [popularMovies, setPopularMovies] = useState<
    ResourceProps<MovieProps>[] | []
  >([]);
  const [topRatedMovies, setTopRatedMovies] = useState<
    ResourceProps<MovieProps>[] | []
  >([]);
  const [upcomingMovies, setUpcomingMovies] = useState<
    ResourceProps<MovieProps>[] | []
  >([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<
    ResourceProps<MovieProps>[] | []
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResources = async () =>
      await Promise.all([
        fetch(
          `${BASE_URL}/movie/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        ).then(async (res) => {
          const resJson = await res.json();
          setPopularMovies(resJson.results);
        }),
        fetch(
          `${BASE_URL}/movie/top_rated?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        ).then(async (res) => {
          const resJson = await res.json();
          setTopRatedMovies(resJson.results);
        }),
        fetch(
          `${BASE_URL}/movie/upcoming?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        ).then(async (res) => {
          const resJson = await res.json();
          setUpcomingMovies(resJson.results);
        }),
        fetch(
          `${BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        ).then(async (res) => {
          const resJson = await res.json();
          setNowPlayingMovies(resJson.results);
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
      {popularMovies && popularMovies[0] && (
        <Hero
          imageSrc={`${BASE_IMAGE_URL}/w1280/${popularMovies[0].backdrop_path}`}
        >
          <Hero.Title>
            <Heading
              level={1}
              className="text-3xl sm:text-4xl xl:text-4xl mb-4 text-white"
            >
              {popularMovies[0].title}
            </Heading>
          </Hero.Title>
          <Hero.Body>
            <Text className="text-sm mb-4">
              {`${popularMovies[0].overview.split(".")[0]}.`}
            </Text>
          </Hero.Body>
          <Hero.Actions>
            {
              <Link
                href={`/movies/${popularMovies[0].id}`}
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
          {popularMovies && (
            <Carousel
              title="Popular movies"
              resourceName="movies"
              resources={popularMovies}
              width={240}
              height={360}
            />
          )}
          {topRatedMovies && (
            <Carousel
              title="Top rated movies"
              resourceName="movies"
              resources={topRatedMovies}
              width={240}
              height={360}
            />
          )}
          {upcomingMovies && (
            <Carousel
              title="Upcoming movies"
              resourceName="movies"
              resources={upcomingMovies}
              width={240}
              height={360}
            />
          )}
          {nowPlayingMovies && (
            <Carousel
              title="Movies now playing"
              resourceName="movies"
              resources={nowPlayingMovies}
              width={240}
              height={360}
            />
          )}
        </>
      )}
    </>
  );
}
