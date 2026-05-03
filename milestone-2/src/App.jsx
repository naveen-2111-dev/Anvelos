import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="audience" element={<div className="p-8 text-slate-500">Audience Page Placeholder</div>} />
            <Route path="analytics" element={<div className="p-8 text-slate-500">Analytics Page Placeholder</div>} />
            <Route path="ecommerce" element={<div className="p-8 text-slate-500">E-commerce Page Placeholder</div>} />
            <Route path="preferences" element={<div className="p-8 text-slate-500">Preferences Page Placeholder</div>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
