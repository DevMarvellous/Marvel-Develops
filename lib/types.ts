export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface ContactFormData {
  fullName: string
  businessName: string
  email: string
  whatsapp: string
  industry: string
  service: string
  message: string
  honeypot?: string
}

export interface PlannerSummary {
  businessSummary: string
  serviceCategory: string
  industry: string
  timeline: string
  budget: string
  fullSummary: string
}

export interface PlannerSubmitData {
  fullName: string
  email: string
  whatsapp: string
  businessName?: string
  industry?: string
  service?: string
  summary: string
  details: Record<string, unknown>
  honeypot?: string
}
