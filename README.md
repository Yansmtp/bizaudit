# BizAudit AI

AI-powered business audit platform that helps businesses discover growth opportunities and increase their online visibility.

## Features

- 🤖 AI-powered business analysis
- 📊 Comprehensive PDF reports
- 🌐 Website & SEO evaluation
- 📱 Social media audit
- 📅 30-day action plan
- 📧 Email delivery

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Prisma
- **Payments:** Stripe
- **AI:** OpenAI GPT-4
- **Email:** Resend
- **Storage:** Supabase
- **PDF Generation:** React PDF

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key
- Stripe account
- Resend account
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bizaudit.git
cd bizaudit
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bizaudit"

# OpenAI
OPENAI_API_KEY="sk-..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Resend (Email)
RESEND_API_KEY="re_..."

# Supabase
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_KEY="eyJ..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3002"
```

5. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

6. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3002](http://localhost:3002) to see the app.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel's dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `DATABASE_URL` - Your PostgreSQL connection string
- `OPENAI_API_KEY` - Your OpenAI API key
- `STRIPE_SECRET_KEY` - Your Stripe secret key (use live keys for production)
- `STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret
- `RESEND_API_KEY` - Your Resend API key
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase anon key
- `NEXT_PUBLIC_APP_URL` - Your production URL (e.g., https://bizaudit.vercel.app)

## Project Structure

```
bizaudit/
├── app/
│   ├── api/
│   │   ├── audit/[orderId]/route.ts
│   │   ├── orders/route.ts
│   │   └── webhooks/stripe/route.ts
│   ├── audit/[id]/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── payment-success/page.tsx
├── components/
│   ├── AuditForm.tsx
│   ├── Navbar.tsx
│   ├── Pricing.tsx
│   ├── ReportPreview.tsx
│   └── ThemeProvider.tsx
├── lib/
│   ├── audit-processor.ts
│   ├── openai.ts
│   ├── pdf.tsx
│   ├── prisma.ts
│   ├── resend.ts
│   ├── stripe.ts
│   └── supabase.ts
├── prisma/
│   └── schema.prisma
└── public/
```

## Scripts

- `npm run dev` - Start development server on port 3002
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## License

MIT