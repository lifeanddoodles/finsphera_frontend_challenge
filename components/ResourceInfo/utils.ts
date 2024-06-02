import { ResourceDetailsProps } from "@/components/ResourceInfo/ResourceInfo.types";
import { PossibleKeyValueTypes } from "./ResourceInfo.types";

export const tabTitles = [
  { name: "Overview", controls: "panel-overview" },
  { name: "Videos", controls: "panel-videos" },
  { name: "Photos", controls: "panel-photos" },
];

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

export function getKeyValue<T>(key: string, resource: ResourceDetailsProps<T>) {
  if (key.includes("[")) {
    const keyTuple = key.replace(/\[|\]/g, "").split(".");
    const keyName = keyTuple[0] as keyof ResourceDetailsProps<T>;
    const valuePath = keyTuple[1];

    return (resource[keyName] as [])
      .map(
        (item: {
          [currentKey: string]: {
            [key: string]: PossibleKeyValueTypes<typeof resource>;
          };
        }) => item[valuePath]
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
        currentStepValue = currentStepValue[
          currentStepName as keyof ResourceDetailsProps<T>
        ] as typeof currentStepValue;

        if (Array.isArray(currentStepValue)) {
          const match = currentStepValue.find(
            (item) => item[queryKey] === queryValue
          );
          currentStepValue = match?.name;
        }
      } else {
        currentStepValue = currentStepValue[
          step as keyof ResourceDetailsProps<T>
        ] as typeof currentStepValue;
      }
    });

    return currentStepValue;
  }

  return resource[key as keyof ResourceDetailsProps<T>];
}
