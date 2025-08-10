"use server"

import { prisma } from "@/lib/prisma";

// Mock user ID (in a real app, this would come from authentication)
const MOCK_USER_ID = "mock-user-id";

export async function getOrCreateMockUser() {
    try {
        // Try to find existing mock user
        let user = await prisma.user.findUnique({
            where: { id: MOCK_USER_ID }
        });

        // If not found, create mock user
        if (!user) {
            user = await prisma.user.create({
                data: {
                    id: MOCK_USER_ID,
                    email: "mock@resolutiion.com"
                }
            });
        }

        return user;
    } catch (error) {
        throw new Error('Failed to get or create user');
    }
}

export async function getMockUserId(): Promise<string> {
    const user = await getOrCreateMockUser();
    return user.id;
} 