// ❌ CODE SMELL: Large multi-responsibility function with verbose and misleading comments
// This function violates Single Responsibility Principle and uses comments as a code smell

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  subscriptionLevel: 'free' | 'premium' | 'enterprise';
  lastLoginDate: Date;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface Order {
  userId: number;
  products: Product[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

// ❌ ANTI-PATTERN: This function does too many things
function processUserOrderAndSendNotification(user: User, products: Product[]): Order {
  // Step 1: Validate user data
  // This section checks if the user is valid and can make purchases
  if (!user || !user.id || !user.email) {
    throw new Error('Invalid user');
  }

  // Check subscription level - premium users get 10% discount, enterprise gets 20%
  // Note: This logic is also used in the payment gateway, so keep it in sync!
  let discountPercentage = 0;
  if (user.subscriptionLevel === 'premium') {
    discountPercentage = 10;
  } else if (user.subscriptionLevel === 'enterprise') {
    discountPercentage = 20;
  }

  // Step 2: Validate and process products
  // Make sure products exist and have stock
  if (!products || products.length === 0) {
    throw new Error('No products selected');
  }

  // Check stock levels for each product
  let totalAmount = 0;
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    
    // Validate product
    if (!product || product.id === undefined) {
      throw new Error(`Invalid product at index ${i}`);
    }

    // Check if product is in stock
    if (product.stock <= 0) {
      throw new Error(`Product ${product.name} is out of stock`);
    }

    // Calculate price with discount
    // The discount is applied to each product individually
    const discountedPrice = product.price * (1 - discountPercentage / 100);
    totalAmount += discountedPrice;
  }

  // Step 3: Create order object
  // This is where we build the order that will be returned
  const order: Order = {
    userId: user.id,
    products: products,
    totalAmount: totalAmount,
    status: 'pending'
  };

  // Step 4: Send notifications
  // We need to notify the user about their order
  // This is important for user experience
  
  // Send email notification
  // TODO: Make sure email service is working
  const emailSubject = `Order Confirmation #${Math.random()}`;
  const emailBody = `Dear ${user.name},\n\nYour order has been received.\nTotal: $${totalAmount.toFixed(2)}\n\nThank you for your purchase!`;
  
  console.log(`[EMAIL] To: ${user.email}`);
  console.log(`[EMAIL] Subject: ${emailSubject}`);
  console.log(`[EMAIL] Body: ${emailBody}`);

  // Send SMS notification for premium users
  // Premium users should get SMS alerts
  if (user.subscriptionLevel === 'premium' || user.subscriptionLevel === 'enterprise') {
    const smsMessage = `Order confirmed! Total: $${totalAmount.toFixed(2)}`;
    console.log(`[SMS] Message: ${smsMessage}`);
  }

  // Log the order in analytics
  // This helps us track user behavior
  console.log(`[ANALYTICS] User ${user.id} placed order with total $${totalAmount}`);

  // Update user's last login date
  // We should track when users are active
  user.lastLoginDate = new Date();

  // Step 5: Return the order
  // This is what the caller will receive
  return order;
}

// ❌ PROBLEMS WITH THIS FUNCTION:
// 1. Multiple responsibilities: validation, calculation, notification, analytics, state mutation
// 2. Comments are placeholders for missing function extraction
// 3. Comments contain outdated or inaccurate information ("keep it in sync!")
// 4. Comments state the obvious ("This is where we build the order")
// 5. TODO comments indicate incomplete refactoring
// 6. Hard to test each responsibility independently
// 7. Changes to one concern affect the entire function
// 8. Difficult to reuse individual pieces of logic
