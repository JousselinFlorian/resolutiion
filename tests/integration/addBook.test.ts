import { addBook, getBooks } from '../../actions/books';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

jest.mock('../../lib/prisma', () => ({
    prisma: {
        book: {
            create: jest.fn(),
            findMany: jest.fn(),
        },
        userRead: {
            upsert: jest.fn(),
            deleteMany: jest.fn(),
        },
    },
}));

jest.mock('next/cache', () => ({
    revalidatePath: jest.fn(),
    unstable_cache: jest.fn((fn) => fn),
}));

jest.mock('../../actions/users', () => ({
    getMockUserId: jest.fn(() => 'mock-user-id'),
}));

jest.mock('../../config/site', () => ({
    siteConfig: {
        pages: {
            newBook: {
                errors: {
                    emptyField: 'The book title and author name are required.',
                    tooLongField: 'The book title and author name must be less than 50 characters.',
                    uniqueTitle: 'A book with this title already exists.',
                    generic: 'An unknown error occurred.',
                },
            },
        },
    },
}));

describe('Add Book Integration', () => {
    const mockPrisma = require('../../lib/prisma').prisma;
    const mockRevalidatePath = require('next/cache').revalidatePath;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('addBook', () => {
        it('should successfully add a book with valid data', async () => {
            const formData = new FormData();
            formData.append('title', 'The Great Gatsby');
            formData.append('author', 'F. Scott Fitzgerald');

            mockPrisma.book.create.mockResolvedValue({
                id: 1,
                title: 'The great gatsby',
                author: 'F scott fitzgerald',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            await addBook(formData);

            expect(mockPrisma.book.create).toHaveBeenCalledWith({
                data: {
                    title: 'The great gatsby',
                    author: 'F scott fitzgerald',
                },
            });
            expect(mockRevalidatePath).toHaveBeenCalledWith('/');
        });

        it('should throw error when title is empty', async () => {
            const formData = new FormData();
            formData.append('title', '');
            formData.append('author', 'F. Scott Fitzgerald');

            await expect(addBook(formData)).rejects.toThrow(
                'The book title and author name are required.'
            );
            expect(mockPrisma.book.create).not.toHaveBeenCalled();
        });

        it('should throw error when author is empty', async () => {
            const formData = new FormData();
            formData.append('title', 'The Great Gatsby');
            formData.append('author', '');

            await expect(addBook(formData)).rejects.toThrow(
                'The book title and author name are required.'
            );
            expect(mockPrisma.book.create).not.toHaveBeenCalled();
        });

        it('should throw error when title is too long', async () => {
            const formData = new FormData();
            formData.append('title', 'A'.repeat(51));
            formData.append('author', 'F. Scott Fitzgerald');

            await expect(addBook(formData)).rejects.toThrow(
                'The book title and author name must be less than 50 characters.'
            );
            expect(mockPrisma.book.create).not.toHaveBeenCalled();
        });

        it('should throw error when author is too long', async () => {
            const formData = new FormData();
            formData.append('title', 'The Great Gatsby');
            formData.append('author', 'A'.repeat(51));

            await expect(addBook(formData)).rejects.toThrow(
                'The book title and author name must be less than 50 characters.'
            );
            expect(mockPrisma.book.create).not.toHaveBeenCalled();
        });

        it('should throw error when book title already exists', async () => {
            const formData = new FormData();
            formData.append('title', 'The Great Gatsby');
            formData.append('author', 'F. Scott Fitzgerald');

            const duplicateError = new PrismaClientKnownRequestError('Unique constraint failed', {
                code: 'P2002',
                clientVersion: '1.0.0',
                meta: { target: ['title'] },
            });

            mockPrisma.book.create.mockRejectedValue(duplicateError);

            await expect(addBook(formData)).rejects.toThrow(
                'A book with this title already exists.'
            );
            expect(mockRevalidatePath).not.toHaveBeenCalled();
        });

        it('should throw generic error for other database errors', async () => {
            const formData = new FormData();
            formData.append('title', 'The Great Gatsby');
            formData.append('author', 'F. Scott Fitzgerald');

            mockPrisma.book.create.mockRejectedValue(new Error('Database connection failed'));

            await expect(addBook(formData)).rejects.toThrow(
                'An unknown error occurred.'
            );
            expect(mockRevalidatePath).not.toHaveBeenCalled();
        });

        it('should normalize and sanitize input data', async () => {
            const formData = new FormData();
            formData.append('title', '  The Great Gatsby!@#$%  ');
            formData.append('author', '  F. Scott Fitzgerald!@#$%  ');

            mockPrisma.book.create.mockResolvedValue({
                id: 1,
                title: 'The great gatsby',
                author: 'F scott fitzgerald',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            await addBook(formData);

            expect(mockPrisma.book.create).toHaveBeenCalledWith({
                data: {
                    title: 'The great gatsby',
                    author: 'F scott fitzgerald',
                },
            });
        });
    });

    describe('getBooks', () => {
        it('should fetch books with user read status', async () => {
            const mockBooks = [
                {
                    id: 1,
                    title: 'The Great Gatsby',
                    author: 'F. Scott Fitzgerald',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userReads: [],
                },
            ];

            mockPrisma.book.findMany.mockResolvedValue(mockBooks);

            const result = await getBooks();

            expect(mockPrisma.book.findMany).toHaveBeenCalledWith({
                orderBy: { createdAt: 'desc' },
                take: 20,
                skip: 0,
                include: {
                    userReads: {
                        where: {
                            userId: 'mock-user-id',
                        },
                    },
                },
            });
            expect(result).toEqual(mockBooks);
        });

        it('should throw error when database query fails', async () => {
            mockPrisma.book.findMany.mockRejectedValue(new Error('Database error'));

            await expect(getBooks()).rejects.toThrow('Failed to fetch books');
        });
    });
}); 