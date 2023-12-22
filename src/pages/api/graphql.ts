import { server } from '@/server/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';




export default startServerAndCreateNextHandler(server);
