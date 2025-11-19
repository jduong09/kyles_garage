import { AdminHeader } from './adminHeader';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const reservations = [
  {
    name: 'Kent Atwood',
    catalog_id: 3, // this will be more relevant when we have database data
    catalog_name: 'Impact Driver',
    reserve_start: '2025-09-10 12:00:00.0000+00',
    reserve_end : '2025-09-17 21:00:00.0000+00',
    payment_id: 123, // this will be more relevant when we have database data
  },
  {
    name: 'Alice Johnson',
    catalog_id: 1,
    catalog_name: 'Cordless Drill',
    reserve_start: '2025-09-01 12:00:00.0000+00',
    reserve_end: '2025-09-01 15:00:00.0000+00',
    payment_id: 401,
  },
  {
    name: 'Brian Lee',
    catalog_id: 2,
    catalog_name: 'Hammer Drill',
    reserve_start: '2025-09-02 13:00:00.0000+00',
    reserve_end: '2025-09-02 17:00:00.0000+00',
    payment_id: 402,
  },
  {
    name: 'Carla Mendes',
    catalog_id: 4,
    catalog_name: 'Table Saw',
    reserve_start: '2025-09-03 14:00:00.0000+00',
    reserve_end: '2025-09-03 18:00:00.0000+00',
    payment_id: 403,
  },
  {
    name: 'David Kim',
    catalog_id: 5,
    catalog_name: 'Circular Saw',
    reserve_start: '2025-09-11 15:00:00.0000+00',
    reserve_end: '2025-09-14 20:30:00.0000+00',
    payment_id: 404,
  },
  {
    name: 'Emma Rodriguez',
    catalog_id: 6,
    catalog_name: 'Power Sander',
    reserve_start: '2025-09-05 12:30:00.0000+00',
    reserve_end: '2025-09-05 16:00:00.0000+00',
    payment_id: 405,
  },
  {
    name: 'Frank Chen',
    catalog_id: 7,
    catalog_name: 'Paint Sprayer',
    reserve_start: '2025-09-06 16:00:00.0000+00',
    reserve_end: '2025-09-06 20:00:00.0000+00',
    payment_id: 406,
  },
  {
    name: 'Grace Patel',
    catalog_id: 8,
    catalog_name: 'Jigsaw',
    reserve_start: '2025-09-07 12:45:00.0000+00',
    reserve_end: '2025-09-07 14:45:00.0000+00',
    payment_id: 407,
  },
  {
    name: 'Henry Thompson',
    catalog_id: 9,
    catalog_name: 'Lawn Mower',
    reserve_start: '2025-09-08 13:30:00.0000+00',
    reserve_end: '2025-09-08 17:00:00.0000+00',
    payment_id: 408,
  },
  {
    name: 'Ivy Nakamura',
    catalog_id: 10,
    catalog_name: 'Pressure Washer',
    reserve_start: '2025-09-09 14:00:00.0000+00',
    reserve_end: '2025-09-09 17:00:00.0000+00',
    payment_id: 409,
  },
  {
    name: 'Jack Wilson',
    catalog_id: 11,
    catalog_name: 'Chainsaw',
    reserve_start: '2025-09-10 12:15:00.0000+00',
    reserve_end: '2025-09-11 16:15:00.0000+00',
    payment_id: 410,
  },
  {
    name: 'Karen Smith',
    catalog_id: 12,
    catalog_name: 'Tile Cutter',
    reserve_start: '2025-09-11 13:00:00.0000+00',
    reserve_end: '2025-09-11 15:30:00.0000+00',
    payment_id: 411,
  },
  {
    name: 'Leo Martinez',
    catalog_id: 13,
    catalog_name: 'Air Compressor',
    reserve_start: '2025-09-11 15:00:00.0000+00',
    reserve_end: '2025-09-12 17:00:00.0000+00',
    payment_id: 412,
  },
  {
    name: 'Maya Patel',
    catalog_id: 14,
    catalog_name: 'Nail Gun',
    reserve_start: '2025-09-13 12:30:00.0000+00',
    reserve_end: '2025-09-13 14:30:00.0000+00',
    payment_id: 413,
  },
  {
    name: 'Noah Green',
    catalog_id: 15,
    catalog_name: 'Paint Roller Set',
    reserve_start: '2025-09-11 14:30:00.0000+00',
    reserve_end: '2025-09-14 16:30:00.0000+00',
    payment_id: 414,
  },
  {
    name: 'Olivia Brown',
    catalog_id: 16,
    catalog_name: 'Ladder',
    reserve_start: '2025-09-15 12:00:00.0000+00',
    reserve_end: '2025-09-11 17:00:00.0000+00',
    payment_id: 415,
  },
];

const humanReadableTS = (ts) => {
  const date = new Date(ts);
  const dateStr = date.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  });
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/New_York',
    hour12: true
  });
  const formatted = `${dateStr} ${timeStr}`;
  return formatted;
};

const Reservations = () => (
  <div>
    <AdminHeader />
    <h2 className="pl-4 text-xl font-bold">Ongoing Reservations</h2>
    <div className="pl-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {reservations.map(({name, catalog_name, reserve_start, reserve_end, payment_id}, idx) => (
        <div key={`${idx}-${payment_id}`} className="flex flex-col justify-start items-start m-2 p-3 bg-gray-400/20 rounded-lg">
          <h4 className="font-bold text-lg mb-2">{name}</h4>
          <p className="mb-2">
            <span>Reserved</span>
            <span className="text-orange-300 font-bold"> {catalog_name}</span>
            <span> from</span> 
            <span className="text-indigo-300"> {humanReadableTS(reserve_start)}</span>
            <span> to</span> 
            <span className="text-indigo-300"> {humanReadableTS(reserve_end)}</span>
          </p>
          <p className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:inset-ring-green-500/20">Paid</p>
          {/* Perhaps we could add a link to the receipt here */}
        </div>
      ))}
    </div>
  </div>
);

export default withAuthenticationRequired(Reservations, {
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});