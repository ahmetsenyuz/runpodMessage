// Test setup file for configuring test environment
import { BacklogItem } from '../src/models/BacklogItem';
import { BacklogItemStorage } from '../src/storage/BacklogItemStorage';

// Create test instances
export const createTestBacklogItem = (): BacklogItem => {
  return new BacklogItem(
    'BI-0001',
    'Test Backlog Item',
    'This is a test backlog item for unit testing purposes.',
    'To Do'
  );
};

export const createTestStorage = (): BacklogItemStorage => {
  return new BacklogItemStorage();
};