# Data Models

This directory contains the core data models for the to-do application.

## BacklogItem

The `BacklogItem` class represents a single backlog item with the following properties:

- `id`: Unique identifier for the backlog item
- `title`: Title of the backlog item
- `description`: Detailed description of the backlog item
- `status`: Current status of the backlog item (To Do, In Progress, Done)
- `createdAt`: Timestamp when the item was created
- `updatedAt`: Timestamp when the item was last updated

### Status Enum

The `Status` enum defines the possible states for a backlog item:
- `ToDo` - The item is pending work
- `InProgress` - The item is currently being worked on
- `Done` - The item has been completed

### Serialization

The `BacklogItem` class provides methods for serializing and deserializing data:
- `toJSON()`: Converts the object to a JSON representation
- `fromJSON()`: Creates a new instance from a JSON object