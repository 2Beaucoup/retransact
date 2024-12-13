import { Button, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export interface KanbanCardChange {
  id: string
  order?: number
  newSectionId?: string
}

export interface KanbanSectionChange {
  id: string
  order?: number
}

export interface KanbanSection {
  id: string
  order?: number
  [key: string]: any
  cards: KanbanCard[]
}

export interface KanbanCard {
  id: string
  order?: number
  [key: string]: any
}
interface KanbanBoardProps {
  sectionsWithCards: KanbanSection[]
  sectionComponent?: (section: KanbanSection) => React.ReactNode
  cardComponent?: (card: KanbanCard) => React.ReactNode
  onCardMove?: (changes: KanbanCardChange[]) => void
  onSectionMove?: (changes: KanbanSectionChange[]) => void
  onSectionsWithCardsChanged?: (sectionsWithCards: KanbanSection[]) => void
  onClickAddCard?: (sectionId: string) => void
  onClickAddSection?: () => void
}

const getSortedSections = (sections: KanbanSection[]) => {
  return sections.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

const getSortedCards = (cards: KanbanCard[]) => {
  return cards.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  sectionsWithCards,
  sectionComponent,
  cardComponent,
  onCardMove,
  onSectionMove,
  onSectionsWithCardsChanged,
  onClickAddCard,
  onClickAddSection,
}) => {
  const [sections, setSections] = useState(sectionsWithCards)

  const updateOrders = (items: any[]) => {
    return items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))
  }

  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result

    if (!destination) return

    const initialState = sections.map(section => ({
      id: section.id,
      order: section.order,
      cards: section.cards.map(card => ({
        id: card.id,
        order: card.order,
        sectionId: section.id,
      })),
    }))

    if (type === 'SECTION') {
      const items = Array.from(sections)
      const [movedSection] = items.splice(source.index, 1)
      items.splice(destination.index, 0, movedSection)
      const updatedSections = updateOrders(items)

      setSections(updatedSections)
      onSectionMove?.(
        updatedSections.map(section => ({
          id: section.id,
          order: section.order,
        })),
      )
      onSectionsWithCardsChanged?.(updatedSections)
      return
    }

    const sourceSection = sections.find(
      section => section.id === source.droppableId,
    )
    const destSection = sections.find(
      section => section.id === destination.droppableId,
    )

    if (!sourceSection || !destSection) return

    const newSections = sections.map(section => {
      if (section.id === source.droppableId) {
        const newCards = Array.from(section.cards)
        const [movedCard] = newCards.splice(source.index, 1)
        if (source.droppableId === destination.droppableId) {
          newCards.splice(destination.index, 0, movedCard)
          return { ...section, cards: updateOrders(newCards) }
        }
        return { ...section, cards: newCards }
      }

      if (section.id === destination.droppableId) {
        const newCards = Array.from(section.cards)
        const sourceCards = sections.find(
          s => s.id === source.droppableId,
        )?.cards
        if (!sourceCards) return section

        const [movedCard] = sourceCards.slice(source.index, source.index + 1)
        newCards.splice(destination.index, 0, movedCard)
        return { ...section, cards: updateOrders(newCards) }
      }

      return section
    })

    setSections(newSections)
    const changes: KanbanCardChange[] = []

    // Compare the new state to the initial state
    newSections.forEach(section => {
      const initialSection = initialState.find(s => s.id === section.id)
      if (initialSection) {
        section.cards.forEach(card => {
          const initialCard = initialState
            .flatMap(section => section.cards)
            .find(c => c.id === card.id)
          if (initialCard) {
            // Check if the nextId or sectionId has changed
            if (
              initialCard.order !== card.order ||
              initialCard.sectionId !== section.id
            ) {
              changes.push({
                id: card.id,
                order: card.order,
                newSectionId: section.id,
              })
            }
          }
        })
      }
    })

    onCardMove?.(changes)
    onSectionsWithCardsChanged?.(newSections)
  }

  useEffect(() => {
    if (sectionsWithCards && sectionsWithCards.length > 0) {
      // Sort the sections and cards
      const sortedSections = getSortedSections(sectionsWithCards)

      // Update the sections with new sorted cards
      const newSections = sortedSections.map(section => ({
        ...section,
        cards: getSortedCards(section?.cards ?? []),
      }))

      // Set the new sections state
      setSections(newSections)
    }
  }, [sectionsWithCards])

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="SECTION" direction="horizontal">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              display: 'flex',
              overflowX: 'auto',
              padding: '20px',
              gap: '20px',
            }}
          >
            {sections?.map((section, indexSection) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={indexSection}
              >
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div style={{ width: '280px' }}>
                      {sectionComponent ? (
                        sectionComponent(section)
                      ) : (
                        <Typography.Title level={5}>
                          {indexSection + 1}
                        </Typography.Title>
                      )}
                      <Droppable droppableId={section.id} type="CARD">
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="min-h-"
                            style={{
                              minHeight: '100px',
                            }}
                          >
                            {section?.cards.map((card, indexCard) => (
                              <Draggable
                                key={card.id}
                                draggableId={card.id}
                                index={indexCard}
                              >
                                {provided => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      margin: '0 0 8px 0',
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {cardComponent ? (
                                      cardComponent(card)
                                    ) : (
                                      <div
                                        style={{
                                          padding: '8px',
                                          borderRadius: '4px',
                                        }}
                                      >
                                        {card.order}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                            {onClickAddCard && (
                              <center>
                                <Button
                                  type="text"
                                  icon={<i className="las la-plus" />}
                                  onClick={() => onClickAddCard?.(section.id)}
                                >
                                  Add
                                </Button>
                              </center>
                            )}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {onClickAddSection && (
              <Button
                type="dashed"
                icon={<i className="las la-plus" />}
                onClick={onClickAddSection}
              >
                Add Section
              </Button>
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
