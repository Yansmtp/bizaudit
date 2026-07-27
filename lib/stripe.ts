import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

export const getStripe = () => {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined')
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
    })
  }
  return stripeInstance
}

export const getStripePublishableKey = () => {
  return process.env.STRIPE_PUBLISHABLE_KEY || ''
}
