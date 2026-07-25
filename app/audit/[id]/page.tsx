'use client';

import { useState, useEffect } from 'react';

interface AuditData {
  status: string;
  pdfUrl: string | null;
  auditData: any;
}

export default function AuditPage({ params }: { params: { id: string } }) {
  const [audit, setAudit] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const response = await fetch(`/api/audit/${params.id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Error al cargar la auditoría');
        }
        
        setAudit(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cargando auditoría...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!audit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Auditoría no encontrada</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Tu Auditoría Digital
          </h1>

          {audit.status === 'PENDING' && (
            <div className="text-center">
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Esperando pago
              </h2>
              <p className="text-gray-600">
                Tu auditoría está pendiente de pago. Completa el pago para comenzar el análisis.
              </p>
            </div>
          )}

          {audit.status === 'PAID' && (
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Pago confirmado!
              </h2>
              <p className="text-gray-600 mb-4">
                Estamos procesando tu auditoría. Esto puede tomar unos minutos.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Recibirás un email cuando tu reporte esté listo.
                </p>
              </div>
            </div>
          )}

          {audit.status === 'PROCESSING' && (
            <div className="text-center">
              <div className="text-6xl mb-4">🔄</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Procesando tu auditoría...
              </h2>
              <p className="text-gray-600">
                Nuestro equipo está analizando tu negocio. Por favor espera unos minutos.
              </p>
            </div>
          )}

          {audit.status === 'COMPLETED' && audit.pdfUrl && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Tu auditoría está lista!
              </h2>
              <p className="text-gray-600 mb-6">
                Hemos analizado tu negocio y generado un reporte personalizado.
              </p>
              <a
                href={audit.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                📄 Descargar Reporte PDF
              </a>
            </div>
          )}

          {audit.status === 'ERROR' && (
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Hubo un error
              </h2>
              <p className="text-gray-600">
                Lo sentimos, ocurrió un error al procesar tu auditoría. Por favor contacta con nosotros.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}