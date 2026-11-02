# SyncSound

A social-productivity platform for musicians and podcasters.

## Tech Stack
- **Backend**: Django, Django REST Framework, PostgreSQL
- **Frontend**: React (Vite), Tailwind CSS, TanStack Query

## Getting Started

### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. `python manage.py migrate`
4. `python manage.py runserver`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev` -- Make sure to set `VITE_API_URL=http://localhost:8000/api` in your .env

## Features
- Live audio workspace simulation
- Version history for tracks
- Invite-only circles with gamified quests
- Privacy tiers (Public, Private, Anonymous)