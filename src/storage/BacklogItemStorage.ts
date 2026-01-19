import { BacklogItem } from '../models/BacklogItem';
import { AppError, handleGlobalError } from '../errorHandler';

export class BacklogItemStorage {
  private storage: Map<string, BacklogItem> = new Map();
  private lock: boolean = false;

  /**
   * Creates a new backlog item in storage
   * @param item The backlog item to create
   * @returns Boolean indicating success
   */
  public create(item: BacklogItem): boolean {
    try {
      if (this.lock) {
        throw new AppError("Storage is currently locked");
      }

      if (this.storage.has(item.id)) {
        return false;
      }

      this.storage.set(item.id, item);
      return true;
    } catch (error) {
      handleGlobalError(error, 'BacklogItemStorage.create');
      return false;
    }
  }

  /**
   * Reads a backlog item from storage
   * @param id The ID of the item to read
   * @returns The backlog item or null if not found
   */
  public read(id: string): BacklogItem | null {
    try {
      if (this.lock) {
        throw new AppError("Storage is currently locked");
      }

      return this.storage.get(id) || null;
    } catch (error) {
      handleGlobalError(error, 'BacklogItemStorage.read');
      return null;
    }
  }

  /**
   * Updates an existing backlog item in storage
   * @param item The backlog item to update
   * @returns Boolean indicating success
   */
  public update(item: BacklogItem): boolean {
    try {
      if (this.lock) {
        throw new AppError("Storage is currently locked");
      }

      if (!this.storage.has(item.id)) {
        return false;
      }

      this.storage.set(item.id, item);
      return true;
    } catch (error) {
      handleGlobalError(error, 'BacklogItemStorage.update');
      return false;
    }
  }

  /**
   * Deletes a backlog item from storage
   * @param id The ID of the item to delete
   * @returns Boolean indicating success
   */
  public delete(id: string): boolean {
    try {
      if (this.lock) {
        throw new AppError("Storage is currently locked");
      }

      return this.storage.delete(id);
    } catch (error) {
      handleGlobalError(error, 'BacklogItemStorage.delete');
      return false;
    }
  }

  /**
   * Gets all backlog items from storage
   * @returns Array of all backlog items
   */
  public getAll(): BacklogItem[] {
    try {
      if (this.lock) {
        throw new AppError("Storage is currently locked");
      }

      return Array.from(this.storage.values());
    } catch (error) {
      handleGlobalError(error, 'BacklogItemStorage.getAll');
      return [];
    }
  }

  /**
   * Searches for backlog items by title or description (case-insensitive)
   * @param query The search query
   * @returns Array of matching backlog items
   */
  public search(query: string): BacklogItem[] {
    try {
      if (this.lock) {
        throw new AppError("Storage is currently locked");
      }

      const lowerQuery = query.toLowerCase();
      const results: BacklogItem[] = [];

      for (const item of this.storage.values()) {
        if (item.title.toLowerCase().includes(lowerQuery) || 
            item.description.toLowerCase().includes(lowerQuery)) {
          results.push(item);
        }
      }

      return results;
    } catch (error) {
      handleGlobalError(error, 'BacklogItemStorage.search');
      return [];
    }
  }

  /**
   * Locks the storage to prevent concurrent access
   */
  public lockStorage(): void {
    this.lock = true;
  }

  /**
   * Unlocks the storage to allow concurrent access
   */
  public unlockStorage(): void {
    this.lock = false;
  }
}