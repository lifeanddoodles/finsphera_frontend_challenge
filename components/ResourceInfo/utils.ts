import { ResourceDetailsProps } from "@/components/ResourceInfo/ResourceInfo.types";
import { PossibleKeyValueTypes } from "./ResourceInfo.types";

export const tabTitles = {
  overview: "Overview",
  videos: "Videos",
  photos: "Photos",
};

export const movieMetaTitles = {
  release_date: "Released",
  "credits.crew?job=Director": "Director",
  revenue: "Revenue",
  status: "Status",
  "[production_companies].name": "Production",
  runtime: "Runtime",
  budget: "Budget",
  "[genres].name": "Genre",
  "[spoken_languages].name": "Language",
} as const;

export const tvShowMetaTitles = {
  "credits.crew?job=Director": "Director",
  status: "Status",
  "[production_companies].name": "Production",
  "[genres].name": "Genre",
  "[spoken_languages].name": "Language",
} as const;

/**
 * TODO: Fix type errors
 */
export function getKeyValue<T>(key: string, resource: ResourceDetailsProps<T>) {
  if (key.includes("[")) {
    const keyTuple = key.replace(/\[|\]/g, "").split(".");
    const keyName = keyTuple[0] as keyof ResourceDetailsProps<T>;
    const valuePath = keyTuple[1];

    return resource[keyName]
      .map(
        (item: { [currentKey: string]: PossibleKeyValueTypes }) =>
          item[valuePath]
      )
      .join(", ");
  }

  if (key.includes(".")) {
    const pathSteps = key.split(".");
    let currentStepValue = resource;

    pathSteps.forEach((step) => {
      if (step.includes("?")) {
        const currentStepWithQuery = step.split("?");
        const currentStepName = currentStepWithQuery[0];
        const queryKey = currentStepWithQuery[1].split("=")[0];
        const queryValue = currentStepWithQuery[1].split("=")[1];
        currentStepValue = currentStepValue[currentStepName];

        if (Array.isArray(currentStepValue)) {
          const match = currentStepValue.find(
            (item) => item[queryKey] === queryValue
          );
          currentStepValue = match?.name;
        }
      } else {
        currentStepValue = currentStepValue[step];
      }
    });

    return currentStepValue;
  }

  return resource[key as keyof ResourceDetailsProps<T>];
}
