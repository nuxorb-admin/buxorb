const SESSION_KEY = "nuxorb_demo_session";
const UNLOCK_KEY = "nuxorb_demo_unlocked";

export function getDemoSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function isDemoUnlocked(): boolean {
  return localStorage.getItem(UNLOCK_KEY) === "1";
}

export function unlockDemo(): void {
  localStorage.setItem(UNLOCK_KEY, "1");
}

export function lockDemo(): void {
  localStorage.removeItem(UNLOCK_KEY);
}
