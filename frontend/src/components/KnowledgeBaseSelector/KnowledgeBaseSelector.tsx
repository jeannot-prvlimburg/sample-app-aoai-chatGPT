import React from 'react'
import { Dropdown, IDropdownOption, Panel } from '@fluentui/react'
import { AppStateContext } from '../../state/AppProvider'

interface KnowledgeBaseSelectorProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSelect: (kb: string) => void;
  selectedKnowledgeBase: string;
}

const KnowledgeBaseSelector: React.FC<KnowledgeBaseSelectorProps> = ({
  isOpen,
  onDismiss,
  onSelect,
  selectedKnowledgeBase,
  knowledgeBases
}) => {
  const appStateContext = React.useContext(AppStateContext)
  const knowledgeBases = appStateContext?.state.availableKnowledgeBases || []

  const onKBChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (option) {
      onSelect(option.key as string);
    }
  }

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText="Selecteer Kennisbank"
      closeButtonAriaLabel="Sluiten"
    >
      {knowledgeBases.length > 0 ? (
        <Dropdown
          label="Kies een kennisbank"
          selectedKey={selectedKnowledgeBase}
          options={knowledgeBases}
          onChange={onKBChange}
        />
      ) : (
        <p>Geen kennisbanken beschikbaar</p>
      )}
    </Panel>
  )
}

export default KnowledgeBaseSelector