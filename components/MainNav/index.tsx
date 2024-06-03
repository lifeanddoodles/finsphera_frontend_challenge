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
  {
    title: "Sign up",
    iconSrc: "/user.svg",
    href: "/signup",
  },
];

/**
 * Renders a navigation item with a title, icon, and link.
 *
 * @param {string} title - The title of the navigation item.
 * @param {string} iconSrc - The source URL of the icon image.
 * @param {string} href - The URL to navigate to when the item is clicked.
 * @return {JSX.Element} The rendered navigation item.
 */
const NavItem = ({
  title,
  iconSrc,
  href,
}: {
  title: string;
  iconSrc: string;
  href: string;
}): JSX.Element => {
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
