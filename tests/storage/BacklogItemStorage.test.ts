import { BacklogItemStorage } from '../../src/storage/BacklogItemStorage';
import { BacklogItem } from '../../src/models/BacklogItem';
import { createTestBacklogItem, createTestStorage } from '../testSetup';

describe('BacklogItemStorage', () => {
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

  test('should create a new backlog item successfully', () => {
    const result = storage.create(item);
    expect(result).toBe(true);
  });

  test('should not create a backlog item with duplicate ID', () => {
    // Create the item first
    storage.create(item);
    
    // Try to create another item with the same ID
    const newItem = new BacklogItem(
      'BI-0001',
      'Another Test Item',
      'This should not be created',
      'To Do'
    );
    
    const result = storage.create(newItem);
    expect(result).toBe(false);
  });

  test('should read a backlog item successfully', () => {
    // Create the item first
    storage.create(item);
    
    const result = storage.read(item.id);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.id).toBe(item.id);
      expect(result.title).toBe(item.title);
    }
  });

  test('should return null when reading non-existent item', () => {
    const result = storage.read('non-existent-id');
    expect(result).toBeNull();
  });

  test('should update an existing backlog item successfully', () => {
    // Create the item first
    storage.create(item);
    
    // Modify the item
    item.title = 'Updated Title';
    item.description = 'Updated Description';
    
    const result = storage.update(item);
    expect(result).toBe(true);
    
    // Verify the update
    const updatedItem = storage.read(item.id);
    expect(updatedItem).not.toBeNull();
    if (updatedItem) {
      expect(updatedItem.title).toBe('Updated Title');
      expect(updatedItem.description).toBe('Updated Description');
    }
  });

  test('should not update a non-existent backlog item', () => {
    const result = storage.update(item);
    expect(result).toBe(false);
  });

  test('should delete an existing backlog item successfully', () => {
    // Create the item first
    storage.create(item);
    
    const result = storage.delete(item.id);
    expect(result).toBe(true);
    
    // Verify the deletion
    const deletedItem = storage.read(item.id);
    expect(deletedItem).toBeNull();
  });

  test('should not delete a non-existent backlog item', () => {
    const result = storage.delete('non-existent-id');
    expect(result).toBe(false);
  });

  test('should get all backlog items', () => {
    // Create multiple items
    const item1 = new BacklogItem('BI-0001', 'Item 1', 'Description 1', 'To Do');
    const item2 = new BacklogItem('BI-0002', 'Item 2', 'Description 2', 'In Progress');
    
    storage.create(item1);
    storage.create(item2);
    
    const result = storage.getAll();
    expect(result.length).toBe(2);
    expect(result[0].id).toBe('BI-0001');
    expect(result[1].id).toBe('BI-0002');
  });

  test('should search for backlog items by title or description', () => {
    // Create multiple items
    const item1 = new BacklogItem('BI-0001', 'Sample Item', 'Description 1', 'To Do');
    const item2 = new BacklogItem('BI-0002', 'Another Item', 'Sample Description', 'In Progress');
    
    storage.create(item1);
    storage.create(item2);
    
    // Search by title
    const result1 = storage.search('sample');
    expect(result1.length).toBe(2);
    
    // Search by description
    const result2 = storage.search('description');
    expect(result2.length).toBe(2);
    
    // Search for non-existent term
    const result3 = storage.search('nonexistent');
    expect(result3.length).toBe(0);
  });

  test('should lock storage to prevent concurrent access', () => {
    storage.lockStorage();
    expect(storage['lock']).toBe(true);
  });

  test('should unlock storage to allow concurrent access', () => {
    storage.lockStorage();
    storage.unlockStorage();
    expect(storage['lock']).toBe(false);
  });
});