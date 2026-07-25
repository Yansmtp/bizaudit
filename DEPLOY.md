# Guía de Deployment - BizAudit AI

## Estado Actual ✅

- ✅ Servidor funcionando en `http://localhost:3002`
- ✅ Código corregido y sin errores de sintaxis
- ✅ Git inicializado con 4 commits
- ✅ Archivos de configuración listos

## Pasos para Subir a GitHub

### 1. Crear un nuevo repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `bizaudit` (o el nombre que prefieras)
3. Descripción: "AI-powered business audit platform"
4. Selecciona "Private" o "Public" según tu preferencia
5. **NO** marques "Add a README file" (ya tenemos uno)
6. Click en "Create repository"

### 2. Conectar el repositorio local con GitHub

Ejecuta estos comandos en tu terminal (reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub):

```bash
# Agregar el remote de GitHub
git remote add origin https://github.com/TU_USUARIO/bizaudit.git

# Verificar que se agregó correctamente
git remote -v

# Renombrar la rama a 'main' (convención estándar)
git branch -M main

# Subir el código a GitHub
git push -u origin main
```

### 3. Verificar que el código se subió

Ve a tu repositorio en GitHub y verifica que todos los archivos estén ahí.

## Pasos para Deploy en Vercel

### Opción 1: Deploy Automático desde GitHub (Recomendado)

1. Ve a https://vercel.com
2. Crea una cuenta o inicia sesión
3. Click en "Add New Project"
4. Selecciona "Import Git Repository"
5. Busca tu repositorio `bizaudit` y selecciónalo
6. Vercel detectará automáticamente que es un proyecto Next.js
7. **Antes de hacer clic en "Deploy"**, agrega las variables de entorno:

#### Variables de Entorno Requeridas:

```
DATABASE_URL=postgresql://user:password@host:5432/bizaudit
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_... (o sk_live_... para producción)
STRIPE_PUBLISHABLE_KEY=pk_test_... (o pk_live_... para producción)
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=eyJ...
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

8. Click en "Deploy"
9. Espera 2-3 minutos mientras Vercel construye y despliega tu app
10. ¡Listo! Tu app estará disponible en `https://bizaudit.vercel.app` (o el nombre que elijas)

### Opción 2: Deploy con Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Iniciar sesión
vercel login

# Deploy
vercel

# Para deploy en producción
vercel --prod
```

## Configuración de Base de Datos

### Opción A: Usar Supabase (Recomendado para Vercel)

1. Ve a https://supabase.com
2. Crea un nuevo proyecto
3. En el dashboard, ve a Settings > Database
4. Copia la "Connection string" y úsala como `DATABASE_URL`
5. Ejecuta las migraciones:

```bash
# Instalar Prisma CLI si no lo tienes
npm install -g prisma

# Generar el cliente
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init
```

### Opción B: Usar Neon (Serverless PostgreSQL)

1. Ve a https://neon.tech
2. Crea una cuenta y un nuevo proyecto
3. Copia la connection string
4. Úsala como `DATABASE_URL`

## Configuración de Stripe Webhooks

Para que los pagos funcionen correctamente:

1. Ve a https://dashboard.stripe.com/webhooks
2. Click en "Add endpoint"
3. URL: `https://tu-dominio.vercel.app/api/webhooks/stripe`
4. Selecciona estos eventos:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copia el "Webhook Secret" y agrégalo a tus variables de entorno como `STRIPE_WEBHOOK_SECRET`

## Configuración de Resend (Emails)

1. Ve a https://resend.com
2. Crea una cuenta
3. Ve a API Keys y crea una nueva key
4. Agrégala como `RESEND_API_KEY`
5. (Opcional) Verifica tu dominio en Resend para envíos personalizados

## Configuración de OpenAI

1. Ve a https://platform.openai.com
2. Crea una cuenta y agrega un método de pago
3. Ve a API Keys y crea una nueva key
4. Agrégala como `OPENAI_API_KEY`

## Configuración de Supabase (Storage)

1. Ve a tu proyecto en Supabase
2. Ve a Storage
3. Crea un bucket llamado `audits`
4. Ve a Settings > API y copia:
   - `URL` → `SUPABASE_URL`
   - `anon public` key → `SUPABASE_KEY`

## Verificar que Todo Funciona

1. Abre tu app en Vercel
2. Prueba el flujo completo:
   - Selecciona un plan
   - Llena el formulario
   - Completa el pago (usa tarjetas de prueba de Stripe)
   - Verifica que llegue el email
   - Accede a la página de auditoría

## Dominio Personalizado (Opcional)

1. En Vercel, ve a tu proyecto
2. Click en "Settings" > "Domains"
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar los DNS

## Notas Importantes

- **Variables de entorno**: Nunca compartas tus archivos `.env.local` o subas credenciales a GitHub
- **Stripe**: Usa `sk_test_` y `pk_test_` en desarrollo, cambia a `sk_live_` y `pk_live_` en producción
- **Base de datos**: Asegúrate de que tu base de datos esté accesible desde Vercel (no uses localhost)
- **Webhooks**: Los webhooks de Stripe deben ser HTTPS (Vercel lo provee automáticamente)

## Comandos Útiles

```bash
# Ver logs de Vercel
vercel logs

# Rollback a versión anterior
vercel rollback

# Ver deployments
vercel ls

# Eliminar deployment
vercel rm [url]
```

## Soporte

Si tienes problemas:
1. Revisa los logs en Vercel
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que la base de datos esté accesible
4. Verifica que los webhooks de Stripe estén configurados correctamente