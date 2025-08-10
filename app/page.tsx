import { Title } from "@/components/generic/Text";
import { BookGrid } from "@/components/app/BookGrid";
import { getBooks } from "@/actions/books";
import { siteConfig } from "@/config/site";

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <section className="flex flex-col items-center justify-center gap-12">
      <div className="inline-block max-w-xl text-center justify-center">
        <Title>{siteConfig.pages.books.title}</Title>
      </div>
      <div className="flex flex-col w-full max-w-7xl items-center px-4">
        <BookGrid books={books} />
      </div>
    </section>
  );
}
