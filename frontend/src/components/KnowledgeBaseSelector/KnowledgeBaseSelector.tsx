import React, { useState } from 'react'
import { Dropdown, IDropdownOption, IconButton, Panel } from '@fluentui/react'

const knowledgeBases: IDropdownOption[] = [
  { key: 'none', text: 'Geen Kennisbank' },
  { key: 'stikstof', text: 'Stikstof' },
]

const KnowledgeBaseSelector: React.FC<{ onSelect: (kb: string) => void }> = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedKB, setSelectedKB] = useState<IDropdownOption>(knowledgeBases[0])
  
    const togglePanel = () => setIsOpen(!isOpen)
  
    const onKBChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
      if (option) {
        setSelectedKB(option);
        onSelect(option.key as string);
        try {
          const response = await fetch('/set_knowledge_base', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ knowledge_base: option.key }),
          });
          if (!response.ok) {
            throw new Error('Failed to set knowledge base');
          }
        } catch (error) {
          console.error('Error setting knowledge base:', error);
        }
      }
    }

  return (
    <>
      <IconButton
        iconProps={{ iconName: 'Database' }}
        title="Selecteer Kennisbank"
        onClick={togglePanel}
      />
      <Panel
        isOpen={isOpen}
        onDismiss={togglePanel}
        headerText="Selecteer Kennisbank"
        closeButtonAriaLabel="Sluiten"
      >
        <Dropdown
          label="Kies een kennisbank"
          selectedKey={selectedKB.key}
          options={knowledgeBases}
          onChange={onKBChange}
        />
      </Panel>
    </>
  )
}

export default KnowledgeBaseSelector