-- SQL Migration: Create auth_requests table for gated login flow
-- Location: Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create auth_requests table
CREATE TABLE IF NOT EXISTS public.auth_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    requested_provider TEXT,
    temp_auth_key_hash TEXT,
    key_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for email searches
CREATE INDEX IF NOT EXISTS idx_auth_requests_email ON public.auth_requests(email);

-- Add comment to the table
COMMENT ON TABLE public.auth_requests IS 'Gated authentication requests for JPG Labs Portfolio.';

-- Grant access (assuming RLS or specific role access if needed)
ALTER TABLE public.auth_requests ENABLE ROW LEVEL SECURITY;

-- Allow service role to do everything
CREATE POLICY "Service role can manage all auth requests"
ON public.auth_requests
FOR ALL
USING (true)
WITH CHECK (true);
