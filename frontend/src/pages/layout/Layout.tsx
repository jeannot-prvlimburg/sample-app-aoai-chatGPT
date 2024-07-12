import { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Dialog, Stack, TextField, Dropdown, IDropdownOption, Slider} from '@fluentui/react'
import { CopyRegular } from '@fluentui/react-icons'

import { CosmosDBStatus } from '../../api'
import Contoso from '../../assets/Contoso.svg'
import { HistoryButton, ShareButton } from '../../components/common/Button'
import { AppStateContext } from '../../state/AppProvider'

import styles from './Layout.module.css'

const Layout = () => {
  const [isSharePanelOpen, setIsSharePanelOpen] = useState<boolean>(false)
  const [copyClicked, setCopyClicked] = useState<boolean>(false)
  const [copyText, setCopyText] = useState<string>('Copy URL')
  const [shareLabel, setShareLabel] = useState<string | undefined>('Share')
  const [hideHistoryLabel, setHideHistoryLabel] = useState<string>('Hide chat history')
  const [showHistoryLabel, setShowHistoryLabel] = useState<string>('Show chat history')
  const appStateContext = useContext(AppStateContext)
  const ui = appStateContext?.state.frontendSettings?.ui

  const [currentModel, setCurrentModel] = useState<string>('gpt-35-turbo')
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<string>('none')
  const [temperature, setTemperature] = useState<number>(0.5)

  const modelOptions: IDropdownOption[] = [
    { key: 'gpt-35-turbo', text: 'GPT-3.5'},
    { key: 'gpt-4', text: 'GPT-4'},
    { key: 'gpt-4o', text: 'GPT-4o'},
  ]

  const knowledgeBaseOptions: IDropdownOption[] = [
    { key: 'none', text: 'Geen' },
    { key: 'stikstof-24042024', text: 'Stikstof' },
    { key: 'griffie-06062024', text: 'Griffie' },
  ]
  const handleShareClick = () => {
    setIsSharePanelOpen(true)
  }

  const handleSharePanelDismiss = () => {
    setIsSharePanelOpen(false)
    setCopyClicked(false)
    setCopyText('Copy URL')
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopyClicked(true)
  }

  const handleHistoryClick = () => {
    appStateContext?.dispatch({ type: 'TOGGLE_CHAT_HISTORY' })
  }

  const handleModelChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (!option) {
        console.error('No option selected')
        return
    }

    setCurrentModel(option.key as string)

    try {
        const response = await fetch('/api/set_model', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: option.key }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Model updated successfully:', data)

    } catch (error) {
        console.error('Error updating model:', error)
        // Handle the error (e.g., show an error message to the user)
    }
  }

  const handleKnowledgeBaseChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (!option) {
      console.error('No option selected')
      return
    }

    setSelectedKnowledgeBase(option.key as string)

    try {
      const response = await fetch('/api/set_knowledge_base', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ knowledgeBase: option.key }),
      })

      if (!response.ok) {
        console.log('Error changing knowledge base:', response)
      }

      const data = await response.json()
      console.log('Knowledge base updated successfully:', data)

    } catch (error) {
      console.error('Error updating knowledge base:', error)
      // Handle the error (e.g., show an error message to the user)
    }
  }

  const handleTemperatureChange = async (value: number) => {
    setTemperature(value)
    
    try {
        const response = await fetch('/api/set_temperature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ temperature: value }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response}`) 
        }

        const data = await response.json()
        console.log('Temperature updated successfully:', data)

    } catch (error) {
        console.error('Error updating temperature:', error)
        // Handle the error (e.g., show an error message to the user)
    }
  }

  useEffect(() => {
    if (copyClicked) {
      setCopyText('Copied URL')
    }
  }, [copyClicked])

  useEffect(() => {}, [appStateContext?.state.isCosmosDBAvailable.status])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setShareLabel(undefined)
        setHideHistoryLabel('Verberg')
        setShowHistoryLabel('Geschiedenis')
      } else {
        setShareLabel('Instellingen.')
        setHideHistoryLabel('Verberg')
        setShowHistoryLabel('Geschiedenis123')
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={styles.layout}>
      <header className={styles.header} role={'banner'}>
        <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
          <Stack horizontal verticalAlign="center">
            <img src={ui?.logo ? ui.logo : Contoso} className={styles.headerIcon} aria-hidden="true" alt="" />
            <Link to="/" className={styles.headerTitleContainer}>
              <h1 className={styles.headerTitle}>{ui?.title}</h1>
            </Link>
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 4 }} className={styles.shareButtonContainer}>
            {appStateContext?.state.isCosmosDBAvailable?.status !== CosmosDBStatus.NotConfigured && (
              <HistoryButton
                onClick={handleHistoryClick}
                text={appStateContext?.state?.isChatHistoryOpen ? hideHistoryLabel : showHistoryLabel}
              />
            )}
            {ui?.show_share_button && <ShareButton onClick={handleShareClick} text={shareLabel} />}
          </Stack>
        </Stack>
      </header>
      <Outlet />
      <Dialog
        onDismiss={handleSharePanelDismiss}
        hidden={!isSharePanelOpen}
        dialogContentProps={{
          title: 'Instellingen',
          showCloseButton: true
        }}
      >
        <Stack tokens={{ childrenGap: 16 }}>
          <Dropdown
            placeholder="Maak een keuze"
            label="Taalmodel"
            options={modelOptions}
            selectedKey={selectedModel}
            onChange={handleModelChange}
          />
          <Dropdown
            placeholder="Maak een keuze"
            label="Kennisbank"
            options={knowledgeBaseOptions}
            selectedKey={selectedKnowledgeBase}
            onChange={handleKnowledgeBaseChange}
          />
          <Slider
            label="Temperatuur"
            min={0}
            max={1}
            step={0.1}
            value={temperature}
            onChange={handleTemperatureChange}
            showValue
            valueFormat={value => value.toFixed(1)}
          />
        </Stack>
      </Dialog>
    </div>
  )
}

export default Layout
