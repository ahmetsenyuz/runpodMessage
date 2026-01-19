# RunPod Message Application - Help and Documentation

## Overview
This application is a command-line tool for managing backlog items in a development workflow. It allows users to create, view, update, and manage backlog items through a simple console interface.

## Available Commands

### Main Menu Options
1. **View all backlog items** - Display all backlog items in the system
2. **Add new backlog item** - Create a new backlog item with title, description, and status
3. **View specific backlog item** - Show details of a specific backlog item
4. **Update backlog item** - Modify properties of an existing backlog item
5. **Delete backlog item** - Remove a backlog item from the system
6. **Mark backlog item as complete** - Change the status of an item to "Done"
7. **Search backlog items** - Find backlog items by keyword search
8. **Sort backlog items** - Sort items by status, creation date, or title
9. **Exit** - Quit the application

### Usage Examples

#### Adding a New Backlog Item
```
1. Select "Add new backlog item" from the main menu
2. Enter a unique ID (e.g., BI-0001)
3. Provide a title (e.g., "Implement Help and Documentation System")
4. Add a description explaining the purpose
5. Set initial status (To Do, In Progress, Done)
```

#### Searching Backlog Items
```
1. Select "Search backlog items" from the main menu
2. Enter a search term (e.g., "help", "documentation")
3. View all matching backlog items
```

#### Sorting Backlog Items
```
1. Select "Sort backlog items" from the main menu
2. Choose sorting option:
   - 1. Sort by Status
   - 2. Sort by Creation Date
   - 3. Sort by Title
3. View sorted list of backlog items
```

## Context-Sensitive Help

For detailed help on specific operations:
- When adding items, the system prompts for required fields
- When updating items, the current values are displayed for easy modification
- When searching, enter keywords to find relevant items
- When sorting, choose from the available sorting criteria

## Technical Details

This application uses TypeScript and follows a modular architecture:
- Models define the data structures (BacklogItem)
- Storage handles persistence (BacklogItemStorage)
- Error handling manages exceptions
- Main application logic resides in ConsoleApp class

## Getting Started

1. Run the application using `npm start`
2. Navigate through the menu options using numeric selections
3. Follow on-screen prompts for each operation
4. Use the search functionality to quickly locate items