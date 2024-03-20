import { config } from "../../constants/config";
import { APIFetcher } from "./fetcher"

const fetcher = APIFetcher({
  baseUrl: config.LOGS_API_URL,
  headers: {
    'Content-Type': 'application/json',
    token: 'token',
  },
});

export const LogsRepository = {
  getLogs: async () => {
    return fetcher.get('logs');
  },
  getLog: async (id) => {
    return fetcher.get(`logs/${id}`);
  },
  createLog: async (log) => {
    return fetcher.post('logs', log);
  },
  updateLog: async (log) => {
    return fetcher.put(`logs/${log.id}`, log);
  },
  deleteLog: async (id) => {
    return fetcher.delete(`logs/${id}`);
  },
  patchLog: async (id, log) => {
    return fetcher.patch(`logs/${id}`, log);
  },
}
