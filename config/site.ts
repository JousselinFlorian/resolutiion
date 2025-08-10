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
      bookAdded: "The book has been added successfully.",
      errors: {
        emptyField: "The book title and author name are required.",
        tooLongField: "The book title and author name must be less than 50 characters.",
        uniqueTitle: "A book with this title already exists.",
        generic: "An unknown error occurred.",
      },
    },
  },
  links: {
    addBook: {
      label: "New Book",
      href: "/new",
    },
  },
};
