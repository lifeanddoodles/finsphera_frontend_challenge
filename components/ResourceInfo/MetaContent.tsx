import {
  DescriptionDetails,
  DescriptionTerm,
} from "@/components/DescriptionList";
import { ResourceDetailsProps } from "@/components/ResourceInfo/ResourceInfo.types";
import { Fragment } from "react";
import { getKeyValue } from "./utils";

/**
 * Renders a section of meta content based on the provided items and resource.
 *
 * @param {Record<string, string>} items - The items to render in the meta content.
 * @param {ResourceDetailsProps<R>} resource - The resource details.
 * @param {number} start - The starting index of the items to render (default: 0).
 * @param {number} end - The ending index of the items to render.
 * @return {JSX.Element[]} An array of JSX elements representing the meta content.
 */
export const MetaContent = <T extends Record<string, string>, R>({
  items,
  resource,
  start = 0,
  end,
}: {
  items: T;
  resource: ResourceDetailsProps<R>;
  start?: number;
  end?: number;
}): JSX.Element[] =>
  Object.entries(items)
    .slice(start, end)
    .map(([key, value]) => (
      <Fragment key={key}>
        <DescriptionTerm>{value}</DescriptionTerm>
        <DescriptionDetails>
          {getKeyValue(key, resource) as string}
        </DescriptionDetails>
      </Fragment>
    ));
