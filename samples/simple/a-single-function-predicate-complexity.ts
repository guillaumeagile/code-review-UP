// ❌ CODE SMELL: Complex predicates with nested AND/OR logic
// This example is inspired by the Gilded Rose Kata https://github.com/emilybache/GildedRose-Refactoring-Kata
// The logic is obscured by complex boolean conditions

interface Item {
  name: string;
  sellIn: number;
  quality: number;
}

// ❌ ANTI-PATTERN: Complex predicates make the intention unclear
function updateItemQuality(item: Item): void {
  // Update quality based on complex conditions
  if (
    (item.name !== 'Aged Brie' && item.name !== 'Backstage passes to a TAFKAL80ETC concert' && item.quality > 0 && (item.name !== 'Sulfuras, Hand of Ragnaros')) ||
    (item.sellIn < 0 && item.name !== 'Aged Brie' && item.name !== 'Backstage passes to a TAFKAL80ETC concert' && item.quality > 0)
  ) {
    item.quality = item.quality - 1;
  }

  // Increase quality for special items
  if (
    (item.name === 'Aged Brie' || item.name === 'Backstage passes to a TAFKAL80ETC concert') &&
    item.quality < 50 &&
    (item.sellIn > 0 || item.name === 'Backstage passes to a TAFKAL80ETC concert')
  ) {
    item.quality = item.quality + 1;
  }

  // Handle expired backstage passes
  if (
    item.name === 'Backstage passes to a TAFKAL80ETC concert' &&
    item.sellIn < 0 &&
    (item.quality > 0)
  ) {
    item.quality = 0;
  }
}

// ❌ PROBLEMS:
// 1. The intention of each condition is hidden behind complex boolean logic
// 2. Hard to understand what each if statement is trying to achieve
// 3. Difficult to test individual business rules
// 4. Easy to introduce bugs when modifying conditions
// 5. Violates the principle of "self-documenting code"
// 6. The AND/OR combinations are hard to parse mentally
// 7. Duplication of item name checks across conditions
