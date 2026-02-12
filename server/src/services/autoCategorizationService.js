import prisma from "../prismaClient.js";

function normalizationHelper(input) {
    const normalizedText = input.toLowerCase().replace(/[^\p{L}\p{N}\s]+/gu, " ").replace(/\s+/g, ' ').trim();

    const words = normalizedText ? normalizedText.split(' ').filter(Boolean) : [];

    return { normalizedText, words };
}

export async function autoCategorize(userId, description) {
    const { normalizedText, words } = normalizationHelper(description);

    if (!normalizedText) return null;

    const keywords = await prisma.categoryKeyword.findMany({
        where: { userId },
        select: {
            keyword: true,
            categoryId: true,
        }
    })

    const matches = [];

    for (const { keyword, categoryId } of keywords) {
        if (!keyword) continue;

        if (keyword.includes(' ')) {
            if (normalizedText.includes(keyword)) {
                matches.push({ keyword, categoryId });
            }
        } else {
            if (words.includes(keyword)) {
                matches.push({ keyword, categoryId })
            }
        }
    }

    if (matches.length === 0) return null;

    matches.sort((a, b) => {
        const lenDiff = b.keyword.length - a.keyword.length;

        if (lenDiff !== 0) return lenDiff;

        return a.keyword.localeCompare(b.keyword);
    })

    const winner = matches[0];

    return { categoryId: winner.categoryId, matchedKeyword: winner.keyword };
}