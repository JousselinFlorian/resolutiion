"use client";

import { addBook } from "@/actions/books";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState, useTransition } from "react";
import { Body } from "./Text";
import { siteConfig } from "@/config/site";

export const NewBookForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            try {
                await addBook(formData);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 5000)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else if (typeof error === 'string') {
                    setError(error);
                } else {
                    setError('An unknown error occurred');
                }
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
                label="Book Title"
                name="title"
                placeholder="Enter book title"
                variant="flat"
                disabled={isPending}
            />
            <Input
                label="Author"
                name="author"
                placeholder="Enter author name"
                variant="flat"
                disabled={isPending}
            />
            {error &&
                <div className="rounded-lg p-4 bg-red-300">
                    <Body className="text-red-600">
                        {error}
                    </Body>
                </div>
            }
            {success &&
                <div className="rounded-lg p-4 bg-green-300">
                    <Body className="text-green-600">
                        {siteConfig.pages.newBook.bookAdded}
                    </Body>
                </div>
            }
            <div className="flex justify-end pt-2">
                <Button type="submit" color="primary" className="min-w-20" isLoading={isPending}>
                    Add Book
                </Button>
            </div>
        </form>
    );
};
