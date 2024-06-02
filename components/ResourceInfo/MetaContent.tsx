import {
  DescriptionDetails,
  DescriptionTerm,
} from "@/components/DescriptionList";
import { ResourceDetailsProps } from "@/components/ResourceInfo/ResourceInfo.types";
import { Fragment } from "react";
import { getKeyValue } from "./utils";

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
}) =>
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
