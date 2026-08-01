import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { processAudit } from '@/lib/audit-processor';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;
    const stripe = getStripe();

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;

        // Actualizar la orden como pagada
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: 'PAID',
            paymentId: paymentIntent.id,
          },
        });

        // Procesar auditoría (en segundo plano)
        // En Vercel, usamos una respuesta rápida y procesamos asíncronamente
        // Podemos usar Vercel's Background Functions o cron jobs
        // Por ahora, lo procesamos aquí pero no esperamos
        processAudit(orderId).catch(console.error);

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    );
  }
}