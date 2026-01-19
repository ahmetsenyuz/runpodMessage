import { BacklogItem } from '../src/models/BacklogItem';
import { BacklogItemStorage } from '../src/storage/BacklogItemStorage';
import { createTestBacklogItem, createTestStorage } from './testSetup';

describe('Business Logic', () => {
  let storage: BacklogItemStorage;
  let item: BacklogItem;

  beforeEach(() => {
    storage = createTestStorage();
    item = createTestBacklogItem();
  });

  afterEach(() => {
    // Clear storage after each test
    storage.unlockStorage();
  });

  test('should handle basic CRUD operations through business logic', () => {
    // Create
    const createResult = storage.create(item);
    expect(createResult).toBe(true);

    // Read
    const readResult = storage.read(item.id);
    expect(readResult).not.toBeNull();
    if (readResult) {
      expect(readResult.id).toBe(item.id);
    }

    // Update
    if (readResult) {
      readResult.title = 'Updated Title';
      const updateResult = storage.update(readResult);
      expect(updateResult).toBe(true);
    }

    // Delete
    const deleteResult = storage.delete(item.id);
    expect(deleteResult).toBe(true);
  });

  test('should properly manage backlog item status transitions', () => {
    // Create item
    storage.create(item);
    
    // Verify initial status
    const readItem = storage.read(item.id);
    expect(readItem).not.toBeNull();
    if (readItem) {
      expect(readItem.status).toBe('To Do');
      
      // Transition to In Progress
      readItem.status = 'In Progress';
      storage.update(readItem);
      
      const updatedItem = storage.read(item.id);
      expect(updatedItem).not.toBeNull();
      if (updatedItem) {
        expect(updatedItem.status).toBe('In Progress');
        
        // Transition to Done
        updatedItem.status = 'Done';
        storage.update(updatedItem);
        
        const finalItem = storage.read(item.id);
        expect(finalItem).not.toBeNull();
        if (finalItem) {
          expect(finalItem.status).toBe('Done');
        }
      }
    }
  });

  test('should validate backlog item creation with proper inputs', () => {
    // Valid item creation
    const validItem = new BacklogItem(
      'BI-0002',
      'Valid Item',
      'This is a valid item',
      'To Do'
    );
    
    const result = storage.create(validItem);
    expect(result).toBe(true);
    
    // Invalid item creation (missing required fields would be handled by constructor)
    // We'll test that we can still create items with minimal valid data
    const minimalItem = new BacklogItem(
      'BI-0003',
      'Minimal Item',
      '',
      'To Do'
    );
    
    const minimalResult = storage.create(minimalItem);
    expect(minimalResult).toBe(true);
  });

  test('should handle edge cases in business logic', () => {
    // Attempt to update non-existent item
    const updateResult = storage.update(item);
    expect(updateResult).toBe(false);
    
    // Attempt to delete non-existent item
    const deleteResult = storage.delete('non-existent-id');
    expect(deleteResult).toBe(false);
    
    // Attempt to read non-existent item
    const readResult = storage.read('non-existent-id');
    expect(readResult).toBeNull();
    
    // Attempt to create item with duplicate ID
    storage.create(item);
    const duplicateResult = storage.create(item);
    expect(duplicateResult).toBe(false);
  });

  test('should properly handle search functionality in business logic', () => {
    // Create multiple items
    const item1 = new BacklogItem('BI-0001', 'Sample Item', 'Description 1', 'To Do');
    const item2 = new BacklogItem('BI-0002', 'Another Item', 'Sample Description', 'In Progress');
    
    storage.create(item1);
    storage.create(item2);
    
    // Search for items
    const searchResults = storage.search('sample');
    expect(searchResults.length).toBe(2);
    
    // Search for items with different query
    const searchResults2 = storage.search('another');
    expect(searchResults2.length).toBe(1);
    
    // Search for non-existent items
    const searchResults3 = storage.search('nonexistent');
    expect(searchResults3.length).toBe(0);
  });

  test('should maintain data integrity during operations', () => {
    // Create item
    storage.create(item);
    
    // Read and verify data
    const readItem = storage.read(item.id);
    expect(readItem).not.toBeNull();
    if (readItem) {
      expect(readItem.id).toBe(item.id);
      expect(readItem.title).toBe(item.title);
      expect(readItem.description).toBe(item.description);
      expect(readItem.status).toBe(item.status);
    }
    
    // Update item
    if (readItem) {
      readItem.title = 'Modified Title';
      storage.update(readItem);
      
      // Read updated item
      const updatedItem = storage.read(item.id);
      expect(updatedItem).not.toBeNull();
      if (updatedItem) {
        expect(updatedItem.title).toBe('Modified Title');
      }
    }
  });
});