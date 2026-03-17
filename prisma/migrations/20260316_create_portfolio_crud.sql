-- SQL Migration: Create Portfolio CRUD tables for Autonomous Management
-- Location: Supabase SQL Editor
-- Version: 1.1 (Refined based on data schema requirements)

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create portfolio_skills table
CREATE TABLE IF NOT EXISTS public.portfolio_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g., 'Arquitetura & Backend', 'Frontend & UI/UX'
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create portfolio_education table
CREATE TABLE IF NOT EXISTS public.portfolio_education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    degree TEXT NOT NULL,
    school TEXT NOT NULL,
    period TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create portfolio_experiences table
CREATE TABLE IF NOT EXISTS public.portfolio_experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    client TEXT, -- e.g., TSE (Client) for Digisystem (Company)
    period TEXT NOT NULL, -- "Set 2020 - Presente"
    summary TEXT NOT NULL,
    details TEXT[] DEFAULT '{}', -- Array of string details
    stack TEXT[] DEFAULT '{}',
    is_current BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create portfolio_projects table (Architectural Solutions & Gigs)
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    type TEXT NOT NULL, -- e.g., 'Gig', 'Product', 'Solution'
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    stack TEXT[] DEFAULT '{}',
    repo_url TEXT,
    demo_url TEXT,
    docs_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.portfolio_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for the portfolio frontend)
CREATE POLICY "Allow public read access on skills" ON public.portfolio_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on education" ON public.portfolio_education FOR SELECT USING (true);
CREATE POLICY "Allow public read access on experiences" ON public.portfolio_experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON public.portfolio_projects FOR SELECT USING (is_public = true);

-- Allow service role to manage everything (Backend API / Pi-Service / PRIME_OWNER)
CREATE POLICY "Service role can manage skills" ON public.portfolio_skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role can manage education" ON public.portfolio_education FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role can manage experiences" ON public.portfolio_experiences FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role can manage projects" ON public.portfolio_projects FOR ALL USING (true) WITH CHECK (true);
