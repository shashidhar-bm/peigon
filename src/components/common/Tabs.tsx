import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
}

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TabList = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  border-bottom: 1px solid ${theme.colors.border};
  background: ${theme.colors.backgroundLight};
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.fontSizes.md};
  font-weight: 500;
  color: ${props => props.$isActive ? theme.colors.primary : theme.colors.textSecondary};
  background: ${props => props.$isActive ? theme.colors.background : 'transparent'};
  border: none;
  border-bottom: 2px solid ${props => props.$isActive ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.background};
  }
`;

const TabContent = styled.div`
  flex: 1;
  overflow: auto;
  background: ${theme.colors.background};
`;

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveTab, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <TabsContainer>
      <TabList>
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            $isActive={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>
      <TabContent>{activeTabContent}</TabContent>
    </TabsContainer>
  );
};

