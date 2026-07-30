export const ACADEMY_PRICING = {
  totalPrice: 45000,
  installments: [
    { label: "At enrollment", amount: 20000 },
    { label: "Week 4", amount: 15000 },
    { label: "Week 6", amount: 10000 },
  ],
  currency: "₦",
  // Optional early-bird promo — currently OFF. Leave `enabled: false` unless I turn it on.
  earlyBird: {
    enabled: false,
    price: 40000,
    deadline: "2026-09-05", // placeholder, I will confirm the real date before enabling
  },
}

export const ACADEMY_WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/BWOseG8UqurKaBJRZUQatU?s=em&p=a&mlu=4&amv=2'

export function formatNaira(amount: number): string {
  return `${ACADEMY_PRICING.currency}${amount.toLocaleString('en-NG')}`
}
