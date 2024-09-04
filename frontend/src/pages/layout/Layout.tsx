import { useState, useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Stack, TextField, Dialog, CommandBarButton } from '@fluentui/react'
import { CopyRegular } from '@fluentui/react-icons'

import { CosmosDBStatus } from '../../api'
import Contoso from '../../assets/Contoso.svg'
import { HistoryButton, ShareButton } from '../../components/common/Button'
import { AppStateContext } from '../../state/AppProvider'
import KnowledgeBaseSelector from '../../components/KnowledgeBaseSelector/KnowledgeBaseSelector'

import styles from './Layout.module.css'

const Layout = () => {
  const [isSharePanelOpen, setIsSharePanelOpen] = useState<boolean>(false)
  const [copyClicked, setCopyClicked] = useState<boolean>(false)
  const [copyText, setCopyText] = useState<string>('Copy URL')
  const [shareLabel, setShareLabel] = useState<string | undefined>('Share')
  const [hideHistoryLabel, setHideHistoryLabel] = useState<string>('Hide chat history')
  const [showHistoryLabel, setShowHistoryLabel] = useState<string>('Show chat history')
  const [logo, setLogo] = useState('')
  const appStateContext = useContext(AppStateContext)
  const ui = appStateContext?.state.frontendSettings?.ui

  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<string>("none");
  const [isKnowledgeBaseSelectorOpen, setIsKnowledgeBaseSelectorOpen] = useState(false);

  const handleKnowledgeBaseSelect = (kb: string) => {
    setSelectedKnowledgeBase(kb);
    // You might want to add additional logic here, such as updating the app state or making an API call
    console.log('Selected knowledge base:', kb);
  };

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

  useEffect(() => {
    if (!appStateContext?.state.isLoading) {
      setLogo(ui?.logo || Contoso)
    }
  }, [appStateContext?.state.isLoading])

  useEffect(() => {
    if (copyClicked) {
      setCopyText('Copied URL')
    }
  }, [copyClicked])

  useEffect(() => { }, [appStateContext?.state.isCosmosDBAvailable.status])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setShareLabel(undefined)
        setHideHistoryLabel('Hide history')
        setShowHistoryLabel('Show history')
      } else {
        setShareLabel('Share')
        setHideHistoryLabel('Hide chat history')
        setShowHistoryLabel('Show chat history')
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={styles.layout}>
      <header className={styles.header} role={'banner'}>
        <Stack horizontal verticalAlign="center">
          <img
            src={logo}
            className={styles.headerIcon}
            alt="Contoso Logo"
          />
          <Stack.Item className={styles.headerTitleContainer}>
            <h1 className={styles.headerTitle}>{ui?.title ?? 'Contoso'}</h1>
          </Stack.Item>
          <Stack horizontal tokens={{ childrenGap: 4 }} className={styles.shareButtonContainer}>
            {appStateContext?.state.isCosmosDBAvailable?.status !== CosmosDBStatus.NotConfigured && ui?.show_chat_history_button !== false && (
              <HistoryButton
                onClick={handleHistoryClick}
                text={appStateContext?.state?.isChatHistoryOpen ? hideHistoryLabel : showHistoryLabel}
              />
            )}
            <CommandBarButton
              iconProps={{ iconName: 'Database' }}
              text="Selecteer Kennisbank"
              onClick={() => setIsKnowledgeBaseSelectorOpen(true)}
            />
            {ui?.show_share_button && <ShareButton onClick={handleShareClick} text={shareLabel} />}
          </Stack>
        </Stack>
      </header>
      <KnowledgeBaseSelector
        isOpen={isKnowledgeBaseSelectorOpen}
        onDismiss={() => setIsKnowledgeBaseSelectorOpen(false)}
        onSelect={handleKnowledgeBaseSelect}
      />
      <div className={styles.headerBottomBorder} />
      <Outlet />
      <Dialog
        hidden={!isSharePanelOpen}
        onDismiss={handleSharePanelDismiss}
        dialogContentProps={{
          title: 'Share the web app',
          subText: 'Send this link to grant access to this web app'
        }}
        modalProps={{
          isBlocking: false,
          styles: { main: { maxWidth: 450 } }
        }}
      >
        <Stack horizontal verticalAlign="center" style={{ gap: '8px' }}>
          <TextField className={styles.urlTextBox} defaultValue={window.location.href} readOnly />
          <div
            className={styles.copyButtonContainer}
            role="button"
            tabIndex={0}
            aria-label="Copy"
            onClick={handleCopyClick}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ' ? handleCopyClick() : null)}>
            <CopyRegular className={styles.copyButton} />
            <span className={styles.copyButtonText}>{copyText}</span>
          </div>
        </Stack>
      </Dialog>
    </div>
  );
};

export default Layout;