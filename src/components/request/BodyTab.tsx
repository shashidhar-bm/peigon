import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useRequestContext } from '../../contexts';
import { BodyType } from '../../types';
import { Textarea, Select, KeyValuePairList } from '../common';

const TabContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  overflow: auto;
`;

const BodyTypeSelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const BodyTab: React.FC = () => {
  const { currentRequest, updateRequest } = useRequestContext();
  const theme = useTheme();

  const bodyTypeOptions = [
    { value: 'none', label: 'None' },
    { value: 'json', label: 'JSON' },
    { value: 'raw', label: 'Raw Text' },
    { value: 'urlencoded', label: 'x-www-form-urlencoded' },
    { value: 'formData', label: 'form-data' },
  ];

  const handleBodyTypeChange = (type: BodyType) => {
    updateRequest({
      body: { ...currentRequest.body, type },
    });
  };

  const handleRawBodyChange = (value: string) => {
    updateRequest({
      body: { ...currentRequest.body, raw: value },
    });
  };

  const handleJsonBodyChange = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      updateRequest({
        body: { ...currentRequest.body, json: parsed, raw: value },
      });
    } catch {
      // Invalid JSON, just update raw
      updateRequest({
        body: { ...currentRequest.body, raw: value },
      });
    }
  };

  const renderBodyEditor = () => {
    switch (currentRequest.body.type) {
      case 'none':
        return (
          <div style={{ color: theme.colors.textMuted, textAlign: 'center', padding: theme.spacing.xl }}>
            This request does not have a body
          </div>
        );

      case 'json':
        return (
          <Textarea
            value={currentRequest.body.raw || ''}
            onChange={(e) => handleJsonBodyChange(e.target.value)}
            placeholder='{\n  "key": "value"\n}'
            fullWidth
            style={{ flex: 1, minHeight: '200px' }}
          />
        );

      case 'raw':
        return (
          <Textarea
            value={currentRequest.body.raw || ''}
            onChange={(e) => handleRawBodyChange(e.target.value)}
            placeholder="Enter raw body content"
            fullWidth
            style={{ flex: 1, minHeight: '200px' }}
          />
        );

      case 'urlencoded':
        return (
          <KeyValuePairList
            pairs={currentRequest.body.urlencoded || []}
            onChange={(pairs) =>
              updateRequest({
                body: { ...currentRequest.body, urlencoded: pairs },
              })
            }
            keyPlaceholder="Key"
            valuePlaceholder="Value"
          />
        );

      case 'formData':
        return (
          <KeyValuePairList
            pairs={currentRequest.body.formData || []}
            onChange={(pairs) =>
              updateRequest({
                body: { ...currentRequest.body, formData: pairs },
              })
            }
            keyPlaceholder="Key"
            valuePlaceholder="Value"
          />
        );

      default:
        return (
          <div style={{ color: theme.colors.textMuted, textAlign: 'center', padding: theme.spacing.xl }}>
            Body type not yet implemented
          </div>
        );
    }
  };

  return (
    <TabContainer>
      <BodyTypeSelector>
        <Select
          data-testid="body-type-selector"
          value={currentRequest.body.type}
          onChange={(e) => handleBodyTypeChange(e.target.value as BodyType)}
          options={bodyTypeOptions}
        />
      </BodyTypeSelector>
      <EditorContainer>
        {renderBodyEditor()}
      </EditorContainer>
    </TabContainer>
  );
};

