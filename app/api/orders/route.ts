import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const {
      businessName,
      category,
      city,
      website,
      instagram,
      facebook,
      googleMaps,
      email,
      phone,
      mainGoal,
      plan,
    } = body;

    const prices = {
      basic: 1900,
      professional: 9900,
    };

    const amount = prices[plan as keyof typeof prices];

    if (!amount) {
      return NextResponse.json(
        { error: 'Plan inválido' },
        { status: 400 }
      );
    }

    // Crear la orden en la base de datos
    const order = await prisma.order.create({
      data: {
        businessName,
        category,
        city,
        website,
        instagram,
        facebook,
        googleMaps,
        email,
        phone,
        mainGoal,
        plan,
        amountPaid: amount / 100,
        status: 'PENDING',
      },
    });

    // Crear Payment Intent en Stripe
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        orderId: order.id,
        plan,
        email,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      order,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'ID requerido' },
      { status: 400 }
    );
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Orden no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener la orden' },
      { status: 500 }
    );
  }
}