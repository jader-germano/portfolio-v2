# Deepseek API Orchestration — JPGLabs Portfolio

This document describes how **Deepseek-R1** is orchestrated within the JPGLabs ecosystem to power the AI Resume Parser and Portfolio instantiation.

## 🔄 Workflow Overview

The orchestration follows a "Headless AI" pattern where the frontend manages the user experience while the backend coordinates between the LLM and the database.

### 1. Request Initiation (Frontend)
- **Component:** `ResumeUpload.tsx`
- **Action:** User drops a PDF or TXT file. The frontend extracts the text and sends a `POST` request to `/api/resume/parse`.

### 2. API Proxy & Prompt Engineering (Backend)
- **Route:** `app/api/resume/parse/route.ts` (Next.js API Route)
- **Logic:** The backend receives the raw text and wraps it in a **Structured Output Prompt**.
- **Security:** The API route acts as a buffer, preventing direct exposure of the Ollama endpoint to the public internet.

### 3. LLM Processing (Ollama Service)
- **Service:** `Ollama` running on the private VPS (port 11434).
- **Model:** `deepseek-r1:7b`
- **Orchestration:**
  - The Next.js backend uses the `fetch` API to call `http://187.77.227.151:11434/api/generate`.
  - The request specifies `format: "json"` to ensure the model returns a valid JSON object.
  - **Deepseek-R1** processes the unstructured resume text and maps it to the predefined `PortfolioData` schema (name, title, summary, experiences, skills, projects).

### 4. Data Refinement & Response
- The Ollama service returns the JSON response.
- The Next.js backend parses the stringified JSON from `data.response`.
- The refined object is sent back to the frontend to populate the UI in real-time.

## 🏗 Infrastructure Integration

The orchestration is resilient due to its **Kubernetes (k3s)** foundation:
- **Service Discovery:** Next.js communicates with Ollama via internal cluster DNS or the private VPS IP.
- **Resource Management:** Ollama is deployed as a separate pod with specific resource limits to ensure it doesn't starve the frontend of CPU/RAM.
- **Model Persistence:** The `deepseek-r1:7b` model is pre-pulled during the k3s deployment phase using an init container.

## 🛠 Tech Stack
- **Orchestrator:** Next.js 14 (App Router)
- **LLM Engine:** Ollama
- **Model:** Deepseek-R1 (7B parameters)
- **Communication:** JSON-RPC style over HTTP/REST
