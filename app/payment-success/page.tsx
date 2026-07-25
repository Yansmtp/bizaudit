'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Pago completado!
        </h1>
        <p className="text-gray-600">
          Tu auditoría está en proceso. Recibirás el reporte en tu email en pocos minutos.
        </p>
        <button
          onClick={() => router.push('/')}
          className="btn-primary mt-6"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}