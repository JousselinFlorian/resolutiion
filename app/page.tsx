import { Title } from "@/components/Text";
import { siteConfig } from "@/config/site";

export default function BooksPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-12">
      <div className="inline-block max-w-xl text-center justify-center">
        <Title>{siteConfig.pages.books.title}</Title>
      </div>
      <div className="flex flex-col w-full max-w-xl items-center">

      </div>
    </section>
  );
}
