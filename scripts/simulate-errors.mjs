/**
 * Simulates realistic minor application errors and sends them to Axiom.
 * Designed to run every minute via GitHub Actions so the auto-fix agent
 * always has fresh errors to detect and resolve.
 */

const AXIOM_TOKEN = process.env.AXIOM_TOKEN;
const AXIOM_URL = process.env.AXIOM_URL ?? "https://api.axiom.co";
const DATASET = process.env.AXIOM_DATASET ?? "prodify-logs";

if (!AXIOM_TOKEN) {
  console.error("AXIOM_TOKEN is required");
  process.exit(1);
}

const SIMULATED_ERRORS = [
  {
    level: "error",
    message: "TypeError: Cannot read properties of undefined (reading 'id')",
    source: "src/components/TaskCard.tsx",
    line: 42,
    user_id: "usr_demo_001",
    route: "/dashboard/tasks",
    stack:
      "TypeError: Cannot read properties of undefined (reading 'id')\n  at TaskCard (src/components/TaskCard.tsx:42)\n  at renderWithHooks",
  },
  {
    level: "error",
    message: "Failed to fetch: NetworkError when attempting to fetch resource",
    source: "src/hooks/useTasks.ts",
    line: 28,
    user_id: "usr_demo_002",
    route: "/api/tasks",
    stack:
      "TypeError: Failed to fetch\n  at useTasks (src/hooks/useTasks.ts:28)\n  at fetchTasks",
  },
  {
    level: "warn",
    message: "Slow query detected: /api/projects took 2340ms (threshold: 500ms)",
    source: "src/app/api/projects/route.ts",
    line: 15,
    user_id: null,
    route: "/api/projects",
    duration_ms: 2340,
  },
  {
    level: "error",
    message: "Validation error: 'dueDate' is required but was not provided",
    source: "src/utils/validation.ts",
    line: 67,
    user_id: "usr_demo_003",
    route: "/api/tasks/create",
    field: "dueDate",
  },
  {
    level: "error",
    message: "Unhandled promise rejection: Cannot set headers after they are sent",
    source: "src/app/api/auth/route.ts",
    line: 93,
    user_id: null,
    route: "/api/auth",
    stack:
      "Error: Cannot set headers after they are sent to the client\n  at ServerResponse.setHeader\n  at src/app/api/auth/route.ts:93",
  },
  {
    level: "warn",
    message: "Missing environment variable: STRIPE_SECRET_KEY is undefined",
    source: "src/lib/stripe.ts",
    line: 5,
    user_id: null,
    route: null,
  },
  {
    level: "error",
    message: "RangeError: Maximum call stack size exceeded",
    source: "src/utils/date-utils.ts",
    line: 112,
    user_id: "usr_demo_004",
    route: "/dashboard",
    stack:
      "RangeError: Maximum call stack size exceeded\n  at formatDate (src/utils/date-utils.ts:112)",
  },
  {
    level: "warn",
    message: "React: Each child in a list should have a unique 'key' prop",
    source: "src/components/TaskList.tsx",
    line: 34,
    user_id: null,
    route: "/dashboard/tasks",
  },
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildEvents() {
  const count = Math.floor(Math.random() * 3) + 1;
  const now = new Date().toISOString();

  return Array.from({ length: count }, () => {
    const error = pickRandom(SIMULATED_ERRORS);
    return {
      _time: now,
      environment: "production",
      app: "prodify",
      simulated: true,
      ...error,
    };
  });
}

async function ingestToAxiom(events) {
  const url = `${AXIOM_URL}/v1/datasets/${DATASET}/ingest`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AXIOM_TOKEN}`,
      "Content-Type": "application/x-ndjson",
    },
    body: events.map((e) => JSON.stringify(e)).join("\n"),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Axiom ingest failed (${res.status}): ${text}`);
  }

  return res.json();
}

const events = buildEvents();
console.log(`Sending ${events.length} simulated error event(s) to Axiom dataset "${DATASET}"...`);
events.forEach((e) => console.log(` • [${e.level}] ${e.message}`));

try {
  const result = await ingestToAxiom(events);
  console.log("Ingested successfully:", JSON.stringify(result));
} catch (err) {
  console.error("Failed to ingest:", err.message);
  process.exit(1);
}
