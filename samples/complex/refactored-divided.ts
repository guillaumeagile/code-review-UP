// ✅ REFACTORED: Using Divide and Conquer strategy
// Each function has a single, clear responsibility

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

// ✅ RESPONSIBILITY 1: Discount calculation
function calculateDiscount(subscriptionLevel: User['subscriptionLevel']): number {
  const discountMap: Record<User['subscriptionLevel'], number> = {
    free: 0,
    premium: 10,
    enterprise: 20
  };
  return discountMap[subscriptionLevel];
}

// ✅ RESPONSIBILITY 2: User validation
function validateUser(user: User): void {
  if (!user || !user.id || !user.email) {
    throw new Error('Invalid user');
  }
}

// ✅ RESPONSIBILITY 3: Product validation
function validateProducts(products: Product[]): void {
  if (!products || products.length === 0) {
    throw new Error('No products selected');
  }

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    
    if (!product || product.id === undefined) {
      throw new Error(`Invalid product at index ${i}`);
    }

    if (product.stock <= 0) {
      throw new Error(`Product ${product.name} is out of stock`);
    }
  }
}

// ✅ RESPONSIBILITY 4: Price calculation
function calculateOrderTotal(products: Product[], discountPercentage: number): number {
  return products.reduce((total, product) => {
    const discountedPrice = product.price * (1 - discountPercentage / 100);
    return total + discountedPrice;
  }, 0);
}

// ✅ RESPONSIBILITY 5: Order creation
function createOrder(user: User, products: Product[], totalAmount: number): Order {
  return {
    userId: user.id,
    products: products,
    totalAmount: totalAmount,
    status: 'pending'
  };
}

// ✅ RESPONSIBILITY 6: Email notification
function sendEmailNotification(user: User, order: Order): void {
  const emailSubject = `Order Confirmation #${Math.random()}`;
  const emailBody = `Dear ${user.name},\n\nYour order has been received.\nTotal: $${order.totalAmount.toFixed(2)}\n\nThank you for your purchase!`;
  
  console.log(`[EMAIL] To: ${user.email}`);
  console.log(`[EMAIL] Subject: ${emailSubject}`);
  console.log(`[EMAIL] Body: ${emailBody}`);
}

// ✅ RESPONSIBILITY 7: SMS notification
function sendSmsNotification(user: User, order: Order): void {
  if (user.subscriptionLevel === 'premium' || user.subscriptionLevel === 'enterprise') {
    const smsMessage = `Order confirmed! Total: $${order.totalAmount.toFixed(2)}`;
    console.log(`[SMS] Message: ${smsMessage}`);
  }
}

// ✅ RESPONSIBILITY 8: Analytics logging
function logOrderAnalytics(user: User, order: Order): void {
  console.log(`[ANALYTICS] User ${user.id} placed order with total $${order.totalAmount}`);
}

// ✅ RESPONSIBILITY 9: User state update
function updateUserLastLogin(user: User): void {
  user.lastLoginDate = new Date();
}

// ✅ ORCHESTRATOR: Coordinates all responsibilities
// This function is now small, readable, and easy to test
function processUserOrderAndSendNotification(user: User, products: Product[]): Order {
  validateUser(user);
  validateProducts(products);

  const discountPercentage = calculateDiscount(user.subscriptionLevel);
  const totalAmount = calculateOrderTotal(products, discountPercentage);
  const order = createOrder(user, products, totalAmount);

  sendEmailNotification(user, order);
  sendSmsNotification(user, order);
  logOrderAnalytics(user, order);
  updateUserLastLogin(user);

  return order;
}

// ✅ BENEFITS OF THIS APPROACH:
// 1. Each function has a single, clear responsibility
// 2. Functions are small and easy to understand
// 3. Easy to test each responsibility independently
// 4. Easy to reuse functions in different contexts
// 5. Changes to one concern don't affect others
// 6. No misleading or verbose comments needed
// 7. Code is self-documenting through function names
// 8. Easy to extend (e.g., add new notification types)
// 9. Easy to mock dependencies for testing
// 10. Follows Single Responsibility Principle (SRP)
