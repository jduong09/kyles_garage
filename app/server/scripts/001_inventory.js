import { execSync } from 'child_process';

export const inventoryScript = () => {
  execSync('psql -X -d kyles_garage -f app/server/scripts/maindb.sql', { encoding: 'utf-8' });
}