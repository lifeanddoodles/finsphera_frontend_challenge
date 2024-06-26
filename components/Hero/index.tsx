import Image from "next/image";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <header>{children}</header>;
};

const Body = ({ children }: { children: React.ReactNode }) => {
  return <section role="group">{children}</section>;
};

const Actions = ({ children }: { children: React.ReactNode }) => {
  return <footer role="group">{children}</footer>;
};

/**
 * Renders a Hero component with a background image and a text overlay.
 *
 * @param {React.ReactNode} children - The content to be displayed in the Hero component.
 * @param {string} imageSrc - The URL of the background image.
 * @return {JSX.Element} The Hero component.
 */
const Hero = ({
  children,
  imageSrc,
}: {
  children: React.ReactNode;
  imageSrc: string;
}): JSX.Element => {
  return (
    <section className="relative bg-black h-fit flex flex-col justify-center items-center aspect-[3/3] 2xs:aspect-[4/3] sm:aspect-[16/9] md:aspect-[18/9] md:items-start lg:aspect-[24/9] py-8 mb-10">
      <div className="absolute w-full h-full after:absolute after:bg-[#00000080] after:w-full after:h-full after:left-0 after:top-0">
        <Image
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
          width={1280}
          height={720}
        />
      </div>
      <div className="absolute text-white px-8 z-10 max-w-[66ch]">
        {children}
      </div>
    </section>
  );
};

export default Hero;

Hero.Title = Title;
Hero.Body = Body;
Hero.Actions = Actions;
