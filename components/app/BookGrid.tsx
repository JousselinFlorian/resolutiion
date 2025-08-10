"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Switch } from "@heroui/switch";
import { Book, ReadStatus, UserRead } from "@prisma/client";
import { Body } from "../generic/Text";
import { siteConfig } from "@/config/site";
import { updateBookReadStatus } from "@/actions/books";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

interface BookWithUserReads extends Book {
    userReads: UserRead[];
}

interface BookGridProps {
    books: BookWithUserReads[];
}

export const BookGrid = ({ books }: BookGridProps) => {
    const [localReadStatus, setLocalReadStatus] = useState<Record<number, boolean>>({});

    const debouncedUpdateStatus = useDebounce(async (bookId: number, isRead: boolean) => {
        try {
            await updateBookReadStatus(bookId, isRead);
        } catch (error) {
            // Revert local state on error
            setLocalReadStatus(prev => ({ ...prev, [bookId]: !isRead }));
        }
    }, 500);

    const handleReadStatusChange = (bookId: number, isRead: boolean) => {
        setLocalReadStatus(prev => ({ ...prev, [bookId]: isRead }));
        debouncedUpdateStatus(bookId, isRead);
    };

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
            {books.map((book: BookWithUserReads) => (
                <Card
                    key={book.id}
                    className="w-full cursor-pointer"
                    isPressable
                >
                    <CardHeader className="flex justify-between items-start pb-2">
                        <div className="flex items-center gap-2">
                            <Switch
                                size="sm"
                                color="success"
                                isSelected={localReadStatus[book.id] ?? book.userReads[0]?.status === ReadStatus.READ}
                                onValueChange={(isRead) => handleReadStatusChange(book.id, isRead)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <Body className="text-black dark:text-white">
                                {book.title}
                            </Body>
                        </div>
                    </CardHeader>
                    <CardBody className="pt-0">
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