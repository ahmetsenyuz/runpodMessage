import { BacklogItem } from "../models/BacklogItem";

export class BacklogItemStorage {
  private storage: Map<string, BacklogItem> = new Map();
  private lock: boolean = false;

  /**
   * Creates a new backlog item in storage
   * @param item The backlog item to create
   * @returns Boolean indicating success
   */
  public create(item: BacklogItem): boolean {
    if (this.lock) {
      throw new Error("Storage is currently locked");
    }

    if (this.storage.has(item.id)) {
      return false;
    }

    this.storage.set(item.id, item);
    return true;
  }

  /**
   * Reads a backlog item from storage
   * @param id The ID of the item to read
   * @returns The backlog item or null if not found
   */
  public read(id: string): BacklogItem | null {
    if (this.lock) {
      throw new Error("Storage is currently locked");
    }

    return this.storage.get(id) || null;
  }

  /**
   * Updates an existing backlog item in storage
   * @param item The backlog item to update
   * @returns Boolean indicating success
   */
  public update(item: BacklogItem): boolean {
    if (this.lock) {
      throw new Error("Storage is currently locked");
    }

    if (!this.storage.has(item.id)) {
      return false;
    }

    this.storage.set(item.id, item);
    return true;
  }

  /**
   * Deletes a backlog item from storage
   * @param id The ID of the item to delete
   * @returns Boolean indicating success
   */
  public delete(id: string): boolean {
    if (this.lock) {
      throw new Error("Storage is currently locked");
    }

    return this.storage.delete(id);
  }

  /**
   * Gets all backlog items from storage
   * @returns Array of all backlog items
   */
  public getAll(): BacklogItem[] {
    if (this.lock) {
      throw new Error("Storage is currently locked");
    }

    return Array.from(this.storage.values());
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