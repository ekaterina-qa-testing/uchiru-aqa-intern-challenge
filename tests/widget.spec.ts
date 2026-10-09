import { test, expect } from '@playwright/test';
import { WidgetPage } from "./widget.page";

test.describe('Uchi.ru widget', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    widgetPage = new WidgetPage(page);

    await page.goto('/');
    await page.click('._UCHI_COOKIE__button');
  });

  test('opens', async () => {
    await widgetPage.openWidget();

    await expect(
      widgetPage.getWidgetBody()
    ).toBeVisible();
  });

  test('opens knowledge base', async () => {
    await widgetPage.openWidget();

    const categories = await widgetPage.getPopularArticles();

    await expect(categories.first()).toBeVisible();
    await expect(categories).toHaveCount(27);
  });

  test('search field accepts a query', async () => {
    await widgetPage.openWidget();

    const searchInput = widgetPage.getSearchInput();

    await expect(searchInput).toBeVisible();

    await searchInput.fill('оплата');

    await expect(searchInput).toHaveValue('оплата');
  });
});