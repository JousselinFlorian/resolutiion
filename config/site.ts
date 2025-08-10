export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Resolutiion Interview",
  description: "This would simplify to have every string into a centralised file for future translations.",
  navMenuItems: [
    {
      label: "Books",
      href: "/",
    },
    {
      label: "New Book",
      href: "/new",
    },
  ],
  pages: {
    books: {
      title: "Books",
    },
    newBook: {
      title: "New Book",
    },
  },
  links: {
    addBook: {
      label: "New Book",
      href: "/new",
    },
  },
};
