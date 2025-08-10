"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Book } from "@prisma/client";
import { Body } from "../generic/Text";
import { siteConfig } from "@/config/site";

interface BookGridProps {
    books: Book[];
}

export const BookGrid = ({ books }: BookGridProps) => {
    if (!books || books.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-default-600 dark:text-default-400">
                        {siteConfig.pages.books.errors.noBooks}
                    </h3>
                    <p className="text-sm text-default-500 dark:text-default-400 mt-2">
                        {siteConfig.pages.books.errors.startAdding}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {books.map((book: Book) => (
                <Card
                    key={book.id}
                    className="w-full cursor-pointer"
                    isPressable
                >
                    <CardHeader className="flex justify-between items-start pb-2">
                        <Body className="text-black dark:text-white">
                            {book.title}
                        </Body>
                    </CardHeader>
                    <CardBody>
                        <p className="text-sm text-default-600 dark:text-default-400">
                            by <span className="font-medium">{book.author}</span>
                        </p>
                        <p className="text-xs text-default-500 dark:text-default-400 mt-2">
                            Added {new Date(book.createdAt).toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}; 