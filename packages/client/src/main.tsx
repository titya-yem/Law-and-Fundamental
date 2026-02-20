import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // ✅ import correctly
import { Theme } from '@radix-ui/themes';
import { Toaster } from 'react-hot-toast';
import './index.css';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Case from './pages/Case';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <Toaster position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />

              <Route element={<AuthLayout />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Route>

              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="case/:id" element={<Case />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Theme>
    </QueryClientProvider>
  </StrictMode>
);
