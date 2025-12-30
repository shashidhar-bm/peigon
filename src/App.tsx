import styled from 'styled-components';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { RequestProvider, CollectionProvider, EnvironmentProvider, HistoryProvider, ThemeProvider, useThemeContext } from './contexts';
import { ComparisonProvider } from './contexts/ComparisonContext';
import { Header, Sidebar, MainPanel } from './components/layout';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const AppContent: React.FC = () => {
  const { mode } = useThemeContext();
  const theme = createTheme(mode);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <EnvironmentProvider>
        <CollectionProvider>
          <RequestProvider>
            <ComparisonProvider>
              <HistoryProvider>
                <AppContainer>
                  <Header />
                  <MainContent>
                    <Sidebar />
                    <MainPanel />
                  </MainContent>
                </AppContainer>
              </HistoryProvider>
            </ComparisonProvider>
          </RequestProvider>
        </CollectionProvider>
      </EnvironmentProvider>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;


