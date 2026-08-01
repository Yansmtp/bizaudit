import { prisma } from './prisma';
import { openai } from './openai';
import { supabase } from './supabase';
import { resend } from './resend';
import { generatePDF } from './pdf';
import { v4 as uuidv4 } from 'uuid';

export async function processAudit(orderId: string) {
  try {
    // Obtener la orden
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error('Orden no encontrada');
    }

    // Marcar como procesando
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'PROCESSING' },
    });

    // Generar auditoría con OpenAI
    const auditData = await generateAudit(order);

    // Generar PDF
    const pdfBuffer = await generatePDF(order, auditData);

    // Subir PDF a Supabase
    const fileName = `audit-${orderId}-${uuidv4()}.pdf`;
    const { data, error } = await supabase.storage
      .from('audits')
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        cacheControl: '3600',
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('audits')
      .getPublicUrl(fileName);

    const pdfUrl = urlData.publicUrl;

    // Actualizar la orden
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'COMPLETED',
        auditRawData: auditData,
        pdfUrl,
        processedAt: new Date(),
      },
    });

    // Enviar email
    await sendAuditEmail(order.email, order.businessName, pdfUrl);

    return { success: true };

  } catch (error) {
    console.error('Error processing audit:', error);
    
    // Marcar como error
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'ERROR' },
    });

    throw error;
  }
}

async function generateAudit(order: any) {
  const prompt = `
    Analiza el siguiente negocio:
    Nombre: ${order.businessName}
    Categoría: ${order.category}
    Ciudad: ${order.city}
    Website: ${order.website || 'No tiene'}
    Instagram: ${order.instagram || 'No tiene'}
    Facebook: ${order.facebook || 'No tiene'}
    Google Maps: ${order.googleMaps || 'No tiene'}
    Objetivo principal: ${order.mainGoal}
    
    Genera una auditoría completa con recomendaciones prácticas para conseguir más clientes online.
    Devuelve ÚNICAMENTE un objeto JSON válido con la siguiente estructura:
    {
      "score": 65,
      "instagram_analysis": { "problem": "...", "solution": "..." },
      "facebook_analysis": { "problem": "...", "solution": "..." },
      "google_analysis": { "problem": "...", "solution": "..." },
      "competitors": [{ "name": "...", "advantages": ["..."] }],
      "action_plan": ["Semana 1: ...", "Semana 2: ..."],
      "content_ideas": ["Idea 1", "Idea 2"]
    }
  `;
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  temperature: 0.7,
  response_format: { type: 'json_object' },
  messages: [
    {
      role: 'system',
      content: 'Eres un consultor de marketing digital experto en negocios locales, especialmente restaurantes y comida latina en Miami.',
    },
    {
      role: 'user',
      content: prompt,
    },
  ],
});

const content = response.choices[0].message.content;
if (!content) {
  throw new Error('OpenAI returned an empty response.');
}
return JSON.parse(content);
}

async function sendAuditEmail(to: string, businessName: string, pdfUrl: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .button { 
            display: inline-block; 
            background: #2563eb; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 4px; 
            margin: 20px 0;
          }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AI Business Audit</h1>
          </div>
          <div class="content">
            <h2>¡Hola ${businessName}!</h2>
            <p>Tu auditoría digital está lista. Hemos analizado tu presencia online y encontrado oportunidades para conseguir más clientes.</p>
            
            <p><strong>Tu reporte incluye:</strong></p>
            <ul>
              <li>Puntuación de presencia digital</li>
              <li>Análisis de redes sociales</li>
              <li>Comparación con competidores</li>
              <li>Plan de acción de 30 días</li>
              <li>Ideas de contenido</li>
            </ul>
            
            <a href="${pdfUrl}" class="button">📄 Descargar Reporte PDF</a>
            
            <p>¿Tienes dudas? Responde a este email y te ayudaremos.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} AI Business Audit. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await resend.emails.send({
    from: 'AI Business Audit <audit@bizaudit.ai>',
    to: [to],
    subject: `Tu Auditoría Digital para ${businessName} está lista`,
    html,
  });
}