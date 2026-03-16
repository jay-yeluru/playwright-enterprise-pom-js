const { test, expect } = require('../fixtures/auth-page-manager.fixture');

test.describe('Dashboard Tests (Authenticated)', { tag: '@auth' }, () => {
    test('should verify feed tabs are visible on dashboard @smoke', async ({ app }) => {
        const dashboardPage = app.getDashboardPage();

        await dashboardPage.open();
        await dashboardPage.assertLoaded(expect);
        
        await expect(dashboardPage.yourFeedTab).toBeVisible();
        await expect(dashboardPage.globalFeedTab).toBeVisible();
    });

    test('should logout successfully', async ({ app }) => {
        const dashboardPage = app.getDashboardPage();
        await dashboardPage.open();

        await dashboardPage.logout();
        await dashboardPage.assertLoggedOut(expect);
    });
});
