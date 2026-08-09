# TaxPro2Profit Return Assistant

## Phase 3
Private Supabase authentication: new accounts are pending preparers; active Admin accounts can access `/admin`.

### Vercel variables
Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_SITE_URL` in Vercel. Never commit secret or service-role keys.

### Test
Create and confirm a test account, confirm it is routed to Access Pending, then have an Admin activate it before testing the workspace.
