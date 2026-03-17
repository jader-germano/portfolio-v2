-- SQL Migration: Create inbox_messages table for Unified Inbox
-- Location: Supabase SQL Editor

-- 1. Create inbox_messages table
CREATE TABLE IF NOT EXISTS public.inbox_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender TEXT NOT NULL,
    recipient TEXT NOT NULL,
    subject TEXT,
    body_text TEXT,
    severity TEXT DEFAULT 'INFO', -- INFO, WARN, CRITICAL
    is_system BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE public.inbox_messages ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access (gated by API key in Pi-Service)
CREATE POLICY "Service role can manage inbox" ON public.inbox_messages FOR ALL USING (true) WITH CHECK (true);

-- 4. Create an index for performance
CREATE INDEX IF NOT EXISTS idx_inbox_messages_created_at ON public.inbox_messages(created_at DESC);
