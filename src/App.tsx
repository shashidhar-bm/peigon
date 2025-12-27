import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { RequestProvider, CollectionProvider, EnvironmentProvider, HistoryProvider } from './contexts';
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

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;

