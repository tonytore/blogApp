import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("password", 10);

  // 1. Create users
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: hashedPassword, // 🔒 Replace with a real hash later
      role: "ADMIN",
    },
  });

  const author = await prisma.user.upsert({
    where: { email: "author@example.com" },
    update: {},
    create: {
      email: "author@example.com",
      name: "Author User",
      password: hashedPassword,
      role: "AUTHOR",
      bio: "Tech blogger and developer",
    },
  });

  // 2. Create categories
  const tech = await prisma.category.create({
    data: {
      name: "Technology",
      slug: "technology",
    },
  });

  const lifestyle = await prisma.category.create({
    data: {
      name: "Lifestyle",
      slug: "lifestyle",
    },
  });

  // 3. Create tags
  const [tagNode, tagPrisma] = await Promise.all([
    prisma.tag.create({ data: { name: "Node.js", slug: "nodejs" } }),
    prisma.tag.create({ data: { name: "Prisma", slug: "prisma" } }),
  ]);

  // 4. Create a post
  const post = await prisma.post.create({
    data: {
      title: "Getting Started with Prisma ORM",
      slug: "getting-started-with-prisma-orm",
      excerpt:
        "A quick introduction to Prisma ORM and how it simplifies database access.",
      content: "This is a demo blog post content for Prisma ORM setup.",
      status: "PUBLISHED",
      publishedAt: new Date(),
      author: { connect: { id: author.id } },
      category: { connect: { id: tech.id } },
      tags: { connect: [{ id: tagNode.id }, { id: tagPrisma.id }] },
    },
  });

  // 5. Create a comment
  await prisma.comment.create({
    data: {
      text: "Great article! Thanks for the tips.",
      post: { connect: { id: post.id } },
      author: { connect: { id: admin.id } },
    },
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
