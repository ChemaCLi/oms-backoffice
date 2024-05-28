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
  microServiceName,
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
    correlationId,
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
