import prisma from "../src/prismaClient.js";
import bcrypt from "bcrypt";

async function main() {
  console.log("🌱 Seeding database...");

  // ---------- 1. Create Demo User ----------
  const passwordHash = await bcrypt.hash("123456", 10);

  const user = await prisma.user.create({
    data: {
      firstName: "Misho",
      lastName: "Todorov",
      email: "misho@abv.bg",
      passwordHash,
    },
  });

  console.log("✅ User created:", user.email);

  // ---------- 2. Create Categories ----------
  const categoriesData = [
    { name: "Food & Drinks", color: "#1E3A8A" },
    { name: "Groceries", color: "#16A34A" },
    { name: "Transport", color: "#F59E0B" },
    { name: "Bills", color: "#DC2626" },
    { name: "Subscriptions", color: "#7C3AED" },
    { name: "Shopping", color: "#0EA5E9" },
    { name: "Other", color: "#6B7280" },
  ];

  const categories = {};

  for (const category of categoriesData) {
    const created = await prisma.category.create({
      data: {
        ...category,
        userId: user.id,
      },
    });

    categories[created.name] = created;
  }

  console.log("✅ Categories created");

  // ---------- 3. Create Category Keywords ----------
  const keywordsMap = {
    "Food & Drinks": ["lunch", "cafe", "restaurant", "pizza", "coffee"],
    Groceries: ["lidl", "kaufland", "billa", "supermarket"],
    Transport: ["uber", "bolt", "taxi", "metro", "fuel"],
    Bills: ["electricity", "water", "internet", "rent"],
    Subscriptions: ["netflix", "spotify", "apple", "google"],
  };

  for (const [categoryName, keywords] of Object.entries(keywordsMap)) {
    for (const keyword of keywords) {
      await prisma.categoryKeyword.create({
        data: {
          userId: user.id,
          categoryId: categories[categoryName].id,
          keyword,
        },
      });
    }
  }

  console.log("✅ Keywords created");

  // ---------- 4. Create Transactions (Last 3 Months) ----------

  const today = new Date();

  function daysAgo(days) {
    const d = new Date();
    d.setDate(today.getDate() - days);
    return d;
  }

  const transactionsData = [
    // Income
    {
      type: "INCOME",
      amountCents: 350000,
      description: "Salary August",
      date: daysAgo(75),
    },
    {
      type: "INCOME",
      amountCents: 350000,
      description: "Salary September",
      date: daysAgo(45),
    },
    {
      type: "INCOME",
      amountCents: 350000,
      description: "Salary October",
      date: daysAgo(15),
    },

    // Food
    {
      type: "EXPENSE",
      amountCents: 1599,
      description: "Lunch at restaurant",
      date: daysAgo(70),
    },
    {
      type: "EXPENSE",
      amountCents: 899,
      description: "Coffee with friend",
      date: daysAgo(65),
    },
    {
      type: "EXPENSE",
      amountCents: 1899,
      description: "Pizza night",
      date: daysAgo(40),
    },

    // Groceries
    {
      type: "EXPENSE",
      amountCents: 6200,
      description: "Lidl weekly shopping",
      date: daysAgo(60),
    },
    {
      type: "EXPENSE",
      amountCents: 5400,
      description: "Kaufland groceries",
      date: daysAgo(30),
    },

    // Transport
    {
      type: "EXPENSE",
      amountCents: 1200,
      description: "Uber ride to office",
      date: daysAgo(50),
    },
    {
      type: "EXPENSE",
      amountCents: 7000,
      description: "Fuel for car",
      date: daysAgo(20),
    },

    // Bills
    {
      type: "EXPENSE",
      amountCents: 8500,
      description: "Electricity bill",
      date: daysAgo(55),
    },
    {
      type: "EXPENSE",
      amountCents: 4500,
      description: "Internet monthly fee",
      date: daysAgo(25),
    },

    // Subscriptions
    {
      type: "EXPENSE",
      amountCents: 1599,
      description: "Netflix subscription",
      date: daysAgo(35),
    },
    {
      type: "EXPENSE",
      amountCents: 999,
      description: "Spotify monthly",
      date: daysAgo(10),
    },
  ];

  for (const tx of transactionsData) {
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: tx.type,
        amountCents: tx.amountCents,
        date: tx.date,
        description: tx.description,
        notes: null,
      },
    });
  }

  console.log("✅ Transactions created");
  console.log("🌱 Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
