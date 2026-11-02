import React from 'react';
import { useQuery } from '@tanstack/react-query';
import client from '../api/client';
import { Music, Users, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { data: projects } = useQuery({ 
    queryKey: ['projects'], 
    queryFn: () => client.get('/projects/').then(res => res.data) 
  });
  const { data: circles } = useQuery({ 
    queryKey: ['circles'], 
    queryFn: () => client.get('/circles/').then(res => res.data) 
  });

  const stats = [
    { name: 'Active Projects', value: projects?.length || 0, icon: Music, color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Your Circles', value: circles?.length || 0, icon: Users, color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Recent Versions', value: projects?.reduce((acc, p) => acc + (p.versions?.length || 0), 0) || 0, icon: Clock, color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Workspace</h1>
          <p className="text-slate-500">Welcome back to your audio lab.</p>
        </div>
        <Link to="/projects" className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition">
          <Plus size={20} /> New Project
        </Link>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">{stat.name}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
          <div className="space-y-4">
            {(projects ?? []).slice(0, 3).map(project => (
              <Link to={`/projects/${project.id}`} key={project.id} className="block p-4 border rounded-lg hover:border-indigo-300 transition">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{project.title}</span>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{project.genre}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{project.versions?.length || 0} versions • {project.privacy_tier}</p>
              </Link>
            ))}
            {(!projects || projects.length === 0) && <p className="text-slate-500 text-center py-4">No projects yet. Start one!</p>}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-4">Community Circles</h2>
          <div className="space-y-4">
            {(circles ?? []).slice(0, 3).map(circle => (
              <div key={circle.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{circle.name}</p>
                  <p className="text-sm text-slate-500">{circle.members_count} members</p>
                </div>
                <Link to="/circles" className="text-indigo-600 text-sm font-bold">View</Link>
              </div>
            ))}
            {(!circles || circles.length === 0) && <p className="text-slate-500 text-center py-4">Join a circle to collaborate.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;