import { Page } from "@playwright/test";

enum WidgetPageSelectors {
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    BUTTON_OPEN = '[data-test=openWidget]',
    BUTTON_ALL_ARTICLES = '[data-test=button_all_articles]',
    CATEGORY_BUTTON = 'button.category-wrapper__JhRDa',
    SEARCH_INPUT = 'header input[type="text"]',
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    async openWidget() {
        const button = this.page
            .locator(WidgetPage.selector.BUTTON_OPEN)
            .first();

        console.log("Открываю виджет...");

        await button.waitFor({
            state: "attached",
            timeout: 10000,
        });

        await button.click({ timeout: 10000 });

        console.log("Виджет открыт.");
    }

    async getPopularArticles() {
        const widgetBody = this.getWidgetBody();

        const allArticlesButton = widgetBody.locator(
            WidgetPage.selector.BUTTON_ALL_ARTICLES
        );

        if (await allArticlesButton.isVisible().catch(() => false)) {
            await allArticlesButton.click();
        }

        return widgetBody.locator(
            WidgetPage.selector.CATEGORY_BUTTON
        );
    }

    getSearchInput() {
        return this.getWidgetBody().locator(
            WidgetPage.selector.SEARCH_INPUT
        );
    }

    getWidgetBody() {
        return this.page.locator(
            WidgetPage.selector.WIDGET_BODY
        );
    }
}