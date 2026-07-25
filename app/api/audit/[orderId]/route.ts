import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.orderId },
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