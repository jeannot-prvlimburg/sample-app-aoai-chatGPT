import React, { useContext } from 'react'
import { Stack, Text } from '@fluentui/react'
import { AppStateContext } from '../../state/AppProvider'
import styles from './KnowledgeBasePanel.module.css'

const knowledgeBases = [
  { id: 'stikstof', name: 'Stikstof' },
  { id: 'griffie', name: 'Griffie' },
  { id: 'wonen', name: 'Wonen' },
  { id: 'economie', name: 'Economie' },
  { id: 'geschiedenis', name: 'Geschiedenis' },
  { id: 'onderwijs', name: 'Onderwijs' },
  { id: 'zorg', name: 'Zorg' },
  { id: 'milieu', name: 'Milieu' },
  { id: 'verkeer', name: 'Verkeer' },
  { id: 'cultuur', name: 'Cultuur' },
  { id: 'sport', name: 'Sport' },
  { id: 'veiligheid', name: 'Veiligheid' },
  { id: 'financien', name: 'Financiën' },
  { id: 'toerisme', name: 'Toerisme' },
  { id: 'energie', name: 'Energie' }
]

const KnowledgeBaseList: React.FC = () => {
  const appStateContext = useContext(AppStateContext)

  const handleSelectKnowledgeBase = (id: string) => {
    appStateContext?.dispatch({ type: 'SELECT_KNOWLEDGE_BASE', payload: id })
  }

  return (
    <div className={styles.listContainer}>
      {knowledgeBases.map((kb) => (
        <Stack
          key={kb.id}
          className={styles.itemCell}
          onClick={() => handleSelectKnowledgeBase(kb.id)}
          verticalAlign="center"
          styles={{
            root: {
              backgroundColor: appStateContext?.state.selectedKnowledgeBase === kb.id ? '#e6e6e6' : 'transparent'
            }
          }}
        >
          <Text className={styles.knowledgeBaseTitle}>{kb.name}</Text>
        </Stack>
      ))}
    </div>
  )
}

export default KnowledgeBaseList
