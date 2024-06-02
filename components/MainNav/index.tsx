import Text from "@/components/Text";
import Image from "next/image";
import Link from "next/link";

const mainNavItems = [
  {
    title: "Home",
    iconSrc: "/house.svg",
    href: "/",
  },
  {
    title: "Movies",
    iconSrc: "/film.svg",
    href: "/movies",
  },
  {
    title: "TV Shows",
    iconSrc: "/tv.svg",
    href: "/tv-shows",
  },
  {
    title: "Search",
    iconSrc: "/search.svg",
    href: "/search",
  },
];

const NavItem = ({
  title,
  iconSrc,
  href,
}: {
  title: string;
  iconSrc: string;
  href: string;
}) => {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 text-white p-4 leading-4 hover:bg-primary-dark transition duration-300 ease-in-out"
      >
        <Image
          src={iconSrc}
          className="filter invert"
          width={24}
          height={24}
          alt=""
        />
        <Text className="sr-only">{title}</Text>
      </Link>
    </li>
  );
};

const MainNav = () => {
  return (
    <nav className="z-50 fixed bottom-0 left-0 right-0 sm:left-auto sm:right-auto sm:top-0 bg-primary px-4 sm:px-0 sm:py-4 sm:row-start-1 sm:row-end-3">
      <ul className="flex gap-4 justify-center sm:flex-col">
        {mainNavItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;
