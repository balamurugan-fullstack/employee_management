import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </AuthProvider>
  );
}

export default App;
