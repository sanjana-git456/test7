import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import { Users, Shield, Trophy } from 'lucide-react';

const CircleList = () => {
  const queryClient = useQueryClient();
  const { data: circles, isLoading } = useQuery({
    queryKey: ['circles'],
    queryFn: () => client.get('/circles/').then(res => res.data)
  });

  const joinMutation = useMutation({
    mutationFn: (id) => client.post(`/circles/${id}/join/`),
    onSuccess: () => queryClient.invalidateQueries(['circles'])
  });

  if (isLoading) return <div className="p-8">Loading circles...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Collaborative Circles</h1>
        <p className="text-slate-500">Exclusive communities for audio professionals.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {(circles ?? []).map(circle => (
          <div key={circle.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Shield size={20} />
                <span className="font-bold">{circle.name}</span>
              </div>
              <span className="text-xs bg-indigo-500 px-2 py-1 rounded">{circle.invite_only ? 'Invite Only' : 'Public'}</span>
            </div>
            <div className="p-6">
              <p className="text-slate-600 mb-6">{circle.description}</p>
              
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Onboarding Quests</h4>
                <div className="space-y-2">
                  {(circle.quests ?? []).map(quest => (
                    <div key={quest.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg text-sm">
                      <Trophy size={16} className="text-amber-500" />
                      <span className="flex-1">{quest.title}</span>
                      <span className="text-xs font-bold text-indigo-600">+{quest.xp_reward} XP</span>
                    </div>
                  ))}
                  {(!circle.quests || circle.quests.length === 0) && <p className="text-xs text-slate-400">No active quests.</p>}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <Users size={18} />
                  <span className="text-sm">{circle.members_count} members</span>
                </div>
                <button 
                  onClick={() => joinMutation.mutate(circle.id)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
                >
                  Join Circle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircleList;