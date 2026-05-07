import { Logger } from "@axiomhq/nextjs";

export const log = new Logger({
  dataset: process.env.NEXT_PUBLIC_AXIOM_DATASET ?? "prodify-logs",
  token: process.env.AXIOM_TOKEN ?? "",
  url: process.env.AXIOM_URL ?? "https://api.axiom.co",
});
