// 🎾 TENNIS KATA: Predicate Logic Best Practices
// Based on https://github.com/emilybache/Tennis-Refactoring-Kata
// Common code smells and how to fix them

// #### Key Techniques Demonstrated ######
// Short-circuit evaluation with early returns
// Named constants for implicit assumptions
// Helper predicates to reduce duplication
// Positive logic over negation
// Separation of concerns (validation vs business logic)
// Flattened logic flow using early returns

interface Player {
  name: string;
  score: number;
}

interface Game {
  player1: Player;
  player2: Player;
}

// ============================================================================
// SMELL 1: Double Negation - Hard to parse mentally
// ============================================================================

// ❌ ANTI-PATTERN: Double negation makes logic harder to understand
function isGameNotOver_BadVersion(game: Game): boolean {
  return !(game.player1.score < 4 && game.player2.score < 4);
}

// ✅ SOLUTION: Use positive logic instead
function isGameOver(game: Game): boolean {
  return game.player1.score >= 4 || game.player2.score >= 4;
}

// ✅ EVEN BETTER: Extract to named predicate
function hasPlayerReachedGamePoint(game: Game): boolean {
  return game.player1.score >= 4 || game.player2.score >= 4;
}

// ============================================================================
// SMELL 2: Negation Trap - Multiple negations create cognitive overload
// ============================================================================

// ❌ ANTI-PATTERN: Multiple negations are confusing
function canPlayerWin_BadVersion(game: Game): boolean {
  return !(game.player1.score < 3 && game.player2.score < 3) && 
         !(game.player1.score === game.player2.score);
}

// ✅ SOLUTION: Rewrite with positive logic
function canPlayerWin(game: Game): boolean {
  const bothPlayersHaveAtLeastThreePoints = game.player1.score >= 3 && game.player2.score >= 3;
  const playersAreNotTied = game.player1.score !== game.player2.score;
  return bothPlayersHaveAtLeastThreePoints && playersAreNotTied;
}

// ============================================================================
// SMELL 3: Complex AND/OR combinations - Hard to understand precedence
// ============================================================================

// ❌ ANTI-PATTERN: Confusing mix of AND/OR without clear intent
function shouldPlayer1Win_BadVersion(game: Game): boolean {
  return (game.player1.score > game.player2.score && game.player1.score >= 4) ||
         (game.player1.score === game.player2.score && game.player1.score >= 3) ||
         (game.player1.score > game.player2.score && game.player2.score >= 3);
}

// ✅ SOLUTION: Extract each condition into a named predicate
function isPlayer1AheadByAtLeastTwo(game: Game): boolean {
  return game.player1.score - game.player2.score >= 2;
}

function isPlayer1AheadByOne(game: Game): boolean {
  return game.player1.score - game.player2.score === 1;
}

function isPlayer1Ahead(game: Game): boolean {
  return game.player1.score > game.player2.score;
}

function areBothPlayersAtDeuce(game: Game): boolean {
  return game.player1.score >= 3 && game.player2.score >= 3 && 
         game.player1.score === game.player2.score;
}

function shouldPlayer1Win(game: Game): boolean {
  const player1HasWon = isPlayer1AheadByAtLeastTwo(game);
  const player1IsInAdvantage = areBothPlayersAtDeuce(game) && isPlayer1Ahead(game);
  return player1HasWon || player1IsInAdvantage;
}

// ============================================================================
// SMELL 4: Lack of Short-Circuit Evaluation - Unnecessary computation
// ============================================================================

// ❌ ANTI-PATTERN: Doesn't take advantage of short-circuit evaluation
function isValidScore_BadVersion(game: Game): boolean {
  const isPlayer1ScoreValid = game.player1.score >= 0 && game.player1.score <= 5;
  const isPlayer2ScoreValid = game.player2.score >= 0 && game.player2.score <= 5;
  return isPlayer1ScoreValid && isPlayer2ScoreValid;
}

// ✅ SOLUTION: Use short-circuit evaluation to avoid unnecessary checks
function isValidScore(game: Game): boolean {
  // If player1 score is invalid, we don't need to check player2
  if (game.player1.score < 0 || game.player1.score > 5) {
    return false;
  }
  // Only check player2 if player1 is valid
  return game.player2.score >= 0 && game.player2.score <= 5;
}

// ✅ EVEN BETTER: Extract to helper predicates
function isScoreInValidRange(score: number): boolean {
  return score >= 0 && score <= 5;
}

function areAllScoresValid(game: Game): boolean {
  return isScoreInValidRange(game.player1.score) && 
         isScoreInValidRange(game.player2.score);
}

// ============================================================================
// SMELL 5: Implicit Assumptions - Magic numbers without explanation
// ============================================================================

// ❌ ANTI-PATTERN: Magic numbers obscure business rules
function getGameStatus_BadVersion(game: Game): string {
  if (game.player1.score >= 4 && game.player1.score - game.player2.score >= 2) {
    return 'Player 1 wins';
  }
  if (game.player1.score >= 3 && game.player2.score >= 3 && 
      game.player1.score === game.player2.score) {
    return 'Deuce';
  }
  return 'Game in progress';
}

// ✅ SOLUTION: Extract magic numbers into named constants
const MINIMUM_SCORE_TO_WIN = 4;
const MINIMUM_SCORE_FOR_DEUCE = 3;
const WINNING_MARGIN = 2;

function getGameStatus(game: Game): string {
  if (hasPlayer1Won(game)) {
    return 'Player 1 wins';
  }
  if (isDeuce(game)) {
    return 'Deuce';
  }
  return 'Game in progress';
}

function hasPlayer1Won(game: Game): boolean {
  const hasReachedMinimumScore = game.player1.score >= MINIMUM_SCORE_TO_WIN;
  const hasWinningMargin = game.player1.score - game.player2.score >= WINNING_MARGIN;
  return hasReachedMinimumScore && hasWinningMargin;
}

function isDeuce(game: Game): boolean {
  const bothAtMinimumScore = game.player1.score >= MINIMUM_SCORE_FOR_DEUCE && 
                             game.player2.score >= MINIMUM_SCORE_FOR_DEUCE;
  const scoresAreEqual = game.player1.score === game.player2.score;
  return bothAtMinimumScore && scoresAreEqual;
}

// ============================================================================
// SMELL 6: Duplication in Predicates - Same checks repeated
// ============================================================================

// ❌ ANTI-PATTERN: Repeated score comparisons
function getScore_BadVersion(game: Game): string {
  if (game.player1.score >= 3 && game.player2.score >= 3 && 
      game.player1.score === game.player2.score) {
    return 'Deuce';
  }
  if (game.player1.score >= 3 && game.player2.score >= 3 && 
      game.player1.score > game.player2.score) {
    return 'Advantage Player 1';
  }
  if (game.player1.score >= 3 && game.player2.score >= 3 && 
      game.player1.score < game.player2.score) {
    return 'Advantage Player 2';
  }
  return 'Regular score';
}

// ✅ SOLUTION: Extract common conditions
function isInDeuceOrAdvantageZone(game: Game): boolean {
  return game.player1.score >= MINIMUM_SCORE_FOR_DEUCE && 
         game.player2.score >= MINIMUM_SCORE_FOR_DEUCE;
}

function getScore(game: Game): string {
  if (!isInDeuceOrAdvantageZone(game)) {
    return 'Regular score';
  }

  if (game.player1.score === game.player2.score) {
    return 'Deuce';
  }
  
  return game.player1.score > game.player2.score ? 
    'Advantage Player 1' : 
    'Advantage Player 2';
}

// ============================================================================
// SMELL 7: Mixing Concerns - Business logic with validation
// ============================================================================

// ❌ ANTI-PATTERN: Mixing validation with business logic
function calculateWinner_BadVersion(game: Game): string {
  if (!game || !game.player1 || !game.player2 || 
      game.player1.score < 0 || game.player2.score < 0 ||
      game.player1.score > 5 || game.player2.score > 5) {
    return 'Invalid game';
  }
  
  if (game.player1.score >= 4 && game.player1.score - game.player2.score >= 2) {
    return 'Player 1 wins';
  }
  
  return 'Game in progress';
}

// ✅ SOLUTION: Separate validation from business logic
function isGameValid(game: Game): boolean {
  if (!game || !game.player1 || !game.player2) {
    return false;
  }
  return areAllScoresValid(game);
}

function calculateWinner(game: Game): string {
  if (!isGameValid(game)) {
    throw new Error('Invalid game state');
  }
  
  if (hasPlayer1Won(game)) {
    return 'Player 1 wins';
  }
  
  return 'Game in progress';
}

// ============================================================================
// SMELL 8: Overly Complex Nested Conditions - Hard to follow logic flow
// ============================================================================

// ❌ ANTI-PATTERN: Deeply nested conditions
function getGameState_BadVersion(game: Game): string {
  if (game.player1.score >= 4) {
    if (game.player1.score - game.player2.score >= 2) {
      return 'Player 1 wins';
    } else if (game.player1.score - game.player2.score === 1) {
      return 'Advantage Player 1';
    }
  } else if (game.player2.score >= 4) {
    if (game.player2.score - game.player1.score >= 2) {
      return 'Player 2 wins';
    } else if (game.player2.score - game.player1.score === 1) {
      return 'Advantage Player 2';
    }
  } else if (game.player1.score >= 3 && game.player2.score >= 3) {
    if (game.player1.score === game.player2.score) {
      return 'Deuce';
    }
  }
  return 'Game in progress';
}

// ✅ SOLUTION: Flatten with early returns and named predicates
function getGameState(game: Game): string {
  if (hasPlayer1Won(game)) {
    return 'Player 1 wins';
  }
  
  if (hasPlayer2Won(game)) {
    return 'Player 2 wins';
  }
  
  if (isDeuce(game)) {
    return 'Deuce';
  }
  
  if (hasPlayer1Advantage(game)) {
    return 'Advantage Player 1';
  }
  
  if (hasPlayer2Advantage(game)) {
    return 'Advantage Player 2';
  }
  
  return 'Game in progress';
}

function hasPlayer2Won(game: Game): boolean {
  const hasReachedMinimumScore = game.player2.score >= MINIMUM_SCORE_TO_WIN;
  const hasWinningMargin = game.player2.score - game.player1.score >= WINNING_MARGIN;
  return hasReachedMinimumScore && hasWinningMargin;
}

function hasPlayer1Advantage(game: Game): boolean {
  return isInDeuceOrAdvantageZone(game) && game.player1.score > game.player2.score;
}

function hasPlayer2Advantage(game: Game): boolean {
  return isInDeuceOrAdvantageZone(game) && game.player2.score > game.player1.score;
}

// ============================================================================
// SUMMARY: Common Predicate Code Smells and Solutions
// ============================================================================

/*
SMELL 1: Double Negation
  Problem: !(a < 4 && b < 4) is hard to parse
  Solution: Use positive logic: a >= 4 || b >= 4

SMELL 2: Multiple Negations
  Problem: !(a < 3) && !(b === c) creates cognitive overload
  Solution: Rewrite with positive logic: a >= 3 && b !== c

SMELL 3: Complex AND/OR Combinations
  Problem: (a > b && a >= 4) || (a === b && a >= 3) || (a > b && b >= 3)
  Solution: Extract each condition into a named predicate

SMELL 4: Lack of Short-Circuit Evaluation
  Problem: Computing all conditions even when early exit is possible
  Solution: Use early returns or guard clauses

SMELL 5: Implicit Assumptions (Magic Numbers)
  Problem: if (score >= 4 && score - other >= 2) - what do these mean?
  Solution: Extract to named constants: MINIMUM_SCORE_TO_WIN, WINNING_MARGIN

SMELL 6: Duplication in Predicates
  Problem: Same score checks repeated across multiple conditions
  Solution: Extract common conditions into helper predicates

SMELL 7: Mixing Concerns
  Problem: Validation logic mixed with business logic
  Solution: Separate validation from business logic

SMELL 8: Overly Complex Nested Conditions
  Problem: Multiple levels of if-else nesting make logic hard to follow
  Solution: Use early returns and named predicates to flatten logic

BEST PRACTICES:
  ✅ Use positive logic instead of negation
  ✅ Extract complex conditions into named predicates
  ✅ Use constants for magic numbers
  ✅ Leverage short-circuit evaluation
  ✅ Keep predicates small and focused
  ✅ Use early returns to flatten nested logic
  ✅ Separate validation from business logic
  ✅ Make assumptions explicit through naming
  ✅ Test predicates independently
  ✅ Prioritize readability over cleverness
*/
