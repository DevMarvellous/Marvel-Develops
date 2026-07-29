export const ACADEMY_PRICING = {
  totalPrice: 85000,
  installments: [
    { label: "At enrollment", amount: 35000 },
    { label: "Week 4", amount: 25000 },
    { label: "Week 6", amount: 25000 },
  ],
  currency: "₦",
  // Optional early-bird promo — currently OFF. Leave `enabled: false` unless I turn it on.
  earlyBird: {
    enabled: false,
    price: 65000,
    deadline: "2026-09-05", // placeholder, I will confirm the real date before enabling
  },
}

export function formatNaira(amount: number): string {
  return `${ACADEMY_PRICING.currency}${amount.toLocaleString('en-NG')}`
}
