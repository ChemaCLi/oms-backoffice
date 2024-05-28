import { APIFetcher } from "../../../shared/frontend/helpers/fetcher"
import { config } from "../../../shared/constants/config";

const fetcher = APIFetcher({
  baseUrl: config.LOGS_API_URL,
  headers: {
    'Content-Type': 'application/json',
    token: 'token',
  },
});

export const getLogs = async ({
  microServiceName = [],
  customerReference = [],
  orderReference = [],
  correlationId = [],
  level = [],
}) => {
  const valOrUndefined = (val) => val.length ? val : undefined;

  const criteriaMap = {
    level: valOrUndefined(level),
    microServiceName: valOrUndefined(microServiceName),
    customer_reference: valOrUndefined(customerReference),
    order_reference: valOrUndefined(orderReference),
    correlationId: valOrUndefined(correlationId),
  }
  const results = await fetcher.post(`/get-logs`, criteriaMap);

  return results.data || [];
}
