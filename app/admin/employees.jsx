import { AdminHeader } from "../admin-header";

const employees = [
  {
    first_name: 'Jessica',
    last_name: 'Monihan',
    hours_worked: 8,
  },
  {
    first_name: 'Carson',
    last_name: 'Landry',
    hours_worked: 7,
  },
  {
    first_name: 'Sophia',
    last_name: 'Katsaros',
    hours_worked: 6,
  },
  {
    first_name: 'Marcus',
    last_name: 'Lee',
    hours_worked: 9,
  },
  {
    first_name: 'Elena',
    last_name: 'Papadopoulos',
    hours_worked: 5,
  },
  {
    first_name: 'Liam',
    last_name: 'Anderson',
    hours_worked: 10,
  },
  {
    first_name: 'Maya',
    last_name: 'Kobayashi',
    hours_worked: 4,
  },
  {
    first_name: 'Oliver',
    last_name: 'Stone',
    hours_worked: 7,
  },
  {
    first_name: 'Ava',
    last_name: 'Petrou',
    hours_worked: 8,
  },
  {
    first_name: 'Ethan',
    last_name: 'Carter',
    hours_worked: 6,
  },
];

const Employees = () => (
  <div>
    <AdminHeader />
    <h2 className="pl-4 text-xl font-bold">Employees</h2>
    <div className="pl-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {employees.map(({first_name, last_name, hours_worked}) => (
        <div className="flex flex-col justify-start items-start m-2 p-3 bg-gray-400/20 rounded-lg">
        <h4 className="font-bold text-lg mb-2">{first_name}{last_name ? ` ${last_name}` : ''}</h4>
        <p className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:inset-ring-green-500/20">Hours Worked: {hours_worked}</p>
      </div>
      ))}
    </div>
  </div>
);

export default Employees;