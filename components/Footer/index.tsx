import ExternalLink from "@/components/ExternalLink";
import Text from "@/components/Text";

const Footer = () => {
  return (
    <div className="px-6 py-4 mb-16 sm:mb-0 sm:col-start-2">
      <Text size="sm" className="text-center">
        Data provided by{" "}
        <ExternalLink
          href="https://www.themoviedb.org/"
          className="inline underline"
        >
          TMDB
        </ExternalLink>
      </Text>
    </div>
  );
};

export default Footer;
