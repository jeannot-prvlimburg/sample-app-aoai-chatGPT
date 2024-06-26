import { useContext, useState } from 'react'
import React from 'react'
import {
  CommandBarButton,
  ICommandBarStyles,
  IStackStyles,
  Stack,
  StackItem,
  Text
} from '@fluentui/react'

import { AppStateContext } from '../../state/AppProvider'

import KnowledgeBaseList from './KnowledgeBaseList'

import styles from './KnowledgeBasePanel.module.css'

interface KnowledgeBasePanelProps {}

const commandBarStyle: ICommandBarStyles = {
  root: {
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
}

const commandBarButtonStyle: Partial<IStackStyles> = { root: { height: '50px' } }

export function KnowledgeBasePanel(_props: KnowledgeBasePanelProps) {
  const appStateContext = useContext(AppStateContext)

  const handleCloseClick = () => {
    appStateContext?.dispatch({ type: 'TOGGLE_KNOWLEDGE_BASE' })
  }

  return (
    <section className={styles.container} data-is-scrollable aria-label={'knowledge base panel'}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center" wrap aria-label="knowledge base header">
        <StackItem>
          <Text
            role="heading"
            aria-level={2}
            style={{
              alignSelf: 'center',
              fontWeight: '600',
              fontSize: '18px',
              marginRight: 'auto',
              paddingLeft: '20px'
            }}>
            Kennisbanken
          </Text>
        </StackItem>
        <Stack verticalAlign="start">
          <Stack horizontal styles={commandBarButtonStyle}>
            <CommandBarButton
              iconProps={{ iconName: 'Cancel' }}
              title={'Sluiten'}
              onClick={handleCloseClick}
              aria-label={'sluit knop'}
              styles={commandBarStyle}
              role="button"
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        aria-label="knowledge base panel content"
        styles={{
          root: {
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            paddingTop: '2.5px',
            maxWidth: '100%'
          }
        }}
        style={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          flexWrap: 'wrap',
          padding: '1px'
        }}>
        <Stack className={styles.knowledgeBaseListContainer}>
          <KnowledgeBaseList />
        </Stack>
      </Stack>
    </section>
  )
}
