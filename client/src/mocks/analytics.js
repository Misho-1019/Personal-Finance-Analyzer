export const mockMonthlySummary = {
  from: "2023-09-01",
  to: "2024-02-14",
  periods: [
    { period: "2023-09", incomeCents: 450000, expenseCents: 320000, netCents: 130000 },
    { period: "2023-10", incomeCents: 450000, expenseCents: 350000, netCents: 100000 },
    { period: "2023-11", incomeCents: 480000, expenseCents: 310000, netCents: 170000 },
    { period: "2023-12", incomeCents: 600000, expenseCents: 550000, netCents: 500000 },
    { period: "2024-01", incomeCents: 500000, expenseCents: 340000, netCents: 160000 },
    { period: "2024-02", incomeCents: 500000, expenseCents: 150000, netCents: 350000 },
  ],
  totalIncomeCents: 2980000,
  totalExpenseCents: 2020000,
  totalNetCents: 960000,
};

export const mockCategoriesSummary = {
  from: "2024-02-01",
  to: "2024-02-14",
  type: "EXPENSE",
  totalCents: 150000,
  items: [
    { categoryId: "cat_2", categoryName: "Rent", amountCents: 120000, txCount: 1, share: 0.8 },
    { categoryId: "cat_1", categoryName: "Groceries", amountCents: 15000, txCount: 4, share: 0.1 },
    { categoryId: "cat_5", categoryName: "Transport", amountCents: 10000, txCount: 2, share: 0.066 },
    { categoryId: "cat_4", categoryName: "Entertainment", amountCents: 5000, txCount: 1, share: 0.034 },
  ],
};
