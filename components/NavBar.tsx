import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import NextLink from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <HeroUINavbar className="border-b-1 border-neutral-200 dark:border-neutral-600/50" maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              src="/images/logo.webp"
              width={150}
              height={20}
              alt="Resolutiion Logo"
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            color="primary"
            href={siteConfig.links.addBook.href}
          >
            {siteConfig.links.addBook.label}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
