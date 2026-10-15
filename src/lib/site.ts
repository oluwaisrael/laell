const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const siteUrl = new URL(origin);
function httpsUrl(value: string | undefined) {
  try {
    const url = new URL(value || "");
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}
export const site = {
  name: "LĀEL",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  instagram: httpsUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  description:
    "Considered clothing. A quieter way of living. Explore the world of LĀEL, a contemporary lifestyle brand.",
};
