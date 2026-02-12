import { test, expect, cleanupDatabase, seedResources } from './helpers/test-utils';

test.describe('Resource Browsing', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async () => {
    await cleanupDatabase();
    await seedResources();
  });

  test('Navigate from Homepage to Browse via Category filters', async ({ page }) => {
    await page.goto('/');

    // Verify initial state: Both LIVE resources visible on Homepage
    await expect(page.getByRole('heading', { name: 'PostgreSQL MCP' }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'System Architect Prompt' })).toBeVisible();

    // Click on "MCPs" category filter specifically in the "Shop by Category" grid
    // The previous failure was because getByRole('link', { name: 'MCPs' }).first() matched the Header link which goes to /mcp-servers
    const mcpGridLink = page.locator('section').filter({ hasText: /shop by category/i })
      .getByRole('link', { name: 'MCPs' });
    
    await mcpGridLink.click();

    // Verify navigation to /browse with correct query param
    await expect(page).toHaveURL(/browse\?categories=mcp-servers/); 
    
    // Verify grid updates: Only MCP resource visible
    await expect(page.getByRole('heading', { name: 'PostgreSQL MCP' }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'System Architect Prompt' })).not.toBeVisible();
  });

  test('Filter using Sidebar on Browse page', async ({ page }) => {
    await page.goto('/browse');

    // Click the label containing the "Prompts" checkbox
    // The checkbox itself has appearance-none styling with an SVG overlay, so we click the label
    const promptsLabel = page.locator('label').filter({ has: page.getByTestId('filter-checkbox-prompts') });
    await promptsLabel.click();

    // Verify URL updates
    await expect(page).toHaveURL(/categories=prompts/);

    // Verify grid updates: Only Prompt resource visible
    await expect(page.getByRole('heading', { name: 'System Architect Prompt' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'PostgreSQL MCP' }).first()).not.toBeVisible();
  });

  test('Navigate to resource detail page', async ({ page }) => {
    await page.goto('/');

    // Click on a resource card
    // Use force: true because sticky header sometimes covers the element during scroll-into-view
    const resourceCard = page.getByRole('heading', { name: 'PostgreSQL MCP' }).first();
    await resourceCard.click({ force: true });

    // Verify URL updates to detail page using /t/ route
    await expect(page).toHaveURL(/\/t\/postgresql-mcp/);

    // Verify content on detail page
    // Note: Detail page likely uses the same Title component so we check specific text
    await expect(page.getByRole('heading', { name: 'PostgreSQL MCP', level: 1 })).toBeVisible();
    await expect(page.getByText('A powerful PostgreSQL MCP server.').first()).toBeVisible();
    
    // Verify "Visit Website" existence
    await expect(page.getByRole('link', { name: /get resource/i }).first()).toBeVisible();
  });

  test('Back navigation preserves filter state', async ({ page }) => {
    await page.goto('/browse?categories=mcp-servers');

    // Verify filtered state
    await expect(page.getByRole('heading', { name: 'PostgreSQL MCP' }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'System Architect Prompt' })).not.toBeVisible();

    // Click on resource (use force: true for sticky header interference)
    await page.getByRole('heading', { name: 'PostgreSQL MCP' }).first().click({ force: true });

    // Verify detail page
    await expect(page).toHaveURL(/\/t\/postgresql-mcp/);

    // Navigate back
    await page.goBack();

    // Verify we returned to the filtered list
    await expect(page).toHaveURL(/categories=mcp-servers/);
    await expect(page.getByRole('heading', { name: 'PostgreSQL MCP' }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'System Architect Prompt' })).not.toBeVisible();
  });
});
