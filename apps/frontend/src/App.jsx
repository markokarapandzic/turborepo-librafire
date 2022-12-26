import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppContextProvider } from './context';

import DashboardPage from './screens/Dashboard';
import RegisterPage from './screens/Register';
import StartPage from './screens/Start';
import RemovedFreights from './screens/RemovedFreights';
import Toasts from './components/Toasts';

import './App.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/removed" element={<RemovedFreights />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/" element={<StartPage />} />
            </Routes>
          </div>
          <Toasts />
        </Router>
      </AppContextProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
