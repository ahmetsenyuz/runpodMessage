import { BacklogItem } from './models/BacklogItem';
import { BacklogItemStorage } from './storage/BacklogItemStorage';

// Main console application entry point
class ConsoleApp {
  private storage: BacklogItemStorage;

  constructor() {
    this.storage = new BacklogItemStorage();
  }

  // Display the main menu
  displayMenu(): void {
    console.log('\n================== Backlog Item Management System ==================');
    console.log('1. View all backlog items');
    console.log('2. Add new backlog item');
    console.log('3. View specific backlog item');
    console.log('4. Update backlog item');
    console.log('5. Delete backlog item');
    console.log('6. Mark backlog item as complete');
    console.log('0. Exit');
    console.log('====================================================================');
  }

  // Parse user input
  parseInput(input: string): string {
    return input.trim().toLowerCase();
  }

  // Handle user choice
  async handleChoice(choice: string): Promise<boolean> {
    switch (choice) {
      case '1':
        await this.viewAllItems();
        break;
      case '2':
        await this.addNewItem();
        break;
      case '3':
        await this.viewSpecificItem();
        break;
      case '4':
        await this.updateItem();
        break;
      case '5':
        await this.deleteItem();
        break;
      case '6':
        await this.markItemAsComplete();
        break;
      case '0':
        console.log('Goodbye!');
        return false;
      default:
        console.log('Invalid choice. Please try again.');
    }
    return true;
  }

  // View all backlog items
  async viewAllItems(): Promise<void> {
    const items = this.storage.getAll();
    console.log('\n------------------------ All Backlog Items ------------------------');
    if (items.length == 0) {
      console.log('No backlog items found.');
    } else {
      items.forEach(item => {
        console.log(`ID: ${item.id}`);
        console.log(`Title: ${item.title}`);
        console.log(`Description: ${item.description}`);
        console.log(`Status: ${item.status}`);
        console.log(`Created: ${item.createdAt.toISOString()}`);
        console.log(`Updated: ${item.updatedAt.toISOString()}`);
        console.log('------------------------');
      });
    }
  }

  // Add a new backlog item
  async addNewItem(): Promise<void> {
    // In a real implementation, we would prompt for user input
    // For now, we'll create a sample item
    const newItem = new BacklogItem(
      'BI-0001',
      'Sample Backlog Item',
      'This is a sample backlog item for demonstration purposes.',
      'To Do'
    );

    if (this.storage.create(newItem)) {
      console.log('New backlog item added successfully!');
    } else {
      console.log('Failed to add backlog item. Item ID might already exist.');
    }
  }

  // View a specific backlog item
  async viewSpecificItem(): Promise<void> {
    // In a real implementation, we would prompt for item ID
    // For now, we'll show the first item if it exists
    const items = this.storage.getAll();
    if (items.length > 0) {
      const item = items[0];
      console.log('\n------------------------ Backlog Item Details ------------------------');
      console.log(`ID: ${item.id}`);
      console.log(`Title: ${item.title}`);
      console.log(`Description: ${item.description}`);
      console.log(`Status: ${item.status}`);
      console.log(`Created: ${item.createdAt.toISOString()}`);
      console.log(`Updated: ${item.updatedAt.toISOString()}`);
    } else {
      console.log('No backlog items found.');
    }
  }

  // Update a backlog item
  async updateItem(): Promise<void> {
    // In a real implementation, we would prompt for item ID and update fields
    // For now, we'll update the first item if it exists
    const items = this.storage.getAll();
    if (items.length > 0) {
      const item = items[0];

      console.log('\n------------------------ Updating Backlog Item ------------------------');
      console.log(`Current Title: ${item.title}`);
      console.log(`Current Description: ${item.description}`);

      // Simulate updating fields
      item.title = 'Updated Title';
      item.description = 'Updated Description';

      if (this.storage.update(item)) {
        console.log('Backlog item updated successfully!');
      } else {
        console.log('Failed to update backlog item.');
      }
    } else {
      console.log('No backlog items found to update.');
    }
  }

  // Delete a backlog item
  async deleteItem(): Promise<void> {
    // In a real implementation, we would prompt for item ID
    // For now, we'll delete the first item if it exists
    const items = this.storage.getAll();
    if (items.length > 0) {
      const itemId = items[0].id;
      if (this.storage.delete(itemId)) {
        console.log('Backlog item deleted successfully!');
      } else {
        console.log('Failed to delete backlog item.');
      }
    } else {
      console.log('No backlog items found to delete.');
    }
  }

  // Mark a backlog item as complete
  async markItemAsComplete(): Promise<void> {
    // In a real implementation, we would prompt for item ID
    // For now, we'll process the first item if it exists
    const items = this.storage.getAll();
    if (items.length > 0) {
      const item = items[0];
      
      console.log('\n------------------------ Marking Backlog Item as Complete ------------------------');
      console.log(`Current Title: ${item.title}`);
      console.log(`Current Status: ${item.status}`);
      
      // Validate that the item can be marked as complete
      if (item.status !== 'To Do' && item.status !== 'In Progress') {
        console.log('Error: Item status must be "To Do" or "In Progress" to be marked as complete.');
        return;
      }
      
      // Update the status to "Done"
      item.status = 'Done';
      
      if (this.storage.update(item)) {
        console.log('Backlog item marked as complete successfully!');
        console.log(`New Status: ${item.status}`);
      } else {
        console.log('Failed to mark backlog item as complete.');
      }
    } else {
      console.log('No backlog items found to mark as complete.');
    }
  }

  // Main application loop
  async run(): Promise<void> {
    console.log('Welcome to the Backlog Item Management System!');
    
    let running = true;
    while (running) {
      this.displayMenu();
      // In a real implementation, we would read actual user input
      // For now, we'll simulate some choices for testing
      const choice = '6'; // Simulate choosing mark as complete option
      running = await this.handleChoice(choice);
    }
  }
}

// Entry point
async function main(): Promise<void> {
  const app = new ConsoleApp();
  await app.run();
}

// Run the application
main().catch(console.error);