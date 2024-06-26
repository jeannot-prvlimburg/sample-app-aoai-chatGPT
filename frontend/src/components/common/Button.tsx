import { CommandBarButton, DefaultButton, IButtonProps } from '@fluentui/react'

import styles from './Button.module.css'

interface ButtonProps extends IButtonProps {
  onClick: () => void
  text: string | undefined
}

export const ShareButton: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <CommandBarButton
      className={styles.shareButtonRoot}
      iconProps={{ iconName: 'Settings' }}
      onClick={onClick}
      text={text}
    />
  )
}

export const HistoryButton: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <DefaultButton
      className={styles.historyButtonRoot}
      text={text}
      iconProps={{ iconName: 'History' }}
      onClick={onClick}
    />
  )
}

export const KnowledgeBaseButton: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <CommandBarButton
      className={styles.knowledgeBaseRoot}
      iconProps={{ iconName: 'KnowledgeBase' }}
      onClick={onClick}
      text={text}
    />
  )
}
