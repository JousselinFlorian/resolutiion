"use server"

import { siteConfig } from "@/config/site"
import { normaliseInput } from "@/helpers/books"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

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