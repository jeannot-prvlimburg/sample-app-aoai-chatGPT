import React from 'react'
import { Dropdown, IDropdownOption, Panel } from '@fluentui/react'
import { AppStateContext } from '../../state/AppProvider'

interface KnowledgeBaseSelectorProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSelect: (kb: string) => void;
  selectedKnowledgeBase: string;
  options: IDropdownOption[];
}

const KnowledgeBaseSelector: React.FC<KnowledgeBaseSelectorProps> = ({
  isOpen,
  onDismiss,
  onSelect,
  selectedKnowledgeBase,
  options,
}) => {
  const appStateContext = React.useContext(AppStateContext)

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
      {options.length > 0 ? (
        <Dropdown
          label="Kies een kennisbank"
          selectedKey={selectedKnowledgeBase}
          options={options}
          onChange={onKBChange}
        />
      ) : (
        <p>Geen kennisbanken beschikbaar</p>
      )}
    </Panel>
  )
}

export default KnowledgeBaseSelector