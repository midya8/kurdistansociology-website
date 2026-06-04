# Deploy runbook: domain, email, and hosting

Total cost: ~$10/year (just the domain). Everything else is free.

## Overview

| Service | Provider | Cost | What for |
|---|---|---|---|
| Domain | Cloudflare Registrar | ~$10/yr (at-cost) | `kurdistansociology.com` |
| DNS | Cloudflare | Free | Routes domain → website + email |
| Website hosting | Cloudflare Pages | Free | Serves the static site |
| Email | Zoho Mail Free | Free (1 user) | `info@kurdistansociology.com` |
| Source control | GitHub (private/public repo) | Free | Powers auto-deploy on push |

---

## 1. Push the code to GitHub

```bash
cd /Users/midyarahmani/kurdistansociology-website
git add .
git commit -m "Initial site"
```

Create a repo on github.com (e.g. `kurdistansociology-website`), then:

```bash
git remote add origin git@github.com:<your-username>/kurdistansociology-website.git
git branch -M main
git push -u origin main
```

---

## 2. Buy the domain at Cloudflare Registrar

1. Sign up at https://dash.cloudflare.com (free).
2. In the dashboard, go to **Domain Registration → Register Domain**.
3. Search `kurdistansociology.com` — if available, it should be around **$10.44/yr** (Cloudflare sells at wholesale cost, no markup).
4. Complete checkout. Cloudflare auto-creates a DNS zone for the domain.

> Why Cloudflare Registrar: no upsells, no renewal price hikes, free WHOIS privacy, and it's already on the platform you'll use for hosting + DNS.

---

## 3. Set up email with Zoho Mail (free tier)

Zoho Mail's free plan gives you **1 user, 5 GB, custom domain email** forever.

1. Sign up at https://www.zoho.com/mail/zohomail-pricing.html → click **Sign Up Now** under "Forever Free Plan" (sometimes hidden — scroll down past paid plans).
2. Choose **"Sign up with a domain I already own"** and enter `kurdistansociology.com`.
3. Create user `info` → your address becomes `info@kurdistansociology.com`.
4. Zoho will show you DNS records to add. You'll add these in Cloudflare (step 4 below):
   - **TXT** record for domain verification (Zoho gives you the value, e.g. `zoho-verification=...`).
   - **MX** records:
     - `@` → `mx.zoho.com` priority 10
     - `@` → `mx2.zoho.com` priority 20
     - `@` → `mx3.zoho.com` priority 50
   - **TXT** SPF: `v=spf1 include:zoho.com ~all`
   - **TXT** DKIM: Zoho generates this after you verify ownership — add the host/value it shows.

5. After DNS propagates (usually minutes on Cloudflare), click **Verify** in Zoho.
6. Log in to webmail at https://mail.zoho.com or set up IMAP/SMTP in any client:
   - IMAP: `imap.zoho.com:993` (SSL)
   - SMTP: `smtp.zoho.com:465` (SSL)

> If you ever outgrow 1 user: Zoho Mail Lite is ~$1/user/mo.

---

## 4. Add the Zoho DNS records in Cloudflare

1. In Cloudflare dashboard, open **kurdistansociology.com → DNS → Records**.
2. Click **Add record** for each one from step 3.
3. For MX records: set Type=MX, Name=`@`, Mail server=`mx.zoho.com`, Priority=10. Repeat for mx2 (20) and mx3 (50).
4. For TXT records: set Type=TXT, Name=`@` (or what Zoho specifies for DKIM, e.g. `zmail._domainkey`), Content=the value Zoho gave you.
5. **Important:** leave the orange cloud (proxy) **OFF** for MX records — email won't work through Cloudflare's proxy. TXT records don't have a proxy toggle.

---

## 5. Deploy the website to Cloudflare Pages

1. In Cloudflare dashboard: **Workers & Pages → Create application → Pages → Connect to Git**.
2. Authorize GitHub and pick the `kurdistansociology-website` repo.
3. **Build settings:**
   - Framework preset: **Next.js (Static HTML Export)** (or "None" — both work)
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node version: `20` (set in environment variables: `NODE_VERSION=20`)
4. Click **Save and Deploy**. First build takes ~2 minutes. You'll get a `*.pages.dev` URL.

---

## 6. Point the domain at the Pages site

1. In the Pages project: **Custom domains → Set up a custom domain**.
2. Enter `kurdistansociology.com`. Cloudflare adds the CNAME automatically since DNS is on the same account.
3. Repeat for `www.kurdistansociology.com` if you want both.
4. SSL is auto-provisioned. The site goes live in a few minutes.

---

## Done. Going forward:

- **Update content / posts:** edit a Markdown file in `src/content/news/<locale>/`, commit, push. Cloudflare auto-deploys.
- **Update UI text:** edit `src/i18n/dictionaries/{en,ku}.json`.
- **Check email:** https://mail.zoho.com (login `info@kurdistansociology.com`).
- **Manage domain & DNS:** Cloudflare dashboard.

## Total annual cost recap

- Domain: ~$10.44/yr (Cloudflare Registrar)
- Hosting: $0 (Cloudflare Pages free tier — unlimited bandwidth on a generous free plan)
- Email: $0 (Zoho Mail free, 1 user)
- **Total: ~$10/year**

## Optional upgrades later

- More email users → Zoho Mail Lite (~$1/user/mo) or Google Workspace (~$6/user/mo).
- Comments on posts → free tier of Giscus (uses GitHub Discussions).
- Newsletter → Buttondown free tier (up to 100 subscribers) or Substack (free).
- Analytics → Cloudflare Web Analytics (free, privacy-friendly, no cookies).
