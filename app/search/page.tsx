"use client";
import Button from "@/components/Button";
import { Card } from "@/components/Carousel/Card";
import { isMovieProps } from "@/components/Carousel/utils";
import Heading from "@/components/Heading";
import { TextInput } from "@/components/Input";
import {
  MovieDetailsProps,
  ResourceDetailsProps,
  TvShowDetailsProps,
} from "@/components/ResourceInfo/ResourceInfo.types";
import Text from "@/components/Text";
import { BASE_IMAGE_URL, BASE_URL } from "@/utils/constants";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<
    ResourceDetailsProps<TvShowDetailsProps | MovieDetailsProps>[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackEnabled, setFeedbackEnabled] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setFeedbackEnabled(false);
      setResults([]);
    }
  };

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(
      `${BASE_URL}/search/multi?query=${search}&page=1&include_adult=false&language=en&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((res) => {
        setLoading(true);
        return res.json();
      })
      .then((data) => {
        setResults(data.results);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
        setFeedbackEnabled(true);
      });
  };

  return (
    <div className="flex flex-col">
      <header className="px-6 py-8">
        <form
          className="flex gap-4 w-full shrink-0"
          onSubmit={handleSubmitSearch}
        >
          <TextInput
            placeholder="Type to search"
            className="grow-1"
            value={search}
            onChange={(e) => handleOnChange(e as ChangeEvent<HTMLInputElement>)}
          />
          <Button type="submit">
            <Image
              src="/search.svg"
              className="filter invert"
              width={24}
              height={24}
              alt=""
            />
            <Text className="sr-only">Submit search</Text>
          </Button>
        </form>
      </header>
      {loading ? (
        "Loading..."
      ) : error ? (
        <Text role="status" className="text-center px-6">
          {error}
        </Text>
      ) : results.length > 0 ? (
        <section className="px-6">
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {results.map((resource) => (
              <Card
                key={resource.id}
                id={resource.id}
                posterPath={`${BASE_IMAGE_URL}/w300/${resource.poster_path}`}
                href={`/${isMovieProps(resource) ? "movies" : "tv-series"}/${resource.id}`}
                width={240}
                height={240 * 1.6}
                className={`grid-rows-[auto,_1fr]`}
              >
                <Card.Footer>
                  <Heading
                    level={3}
                    className={`p-1 text-sm sm:text-base sm:leading-tight font-medium max-w-[240px]`}
                  >
                    {isMovieProps(resource) ? resource.title : resource.name}
                  </Heading>
                  {resource.vote_average && (
                    <Text
                      as="span"
                      size="sm"
                      className="p-1 mb-2 max-w-[240px]"
                    >
                      {resource.vote_average}
                    </Text>
                  )}
                </Card.Footer>
              </Card>
            ))}
          </ul>
        </section>
      ) : (
        feedbackEnabled && (
          <Text role="status" className="text-center px-6">
            No results found
          </Text>
        )
      )}
    </div>
  );
};

export default SearchPage;
