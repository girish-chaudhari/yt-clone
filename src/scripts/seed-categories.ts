// TODO: Create a script to seed categories

import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "Card & vehicles",
  "Comedy",
  "Education",
  "Entertainment",
  "Film & animation",
  "How-to & Style",
  "Music",
  "News & politics",
  "People & blogs",
  "Pets & animals",
  "Science & technology",
  "Sports",
  "Travel & events",
]

async function  main () {
  console.log('Seeding categories...');

  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videos related to ${name.toLowerCase()}`,
    }));

    await db
    .insert(categories).values(values);

    console.log('Categories seeded successfully!');

  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

main()
