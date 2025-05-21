import { create } from 'zustand';

export type Event = {
  id: string;
  name: string;
  organizer: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
};

type EventStore = {
  events: Event[];
  addEvent: (event: Event) => void;
  approveEvent: (id: string) => void;
  rejectEvent: (id: string) => void;
};

// Generate 20 mock events
const generateMockEvents = () => {
  const mockEvents: Event[] = [];
  const eventTypes = ['Conference', 'Workshop', 'Seminar', 'Launch', 'Meeting'];
  const organizers = ['Marketing Team', 'Development Team', 'Sales Team', 'HR Department', 'Executive Office'];

  for (let i = 1; i <= 20; i++) {
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const organizer = organizers[Math.floor(Math.random() * organizers.length)];
    
    // Generate a random date in the future (next 60 days)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 60));
    
    mockEvents.push({
      id: `event-${i}`,
      name: `${eventType} ${i}`,
      organizer: organizer,
      date: futureDate,
      status: 'pending',
      submittedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    });
  }
  return mockEvents;
};

export const useEventStore = create<EventStore>((set) => ({
  events: generateMockEvents(),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  approveEvent: (id) => set((state) => ({
    events: state.events.map((event) =>
      event.id === id ? { ...event, status: 'approved' } : event
    ),
  })),
  rejectEvent: (id) => set((state) => ({
    events: state.events.map((event) =>
      event.id === id ? { ...event, status: 'rejected' } : event
    ),
  })),
}));
