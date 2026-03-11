# 🛡️ JPGLabs Guardian — Self-Healing AI Architecture

## 🧠 Concept
The "Guardian" is a containerized AI agent running on the VPS. It possesses the full context of the project (Knowledge Hub) and acts as the system administrator's digital twin.

## 🏗 High-Availability Architecture (k3s)

```mermaid
graph TD
    Cron[Weekly Update Trigger] --> CI[GitHub Actions]
    CI --> Deploy[Blue/Green Deployment]
    
    subgraph VPS Cluster
        LoadBalancer[Traefik]
        
        subgraph "Guardian Service"
            ReplicaA[Guardian-A (Active)]
            ReplicaB[Guardian-B (Standby/Observer)]
            Supervisor[Watchdog Process]
        end
        
        ReplicaA -- Monitors --> System[Portfolio/n8n/DB]
        ReplicaB -- Monitors --> ReplicaA
        
        Supervisor -- Fails over --> ReplicaB
    end
```

### 🔄 Blue/Green Auto-Update Strategy
1.  **Trigger:** Weekly schedule or `git push` to `guardian-agent` repo.
2.  **Update B:** CI pulls latest Gemini/LLM context and deploys to **Replica B**.
3.  **Test B:** Replica B runs a self-diagnostic (Selenium Smoke Tests + API Health).
4.  **Switch:** If B is healthy, Traffic switches to B. B becomes "Active".
5.  **Update A:** Replica A is updated and goes into "Standby".

### 🚨 Alerting Matrix
| Severity | Channel | Action |
| :--- | :--- | :--- |
| **Info** | Dashboard | Log update status |
| **Warning** | Slack/Discord | Replica switch or minor latency |
| **Critical** | Push (Mobile) | Service Down, Auto-healing failed |

---

# 📱 Mobile App Roadmap (Flutter/Expo)

## Phase 1: The "Red Button" App
- **Stack:** React Native (Expo) to reuse Portfolio components.
- **Auth:** Biometric Login (FaceID) connected to Supabase.
- **Core Feature:** Real-time push notifications for "Critical" alerts.
- **Action:** A single "Approve Fix" button when the Guardian proposes a risky repair.

## Phase 2: Command Center
- **Logs:** View live k3s logs from the phone.
- **Chat:** Talk to the Guardian (Text/Voice) to issue CLI commands remotely.
- **Finance:** View Stripe/Kiwify revenue streams real-time.
