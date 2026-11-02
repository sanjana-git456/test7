import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import { Music, Plus, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', genre: 'Lo-Fi', privacy_tier: 'PUBLIC' });
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => client.get('/projects/').then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: (data) => client.post('/projects/', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      setIsModalOpen(false);
      setNewProject({ title: '', genre: 'Lo-Fi', privacy_tier: 'PUBLIC' });
    }
  });

  if (isLoading) return <div className="p-8">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Audio Projects</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
        >
          <Plus size={20} /> Create Project
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input 
            placeholder="Search projects..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-white">
          <Filter size={20} /> Filter
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(projects ?? []).map(project => (
          <Link 
            to={`/projects/${project.id}`} 
            key={project.id} 
            className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition group"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition">
              <Music size={24} />
            </div>
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p className="text-slate-500 text-sm mb-4">{project.genre} • {project.privacy_tier}</p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-[10px] flex items-center justify-center">
                {project.owner.username[0].toUpperCase()}
              </div>
              <span className="text-xs text-slate-400">Owned by {project.owner.username}</span>
            </div>
          </Link>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">New Project</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Project Title</label>
                <input 
                  className="w-full p-2 border rounded-lg" 
                  value={newProject.title}
                  onChange={e => setNewProject({...newProject, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Genre</label>
                <select 
                  className="w-full p-2 border rounded-lg"
                  value={newProject.genre}
                  onChange={e => setNewProject({...newProject, genre: e.target.value})}
                >
                  <option>Lo-Fi</option>
                  <option>Electronic</option>
                  <option>Podcast</option>
                  <option>Rock</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => createMutation.mutate(newProject)}
                  className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-bold"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;