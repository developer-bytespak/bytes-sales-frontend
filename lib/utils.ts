// Utility functions
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// More utility functions will be added here
