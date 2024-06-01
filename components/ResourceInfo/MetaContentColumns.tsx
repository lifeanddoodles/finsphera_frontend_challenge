import { ResourceDetailsProps } from "@/components/ResourceInfo/ResourceInfo.types";
import { MetaContent } from "./MetaContent";

export const MetaContentColumns = <T extends Record<string, string>, R>({
  items,
  resource,
}: {
  items: T;
  resource: ResourceDetailsProps<R>;
}) => (
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
