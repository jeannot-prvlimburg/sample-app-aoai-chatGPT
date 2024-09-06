import React, { useState, useEffect } from 'react'
import { Dropdown, IDropdownOption, Panel } from '@fluentui/react'

const KnowledgeBaseSelector: React.FC<{ onSelect: (kb: string) => void, isOpen: boolean, onDismiss: () => void }> = ({ onSelect, isOpen, onDismiss }) => {
    const [knowledgeBases, setKnowledgeBases] = useState<IDropdownOption[]>([])
    const [selectedKB, setSelectedKB] = useState<IDropdownOption | undefined>(undefined)

    useEffect(() => {
        const fetchKnowledgeBases = async () => {
            try {
                const response = await fetch('/api/knowledgebases');
                if (!response.ok) {
                    throw new Error('Failed to fetch knowledge bases');
                }
                const data = await response.json();
                setKnowledgeBases(data);
                if (data.length > 0) {
                    setSelectedKB(data[0]);
                }
            } catch (error) {
                console.error('Error fetching knowledge bases:', error);
            }
        };
        fetchKnowledgeBases();
    }, []);

    const onKBChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
        if (option) {
            setSelectedKB(option);
            onSelect(option.key as string);
            try {
                const response = await fetch('/api/set_knowledge_base', {
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
        <Panel
            isOpen={isOpen}
            onDismiss={onDismiss}
            headerText="Selecteer Kennisbank"
            closeButtonAriaLabel="Sluiten"
        >
            <Dropdown
                label="Kies een kennisbank"
                selectedKey={selectedKB ? selectedKB.key : undefined}
                options={knowledgeBases}
                onChange={onKBChange}
            />
        </Panel>
    )
}

export default KnowledgeBaseSelector