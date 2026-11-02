import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import CircleList from './pages/CircleList';
import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Layout><ProjectList /></Layout></ProtectedRoute>} />
      <Route path="/projects/:id" element={<ProtectedRoute><Layout><ProjectDetail /></Layout></ProtectedRoute>} />
      <Route path="/circles" element={<ProtectedRoute><Layout><CircleList /></Layout></ProtectedRoute>} />
    </Routes>
  );
}

export default App;