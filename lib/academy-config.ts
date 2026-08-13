export const ACADEMY_PRICING = {
  totalPrice: 95000,
  installments: [
    { label: "At enrollment", amount: 50000 },
    { label: "Week 4", amount: 45000 },
  ],
  currency: "₦",
  // Optional early-bird promo — currently OFF.
  earlyBird: {
    enabled: false,
    price: 85000,
    deadline: "2026-09-05",
  },
}

export const ACADEMY_WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/BWOseG8UqurKaBJRZUQatU?s=em&p=a&mlu=4&amv=2'

export function formatNaira(amount: number): string {
  return `${ACADEMY_PRICING.currency}${amount.toLocaleString('en-NG')}`
}
