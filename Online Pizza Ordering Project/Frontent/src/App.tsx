import 'react-toastify/dist/ReactToastify.css';
import "./Global.css"
import AppRoutes from './AppRoutes';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { QueryClientProvider,QueryClient  } from '@tanstack/react-query';
import { io } from 'socket.io-client';
const App = () => {
  const socket = io(import.meta.env.VITE_BACKEND_BASE_URL);
  const  queryClient=new QueryClient();
  return (
   <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <ToastContainer style={{zIndex:"10000"}}/>
      <AppRoutes socket={socket}/>
    </QueryClientProvider>
   </Provider>
  )
}

export default App