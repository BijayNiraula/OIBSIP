import 'react-toastify/dist/ReactToastify.css';
import "./Global.css"
import AppRoutes from './AppRoutes';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import SocketProvider from './Contexts/SocketProvider';
const App = () => {
  const queryClient = new QueryClient();
  return (
    <SocketProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer style={{ zIndex: "10000" }} />
          <AppRoutes />
        </QueryClientProvider>
      </Provider>
    </SocketProvider>
  )
}

export default App