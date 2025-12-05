// ✅ REFACTORED: Extract predicates into named functions
// Each predicate function has a clear, self-documenting name
// This example is inspired by the Tennis Kata and Gilded Rose Kata

interface Item {
  name: string;
  sellIn: number;
  quality: number;
}

// ✅ PREDICATE FUNCTIONS: Each one has a clear, intention-revealing name

function isAgedBrie(item: Item): boolean {
  return item.name === 'Aged Brie';
}

function isBackstagePass(item: Item): boolean {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert';
}

function isSulfuras(item: Item): boolean {
  return item.name === 'Sulfuras, Hand of Ragnaros';
}

function isSpecialItem(item: Item): boolean {

  return isAgedBrie(item) || isBackstagePass(item) || isSulfuras(item);
}

function hasQualityToDecrease(item: Item): boolean {
  return item.quality > 0;
}

function hasQualityToIncrease(item: Item): boolean {
  return item.quality < 50;
}

function hasExpired(item: Item): boolean {
  return item.sellIn < 0;
}



// ✅ BUSINESS RULE PREDICATES: Combine simple predicates into meaningful rules

function shouldDecreaseQuality(item: Item): boolean {
  // Normal items decrease in quality
  // Special items don't decrease

  return !isSpecialItem(item) && hasQualityToDecrease(item);
}

function shouldIncreaseQuality(item: Item): boolean {
  // Aged Brie and Backstage passes increase in quality
  // But only if quality hasn't reached max
  return (isAgedBrie(item) || isBackstagePass(item)) && hasQualityToIncrease(item);
}

function shouldIncreaseQualityMoreRapidly(item: Item): boolean {
  // Backstage passes increase more rapidly as the concert approaches
  return isBackstagePass(item) && (hasExpired(item) === false) && hasQualityToIncrease(item);
  //TODO find something to refactor here
}

function shouldLoseAllQualityAfterEvent(item: Item): boolean {
  // Backstage passes lose all value after the concert
  return isBackstagePass(item) && hasExpired(item);
}

// ✅ ORCHESTRATOR: Now the logic is crystal clear
function updateItemQuality(item: Item): void {
  if (shouldDecreaseQuality(item)) {
    item.quality = item.quality - 1;
  }

  if (shouldIncreaseQuality(item)) {
    item.quality = item.quality + 1;
  }

  if (shouldIncreaseQualityMoreRapidly(item)) {
    item.quality = item.quality + 1;
  }

  if (shouldLoseAllQualityAfterEvent(item)) {
    item.quality = 0;
  }
}

// ✅ BENEFITS OF THIS APPROACH:
// 1. Each predicate has a clear, intention-revealing name
// 2. The main logic reads like business rules, not boolean algebra
// 3. Easy to test each business rule independently
// 4. Easy to modify or extend business rules
// 5. Reduces cognitive load when reading the code
// 6. Eliminates duplication of item name checks
// 7. Self-documenting: the code explains the "why", not just the "what"
// 8. Easy to debug: can test predicates in isolation
// 9. Follows the principle of "Tell, Don't Ask"
// 10. Easier to onboard new developers to the codebase
