import { test, expect } from '@playwright/test';

test.describe('Todo App E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should add and complete a todo', async ({ page }) => {
    // Add todo
    await page.getByTestId('todo-input').fill('New E2E Todo');
    await page.getByTestId('add-todo-button').click();
    
    // Take screenshot
    await page.screenshot({ path: 'screenshots/new-todo.png' });
    
    // Verify todo exists
    const todo = page.getByText('New E2E Todo');
    await expect(todo).toBeVisible();
    
    // Complete todo
    await page.getByTestId('todo-checkbox').click();
    
    // Take screenshot of completed todo
    await page.screenshot({ path: 'screenshots/completed-todo.png' });
  });

  test('should edit a todo', async ({ page }) => {
    // Add todo
    await page.getByTestId('todo-input').fill('Original E2E Todo');
    await page.getByTestId('add-todo-button').click();
    
    // Edit todo
    await page.getByTestId('edit-todo-button').click();
    await page.getByTestId('edit-todo-input').fill('Updated E2E Todo');
    await page.getByTestId('save-todo-button').click();
    
    // Take screenshot
    await page.screenshot({ path: 'screenshots/edited-todo.png' });
    
    // Verify updated todo
    const updatedTodo = page.getByText('Updated E2E Todo');
    await expect(updatedTodo).toBeVisible();
  });

  test('should delete a todo', async ({ page }) => {
    // Add todo
    await page.getByTestId('todo-input').fill('Todo to Delete');
    await page.getByTestId('add-todo-button').click();
    
    // Take screenshot before deletion
    await page.screenshot({ path: 'screenshots/before-delete.png' });
    
    // Delete todo
    await page.getByTestId('delete-todo-button').click();
    
    // Take screenshot after deletion
    await page.screenshot({ path: 'screenshots/after-delete.png' });
    
    // Verify todo is deleted
    const deletedTodo = page.getByText('Todo to Delete');
    await expect(deletedTodo).not.toBeVisible();
  });

  test('should filter todos', async ({ page }) => {
    // Add multiple todos
    await page.getByTestId('todo-input').fill('First Todo');
    await page.getByTestId('add-todo-button').click();
    await page.getByTestId('todo-input').fill('Second Todo');
    await page.getByTestId('add-todo-button').click();
    
    // Take screenshot before filtering
    await page.screenshot({ path: 'screenshots/before-filter.png' });
    
    // Filter todos
    await page.getByTestId('search-input').fill('First');
    
    // Take screenshot after filtering
    await page.screenshot({ path: 'screenshots/after-filter.png' });
    
    // Verify filtered results
    await expect(page.getByText('First Todo')).toBeVisible();
    await expect(page.getByText('Second Todo')).not.toBeVisible();
  });

  test('responsive design', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.screenshot({ path: 'screenshots/desktop-view.png' });
    
    // Tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ path: 'screenshots/tablet-view.png' });
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'screenshots/mobile-view.png' });
  });
});