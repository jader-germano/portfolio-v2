-- SQL Migration: Create pi_documents table for NoSQL-like Cloud Memory
-- Location: Supabase SQL Editor

-- 1. Create pi_documents table
CREATE TABLE IF NOT EXISTS public.pi_documents (
    key TEXT PRIMARY KEY, -- The virtual file path, e.g., 'memory/PI_MEMORY.md' or 'threads/active-threads.json'
    content_type TEXT NOT NULL DEFAULT 'text', -- 'markdown', 'json', 'text'
    content_text TEXT, -- Raw file content
    content_json JSONB, -- Parsed JSON content (if applicable)
    updated_by TEXT NOT NULL DEFAULT 'system', -- E.g., 'jader', 'pi-service', 'mac-local'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE public.pi_documents ENABLE ROW LEVEL SECURITY;

-- 3. Allow service role to manage everything (Pi-Service)
CREATE POLICY "Service role can manage pi documents" ON public.pi_documents FOR ALL USING (true) WITH CHECK (true);

-- 4. Create an index on the key for fast lookups
CREATE INDEX IF NOT EXISTS idx_pi_documents_key ON public.pi_documents(key);
