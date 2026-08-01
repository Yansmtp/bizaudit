import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<Record<string, string | string[] | undefined>> }
) {
  try {
    const params = await ctx.params;
    const orderId = typeof params.orderId === 'string' ? params.orderId : undefined;

    if (!orderId) {
      return NextResponse.json(
        { error: 'ID de orden inválido' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Orden no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: order.status,
      pdfUrl: order.pdfUrl,
      auditData: order.auditRawData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener la auditoría' },
      { status: 500 }
    );
  }
}