import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mic2 } from 'lucide-react';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.username, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(Object.values(err.response?.data || {}).flat()[0] || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Mic2 size={40} className="text-indigo-600 mb-2" />
          <h2 className="text-3xl font-bold text-slate-900">Join SyncSound</h2>
          <p className="text-slate-500">Start your co-creation journey</p>
        </div>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={form.username}
              onChange={(e) => setForm({...form, username: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              required
            />
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
            Create Account
          </button>
        </form>
        <p className="mt-6 text-center text-slate-600">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;