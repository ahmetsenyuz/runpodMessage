import { BacklogItem } from '../../src/models/BacklogItem';
import { createTestBacklogItem } from '../testSetup';

describe('BacklogItem Model', () => {
  let item: BacklogItem;

  beforeEach(() => {
    item = createTestBacklogItem();
  });

  test('should create a new backlog item with correct properties', () => {
    expect(item.id).toBe('BI-0001');
    expect(item.title).toBe('Test Backlog Item');
    expect(item.description).toBe('This is a test backlog item for unit testing purposes.');
    expect(item.status).toBe('To Do');
  });

  test('should get and set title correctly', () => {
    const newTitle = 'Updated Title';
    item.title = newTitle;
    expect(item.title).toBe(newTitle);
  });

  test('should get and set description correctly', () => {
    const newDescription = 'Updated description';
    item.description = newDescription;
    expect(item.description).toBe(newDescription);
  });

  test('should get and set status correctly', () => {
    const newStatus = 'In Progress';
    item.status = newStatus;
    expect(item.status).toBe(newStatus);
  });

  test('should serialize to JSON correctly', () => {
    const json = item.toJSON();
    expect(json.id).toBe('BI-0001');
    expect(json.title).toBe('Test Backlog Item');
    expect(json.description).toBe('This is a test backlog item for unit testing purposes.');
    expect(json.status).toBe('To Do');
  });

  test('should create from JSON correctly', () => {
    const originalItem = createTestBacklogItem();
    const json = originalItem.toJSON();
    const newItem = BacklogItem.fromJSON(json);
    
    expect(newItem.id).toBe(json.id);
    expect(newItem.title).toBe(json.title);
    expect(newItem.description).toBe(json.description);
    expect(newItem.status).toBe(json.status);
  });

  test('should handle date serialization correctly', () => {
    const json = item.toJSON();
    expect(json.createdAT).toBeDefined();
    expect(json.updatedAT).toBeDefined();
  });
});