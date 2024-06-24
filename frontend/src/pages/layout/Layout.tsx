import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Dialog, Stack, Dropdown, IDropdownOption, Slider } from '@fluentui/react'
import { CosmosDBStatus } from '../../api'
import Contoso from '../../assets/Contoso.svg'
import { HistoryButton, ShareButton } from '../../components/common/Button'
import { AppStateContext } from '../../state/AppProvider'
import styles from './Layout.module.css'

const Layout = () => {
  const [isSharePanelOpen, setIsSharePanelOpen] = useState<boolean>(false)
  const [shareLabel, setShareLabel] = useState<string | undefined>('Share')
  const [hideHistoryLabel, setHideHistoryLabel] = useState<string>('Hide chat history')
  const [showHistoryLabel, setShowHistoryLabel] = useState<string>('Show chat history')
  const appStateContext = useContext(AppStateContext)
  const ui = appStateContext?.state.frontendSettings?.ui

  const [selectedModel, setSelectedModel] = useState<string>('gpt-3.5-turbo')
  const [temperature, setTemperature] = useState<number>(0.5)

  const modelOptions: IDropdownOption[] = [
    { key: 'gpt-35-turbo', text: 'GPT-3.5' },
    { key: 'gpt-4', text: 'GPT-4' },
    { key: 'gpt-4o', text: 'GPT-4o' },
  ]

  const handleModelChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (!option) {
        console.error('No option selected');
        return;
    }

    setSelectedModel(option.key as string);

    try {
        const response = await fetch('/api/set_model', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: option.key }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Model updated successfully:', data);

    } catch (error) {
        console.error('Error updating model:', error);
        // Handle the error (e.g., show an error message to the user)
    }
}

  const handleTemperatureChange = (value: number) => {
    setTemperature(value)
    }
    try {
        const response = await fetch('/api/set_temperature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ temperature: value }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Temperature updated successfully:', data);

    } catch (error) {
        console.error('Error updating temperature:', error);
        // Handle the error (e.g., show an error message to the user)
    }
}

  const handleShareClick = () => {
    setIsSharePanelOpen(true)
  }

  const handleSharePanelDismiss = () => {
    setIsSharePanelOpen(false)
  }

  const handleHistoryClick = () => {
    appStateContext?.dispatch({ type: 'TOGGLE_CHAT_HISTORY' })
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setShareLabel(undefined)
        setHideHistoryLabel('Hide history')
        setShowHistoryLabel('Show history')
      } else {
        setShareLabel('Instellingen')
        setHideHistoryLabel('Verberg Geschiedenis')
        setShowHistoryLabel('Toon Geschiedenis')
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
