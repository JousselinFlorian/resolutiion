"use server"

import { siteConfig } from "@/config/site"
import { normaliseInput } from "@/helpers/books"
import { prisma } from "@/lib/prisma"
import { Prisma, ReadStatus } from "@prisma/client"
import { revalidatePath, unstable_cache } from "next/cache"
import { getMockUserId } from "./users"

export async function addBook(formData: FormData) {
    const title = normaliseInput((formData.get("title") as string)?.trim())
    const author = normaliseInput((formData.get("author") as string)?.trim())

    if (!title || !author) {
        throw new Error(siteConfig.pages.newBook.errors.emptyField)
    }

    if (title.length > 50 || author.length > 50) {
        throw new Error(siteConfig.pages.newBook.errors.tooLongField)
    }

    try {
        await prisma.book.create({
            data: { title, author },
        })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            throw new Error(siteConfig.pages.newBook.errors.uniqueTitle)
        }
        throw new Error(siteConfig.pages.newBook.errors.generic)
    }

    revalidatePath("/")
}

export const getBooks = unstable_cache(
    async () => {
        try {
            const books = await prisma.book.findMany({
                orderBy: { createdAt: 'desc' },
                take: 20,
                skip: 0,
                include: {
                    userReads: {
                        where: {
                            userId: await getMockUserId()
                        }
                    }
                }
            });
            return books;
        } catch (error) {
            throw new Error('Failed to fetch books');
        }
    },
    ['books'],
    {
        tags: ['books'],
        revalidate: 300 // Cache for 5 minutes
    }
);

export async function updateBookReadStatus(bookId: number, isRead: boolean) {
    try {
        const userId = await getMockUserId();

        if (isRead) {
            await prisma.userRead.upsert({
                where: {
                    userId_bookId: {
                        userId,
                        bookId
                    }
                },
                update: {
                    status: ReadStatus.READ
                },
                create: {
                    userId,
                    bookId,
                    status: ReadStatus.READ
                }
            });
        } else {
            await prisma.userRead.deleteMany({
                where: {
                    userId,
                    bookId
                }
            });
        }

        revalidatePath("/");
    } catch (error) {
        throw new Error('Failed to update read status');
    }
}