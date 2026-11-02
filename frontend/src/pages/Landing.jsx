import React from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Share2, ShieldCheck, Users } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-2xl">
          <Mic2 /> SyncSound
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-slate-600 hover:text-indigo-600">Log in</Link>
          <Link to="/register" className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition">Get Started</Link>
        </div>
      </nav>

      <header className="py-24 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6">
          Co-create audio without <span className="text-indigo-600">the clutter.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          SyncSound is the social-productivity platform for musicians and podcasters to edit together, share sessions, and grow in invite-only circles.
        </p>
        <Link to="/register" className="bg-indigo-600 text-white text-lg px-10 py-4 rounded-full font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition">
          Start Collaborating
        </Link>
      </header>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<Share2 className="text-indigo-600" />}
            title="Live Workspace"
            description="Integrated audio editing with version history. Never lose a take again."
          />
          <FeatureCard
            icon={<Users className="text-indigo-600" />}
            title="Private Circles"
            description="Invite-only communities with gamified onboarding and shared goals."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-indigo-600" />}
            title="Privacy Tiers"
            description="From public profiles to fully anonymous sessions. You control the access."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

export default Landing;