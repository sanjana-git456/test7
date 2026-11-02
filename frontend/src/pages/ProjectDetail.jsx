import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import { Play, Save, History, Plus, FileAudio } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [newNote, setNewNote] = useState('');

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => client.get(`/projects/${id}/`).then(res => res.data)
  });

  const addVersionMutation = useMutation({
    mutationFn: (data) => client.post(`/projects/${id}/add_version/`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['project', id]);
      setNewNote('');
    }
  });

  if (isLoading) return <div className="p-8">Loading project...</div>;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="text-slate-500">{project.genre} • {project.privacy_tier} Workspace</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Play size={18} /> Preview
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Save size={18} /> Export
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-8 h-64 flex flex-col justify-center relative overflow-hidden">
            {/* Mock Audio Waveform */}
            <div className="flex items-end gap-1 h-32">
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-indigo-500 rounded-full"
                  style={{ height: `${Math.random() * 100}%` }}
                />
              ))}
            </div>
            <div className="absolute bottom-4 left-8 text-indigo-300 text-sm font-mono">00:42 / 03:15</div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus size={20} /> New Iteration</h3>
            <textarea 
              className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="What changed in this version?"
              rows="3"
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
            />
            <button 
              onClick={() => addVersionMutation.mutate({ notes: newNote, file_url: 'https://mock.audio/file.mp3' })}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold"
            >
              Commit Version
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><History size={20} /> Version History</h3>
            <div className="space-y-4">
              {(project.versions ?? []).map(v => (
                <div key={v.id} className="p-3 border rounded-lg hover:bg-slate-50 transition">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-indigo-600">v{v.version_number}</span>
                    <span className="text-xs text-slate-400">{new Date(v.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{v.notes || 'No notes provided.'}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <FileAudio size={14} /> {v.created_by_name}
                  </div>
                </div>
              ))}
              {(project.versions?.length === 0) && <p className="text-slate-500 text-center py-4">No versions yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;