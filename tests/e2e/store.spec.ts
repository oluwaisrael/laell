import { test, expect } from "@playwright/test";
test("catalogue category and price sorting", async ({ page }) => {
  await page.goto("/shop");
  await page.getByRole("button", { name: "Accessories", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-card")).toContainText("The Day Tote");
  await page.getByRole("button", { name: "All pieces", exact: true }).click();
  await page.getByLabel("Sort by").selectOption("high");
  await expect(page.locator(".product-card").first()).toContainText(
    "The Column Dress",
  );
});
test("size selection, persistent bag, quantities, removal, safe demo checkout", async ({
  page,
}) => {
  await page.goto("/shop/the-everyday-shirt");
  await expect(
    page.getByRole("button", { name: "Select a size", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "XL unavailable" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("₦48,000");
  await page
    .getByRole("button", { name: "Increase The Everyday Shirt quantity" })
    .click();
  await expect(dialog).toContainText("₦96,000");
  await page.getByRole("button", { name: /Close Your bag/ }).click();
  await page.reload();
  await page.getByRole("button", { name: /Bag 02/ }).click();
  await expect(dialog).toContainText("₦96,000");
  await page.getByRole("link", { name: "Preview checkout" }).click();
  await page.getByRole("button", { name: "Finish demo preview" }).click();
  await expect(page.getByRole("status")).toContainText("No purchase was made");
  await page.getByRole("button", { name: "Edit your bag" }).click();
  await page.getByRole("button", { name: "Remove", exact: true }).click();
  await expect(dialog).toContainText("A little room");
});
test("size guide, zoom, escape key and focus restoration", async ({ page }) => {
  await page.goto("/shop/the-everyday-shirt");
  await page.getByRole("button", { name: "Size guide" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "Illustrative sizing only",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Size guide" })).toBeFocused();
  await page.getByRole("button", { name: "Zoom product photograph" }).click();
  await expect(page.getByRole("dialog")).toContainText("A closer look");
  await page.keyboard.press("Escape");
});
test("contact and newsletter remain explicitly demo only", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("Preview visitor");
  await page
    .getByRole("textbox", { name: "Email address", exact: true })
    .first()
    .fill("test@example.com");
  await page.getByLabel("Your message").fill("A sample enquiry for the demo.");
  await page.getByRole("button", { name: "Preview message" }).click();
  await expect(page.getByRole("status")).toContainText(
    "not been sent or saved",
  );
  await page.locator("#newsletter-email").fill("test@example.com");
  await page.getByRole("button", { name: "Preview newsletter signup" }).click();
  await expect(page.locator(".newsletter-form")).toContainText(
    "not saved or subscribed",
  );
});
test("all public routes render without horizontal overflow", async ({
  page,
}, testInfo) => {
  for (const path of [
    "/",
    "/shop",
    "/house",
    "/world",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
    "/legal/shipping",
    "/legal/returns",
    "/legal/business",
    "/checkout",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.locator("img:visible").evaluateAll(async (images) => {
      await Promise.all(
        images.map((image) =>
          (() => {
            const photo = image as HTMLImageElement;
            photo.loading = "eager";
            return photo.decode();
          })(),
        ),
      );
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/");
  await page
    .locator(".campaign img")
    .evaluate((img: HTMLImageElement) => img.decode());
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await expect(page.locator(".campaign img")).toBeVisible();
});
test("invalid stored data recovers and missing product returns 404", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("lael-bag-v1", "not-json"),
  );
  await page.goto("/");
  await page.getByRole("button", { name: /Bag 00/ }).click();
  await expect(page.getByRole("dialog")).toContainText("A little room");
  await page.keyboard.press("Escape");
  const response = await page.goto("/shop/missing-piece");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Nothing here, just yet." }),
  ).toBeVisible();
});
test("navigation works on mobile and desktop", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "The House" })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "The House" })
      .click();
  }
  await expect(page).toHaveURL("/house");
  await expect(
    page.getByRole("heading", {
      name: "A considered life. An open perspective.",
    }),
  ).toBeVisible();
});

test("bag synchronizes across tabs and respects the stock cap", async ({
  page,
  context,
}) => {
  await page.goto("/shop/the-everyday-shirt");
  const other = await context.newPage();
  await other.goto("/");
  await page.getByRole("button", { name: "S", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  for (let i = 0; i < 4; i++)
    await page
      .getByRole("button", { name: "Increase The Everyday Shirt quantity" })
      .click();
  await expect(
    page.getByRole("button", { name: "Increase The Everyday Shirt quantity" }),
  ).toBeDisabled();
  await expect(other.getByRole("button", { name: /Bag 05/ })).toBeVisible();
  await other.evaluate(() => localStorage.clear());
  await expect(page.getByRole("dialog")).toContainText("A little room");
});

test("bag stays usable when browser storage is blocked", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    });
  });
  await page.goto("/shop/the-day-tote");
  await page.getByRole("button", { name: "One size", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("₦28,000");
  await expect(page.getByRole("dialog")).toContainText(
    "storage is unavailable",
  );
});
