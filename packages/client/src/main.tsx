import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // ✅ import correctly
import { Theme } from '@radix-ui/themes';
import { Toaster } from 'react-hot-toast';
import './index.css';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './lib/ProtectedRoute';
import UsersDashboard from './pages/Dashboard/UsersDashboard';
import Profile from './pages/Dashboard/Profile';
import Backup from './pages/Dashboard/Backup';
import axios from 'axios';

const queryClient = new QueryClient();
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <Toaster position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
            </Route>

            <Route path="" element={<AuthLayout />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* accessible by ALL users */}
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />

              {/* ONLY ADMIN */}
              <Route
                path="users"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UsersDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="backup"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Backup />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Theme>
    </QueryClientProvider>
  </StrictMode>
);
