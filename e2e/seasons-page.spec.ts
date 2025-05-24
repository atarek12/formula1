import { test, expect } from "@playwright/test";

test.describe("App E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the app successfully", async ({ page }) => {
    await expect(page).toHaveTitle("Formula 1");

    // Wait for the loading table to be visible
    const loadingTable = page.getByTestId("loading-table");
    await expect(loadingTable).toBeVisible();

    // Wait for the table to be replaced with the actual content
    const table = page.getByTestId("table");
    await expect(table).toBeVisible();

    const rows = table.getByTestId("table-row");
    expect(rows).toBeTruthy();
  });

  test("should toggle between list and grid view", async ({ page }) => {
    const switchViewButton = page.getByTestId("switch-view");
    await expect(switchViewButton).toBeVisible();
    await switchViewButton.click();

    const gridView = page.getByTestId("grid");
    await expect(gridView).toBeVisible();

    await switchViewButton.click();
    const listView = page.getByTestId("table");
    await expect(listView).toBeVisible();
  });

  test("should navigate to the races page and back via multiple options", async ({
    page,
  }) => {
    // Go to the races page by clicking on the season year link
    const seasonYear = page.getByTestId("seasons-races-link").first();
    await seasonYear.click();

    const racesPage = page.getByTestId("races-page");
    await expect(racesPage).toBeVisible();

    // Go back to the seasons page by clicking the browser back button
    await page.goBack();
    const seasonsPage = page.getByTestId("seasons-page");
    await expect(seasonsPage).toBeVisible();

    // Go to the races page by clicking the "View Races" button
    const buttons = page.getByTestId("seasons-races-button").first();
    await buttons.click();

    const racesPage2 = page.getByTestId("races-page");
    await expect(racesPage2).toBeVisible();

    // Go back to the seasons page by clicking the "All Seasons" breadcrumb link
    const breadcrumbs = page.getByTestId("breadcrumb-link").first();
    await breadcrumbs.click();

    const seasonsPage2 = page.getByTestId("seasons-page");
    await expect(seasonsPage2).toBeVisible();
  });

  test("should paginate through the table data", async ({ page }) => {
    const pagination = page.getByTestId("pagination");
    await expect(pagination).toBeVisible();

    const selectPageSize = page.getByTestId("select-pagesize");
    await expect(selectPageSize).toBeVisible();

    await selectPageSize.selectOption("10");
    await expect(selectPageSize).toHaveValue("10");

    const firstSeasonBefore = await page
      .getByTestId("seasons-races-link")
      .first()
      .textContent();

    const currentPageSelect = page.getByTestId("select-current-page");
    await expect(currentPageSelect).toBeVisible();

    await currentPageSelect.selectOption("2");
    await expect(currentPageSelect).toHaveValue("2");

    const firstSeasonAfter = await page
      .getByTestId("seasons-races-link")
      .first()
      .textContent();

    expect(firstSeasonBefore).not.toEqual(firstSeasonAfter);

    const previousButton = page.getByTestId("button-previous-page");
    await previousButton.click();

    await expect(currentPageSelect).toHaveValue("1");
    await expect(previousButton).toBeDisabled();
    expect(
      await page.getByTestId("seasons-races-link").first().textContent(),
    ).toEqual(firstSeasonBefore);

    const nextButton = page.getByTestId("button-next-page");
    await nextButton.click();

    await expect(currentPageSelect).toHaveValue("2");
    expect(
      await page.getByTestId("seasons-races-link").first().textContent(),
    ).toEqual(firstSeasonAfter);
  });
});
