/**
 * Server-only feature flags. All default off.
 * Read through process.env[name] so Next does not inline the values
 * into a browser bundle. Never use a NEXT_PUBLIC_ name for these.
 */

export type UsptoFlags = {
  lookup: boolean;
  reminders: boolean;
  applicationMonitoring: boolean;
  liveEmail: boolean;
};

function envFlag(name: string): boolean {
  return process.env[name] === "true";
}

export function usptoFlags(): UsptoFlags {
  return {
    lookup: envFlag("USPTO_LOOKUP_ENABLED"),
    reminders: envFlag("USPTO_REMINDERS_ENABLED"),
    applicationMonitoring: envFlag("USPTO_APPLICATION_MONITORING_ENABLED"),
    liveEmail: envFlag("USPTO_LIVE_EMAIL_ENABLED"),
  };
}

export const USPTO_ENV = {
  tsdrApiKey: "USPTO_TSDR_API_KEY",
  odpApiKey: "USPTO_ODP_API_KEY",
  cronSecret: "USPTO_CRON_SECRET",
  databaseUrl: "DATABASE_URL",
  liveEmailTestRecipient: "USPTO_LIVE_EMAIL_TEST_RECIPIENT",
} as const;

export function readEnv(name: string): string | null {
  const value = process.env[name];
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
