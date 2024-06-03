import { ResourceDetailsProps } from "@/components/ResourceInfo/ResourceInfo.types";
import { MetaContent } from "./MetaContent";

/**
 * Renders two columns of meta content based on the provided items and resource.
 *
 * @param {Record<string, string>} items - The items to render in the meta content.
 * @param {ResourceDetailsProps<R>} resource - The resource details.
 * @return {JSX.Element} The rendered meta content columns.
 */
export const MetaContentColumns = <T extends Record<string, string>, R>({
  items,
  resource,
}: {
  items: T;
  resource: ResourceDetailsProps<R>;
}): JSX.Element => (
  <>
    <div className="grid grid-cols-[auto,_1fr] gap-x-4 gap-y-1 auto-rows-min">
      <MetaContent
        items={items}
        resource={resource}
        start={0}
        end={Math.ceil(Object.keys(items).length / 2)}
      />
    </div>
    <div className="grid grid-cols-[auto,_1fr] gap-x-4 gap-y-1 auto-rows-min">
      <MetaContent
        items={items}
        resource={resource as ResourceDetailsProps<R>}
        start={Math.ceil(Object.keys(items).length / 2)}
      />
    </div>
  </>
);
