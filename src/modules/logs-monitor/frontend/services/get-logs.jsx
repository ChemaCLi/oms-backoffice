import { APIFetcher } from "../../../shared/frontend/helpers/fetcher"
import { config } from "../../../shared/constants/config";
console.log({ config })

const fetcher = APIFetcher({
  baseUrl: config.LOGS_API_URL,
  headers: {
    'Content-Type': 'application/json',
    token: 'token',
  },
});

export const getLogs = async ({
  microServiceName = 'INTEGRATIONS_WORKER',
  customerReference,
  orderReference,
  correlationId,
  level,
}) => {
  const criteriaMap = {
    level,
    microServiceName,
    customer_reference: customerReference,
    order_reference: orderReference,
    correlation_id: correlationId,
  }

  const criteriaToQueryParams = (criteria) => {
    const params = Object.keys(criteria).filter(key => !!criteria[key]) 

    return params.map(key => {
      return `${key}=${criteria[key]}`
    }).join('&')
  }

  const queryParams = criteriaToQueryParams(criteriaMap)

  const results = await fetcher.get(`log?${queryParams}`);
  return results.data || [];
}
