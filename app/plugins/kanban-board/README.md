# KanbanBoard Component

## Overview and Purpose

The KanbanBoard component is a flexible and reusable drag-and-drop kanban board implementation. It enables organizing items into sections/columns with drag-and-drop functionality for both cards within sections and reordering of sections themselves.

## Props Interface

```typescript
interface KanbanBoardProps {
  sectionsWithCards: KanbanSection[] // Array of sections with their cards
  sectionComponent?: (section: KanbanSection) => React.ReactNode // Custom section renderer
  cardComponent?: (card: KanbanCard) => React.ReactNode // Custom card renderer
  onCardMove?: (changes: KanbanCardChange[]) => void // Called when cards are moved
  onSectionMove?: (changes: KanbanSectionChange[]) => void // Called when sections are reordered
  onSectionsWithCardsChanged?: (sectionsWithCards: KanbanSection[]) => void // Called after any change
  onClickAddCard?: (sectionId: string) => void // Called when add card button clicked
  onClickAddSection?: () => void // Called when add section button clicked
}
```

### Example Data Structure

```typescript
const sectionsWithCards = [
  {
    id: 'section1',
    order: 1,
    name: 'To Do',
    cards: [
      { id: 'card1', order: 1, title: 'Task 1' },
      { id: 'card2', order: 2, title: 'Task 2' },
    ],
  },
  {
    id: 'section2',
    order: 2,
    name: 'In Progress',
    cards: [{ id: 'card3', order: 1, title: 'Task 3' }],
  },
]

return (<KanbanBoard
sectionsWithCards={sectionsWithCards}>)
```

## Event Handlers

### onCardMove

Called when cards are dragged between sections or reordered within a section.

```typescript
const handleCardMove = async (changes: KanbanCardChange[]) => {
  // changes array contains moved cards with new order/section
  for (const change of changes) {
    await updateTask({
      where: { id: change.id },
      data: {
        order: change.order,
        sectionId: change.newSectionId,
      },
    })
  }
}
```

### onSectionMove

Called when sections are reordered.

```typescript
const handleSectionMove = async (changes: KanbanSectionChange[]) => {
  for (const change of changes) {
    await updateSection({
      where: { id: change.id },
      data: { order: change.order },
    })
  }
}
```

### onSectionsWithCardsChanged

Called after any change to sections or cards to sync local state.

```typescript
const handleSectionsChange = (newSections: KanbanSection[]) => {
  setSections(newSections)
}
```

### onClickAddCard

Called when add card button clicked in a section.

```typescript
const handleAddCard = (sectionId: string) => {
  setNewTaskSectionId(sectionId)
  setIsTaskModalVisible(true)
}
```

### onClickAddSection

Called when add section button clicked.

```typescript
const handleAddSection = () => {
  setIsAddSectionModalVisible(true)
}
```

## Custom Rendering

### Section Component Example

```tsx
sectionComponent={section => (
  <div style={{ borderRadius: 6, padding: 16 }}>
    <Flex align="center" justify="space-between">
      <Title level={5} style={{ margin: 0 }}>
        {section.name}
      </Title>
      <Text type="secondary">
        {section.cards?.length || 0}
      </Text>
    </Flex>
  </div>
)}
```

### Card Component Example

```tsx
cardComponent={card => (
<Card size="small">
<Flex vertical gap={10}>
        <Flex justify="space-between" align="center">
            <Typography.Text>
              {card.title}
            </Typography.Text>
        </Flex>
      </Flex>
</Card>
)}
```
