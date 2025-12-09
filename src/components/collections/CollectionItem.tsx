import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Collection, ApiRequest } from '../../types';
import { METHOD_COLORS } from '../../constants';

interface CollectionItemProps {
  collection: Collection;
  onEdit: () => void;
  onDelete: () => void;
  onRequestClick: (request: ApiRequest) => void;
}

const ItemContainer = styled.div`
  background: ${theme.colors.sidebarHover};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

const CollectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.sm};
  cursor: pointer;
  transition: background ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.sidebarActive};
  }
`;

const CollectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex: 1;
`;

const ExpandIcon = styled.span<{ $isExpanded: boolean }>`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.sidebarText};
  transition: transform ${theme.transitions.fast};
  transform: ${props => props.$isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'};
`;

const CollectionName = styled.span`
  font-size: ${theme.fontSizes.md};
  font-weight: 500;
  color: ${theme.colors.textWhite};
`;

const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  opacity: 0;
  transition: opacity ${theme.transitions.fast};
  
  ${ItemContainer}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  padding: ${theme.spacing.xs};
  background: transparent;
  border: none;
  color: ${theme.colors.sidebarText};
  cursor: pointer;
  font-size: ${theme.fontSizes.sm};
  transition: color ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.textWhite};
  }
`;

const RequestList = styled.div<{ $isExpanded: boolean }>`
  display: ${props => props.$isExpanded ? 'block' : 'none'};
  padding: 0 ${theme.spacing.sm} ${theme.spacing.sm};
`;

const RequestItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  margin-left: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: background ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.sidebarActive};
  }
`;

const MethodBadge = styled.span<{ $method: string }>`
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  color: ${props => METHOD_COLORS[props.$method as keyof typeof METHOD_COLORS] || theme.colors.textMuted};
  min-width: 40px;
`;

const RequestName = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.sidebarText};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CollectionItem: React.FC<CollectionItemProps> = ({
  collection,
  onEdit,
  onDelete,
  onRequestClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <ItemContainer>
      <CollectionHeader onClick={() => setIsExpanded(!isExpanded)}>
        <CollectionTitle>
          <ExpandIcon $isExpanded={isExpanded}>▶</ExpandIcon>
          <CollectionName>{collection.name}</CollectionName>
        </CollectionTitle>
        <Actions>
          <ActionButton 
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            title="Edit"
          >
            ✎
          </ActionButton>
          <ActionButton 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Delete"
          >
            🗑
          </ActionButton>
        </Actions>
      </CollectionHeader>

      <RequestList $isExpanded={isExpanded}>
        {collection.requests.length === 0 ? (
          <RequestItem style={{ marginLeft: theme.spacing.xl }}>
            <RequestName style={{ fontStyle: 'italic' }}>No requests yet</RequestName>
          </RequestItem>
        ) : (
          collection.requests.map(request => (
            <RequestItem 
              key={request.id}
              onClick={() => onRequestClick(request)}
            >
              <MethodBadge $method={request.method}>
                {request.method}
              </MethodBadge>
              <RequestName>{request.name}</RequestName>
            </RequestItem>
          ))
        )}
      </RequestList>
    </ItemContainer>
  );
};

