import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addUsers() {
  try {
    // Add multiple users
    const users = await prisma.user.createMany({
      data: [
        {
          name: 'Alice',
          email: 'alice@example.com',
          emailVerified: new Date('2023-12-01T10:00:00Z'),
          image: 'https://example.com/alice.jpg',
        },
        {
          name: 'Bob',
          email: 'bob@example.com',
          emailVerified: new Date('2023-11-15T14:30:00Z'),
          image: 'https://example.com/bob.jpg',
        },
        {
          name: 'Charlie',
          email: 'charlie@example.com',
          emailVerified: null,
          image: null,
        },
      ],
    });

    console.log(`${users.count} users added successfully!`);
  } catch (error) {
    console.error('Error adding users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addUsers();
