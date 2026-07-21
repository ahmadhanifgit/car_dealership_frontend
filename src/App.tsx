import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { CarProvider } from '@/contexts/CarContext';
import { UIProvider } from '@/contexts/UIContext';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Loader } from '@/components/common/Feedback';

const HomePage = lazy(() => import('@/pages/public/HomePage').then((m) => ({ default: m.HomePage })));
const InventoryPage = lazy(() => import('@/pages/public/InventoryPage').then((m) => ({ default: m.InventoryPage })));
const CarDetailsPage = lazy(() => import('@/pages/public/CarDetailsPage').then((m) => ({ default: m.CarDetailsPage })));
const ComparePage = lazy(() => import('@/pages/public/ComparePage').then((m) => ({ default: m.ComparePage })));
const AboutPage = lazy(() => import('@/pages/public/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('@/pages/public/ContactPage').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('@/pages/public/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage').then((m) => ({ default: m.ResetPasswordPage })));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const AdminCarsList = lazy(() => import('@/pages/admin/AdminCarsList').then((m) => ({ default: m.AdminCarsList })));
const AdminCarForm = lazy(() => import('@/pages/admin/AdminCarForm').then((m) => ({ default: m.AdminCarForm })));
const AdminProfile = lazy(() => import('@/pages/admin/AdminProfile').then((m) => ({ default: m.AdminProfile })));

function PageLoader() {
  return <div className="flex min-h-[60vh] items-center justify-center"><Loader label="Loading…" /></div>;
}

function AppRoutes() {
  useScrollToTop();
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
        <Route path="inventory" element={<Suspense fallback={<PageLoader />}><InventoryPage /></Suspense>} />
        <Route path="cars/:slug" element={<Suspense fallback={<PageLoader />}><CarDetailsPage /></Suspense>} />
        <Route path="compare" element={<Suspense fallback={<PageLoader />}><ComparePage /></Suspense>} />
        <Route path="about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
      </Route>

      <Route path="login" element={<Suspense fallback={<PageLoader />}><LoginPage /></Suspense>} />
      <Route path="forgot-password" element={<Suspense fallback={<PageLoader />}><ForgotPasswordPage /></Suspense>} />
      <Route path="reset-password" element={<Suspense fallback={<PageLoader />}><ResetPasswordPage /></Suspense>} />

      <Route path="admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
          <Route path="cars" element={<Suspense fallback={<PageLoader />}><AdminCarsList /></Suspense>} />
          <Route path="cars/new" element={<Suspense fallback={<PageLoader />}><AdminCarForm mode="create" /></Suspense>} />
          <Route path="cars/:id" element={<Suspense fallback={<PageLoader />}><AdminCarForm mode="edit" /></Suspense>} />
          <Route path="profile" element={<Suspense fallback={<PageLoader />}><AdminProfile /></Suspense>} />
        </Route>
      </Route>

      <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>} />
    </Routes>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CarProvider>
            <UIProvider>
              <AppRoutes />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  className: '!rounded-xl !bg-ink-950 !text-white !text-sm',
                  success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
                  error: { iconTheme: { primary: '#e23838', secondary: '#fff' } },
                }}
              />
            </UIProvider>
          </CarProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
