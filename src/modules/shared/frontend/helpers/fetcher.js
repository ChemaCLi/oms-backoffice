export const APIFetcher = ({ baseUrl, headers }) => ({
  get: async (endpoint) => {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      headers,
    });
    const data = await response.json();
    return data;
  },
  post: async (endpoint, body) => {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
  put: async (endpoint, body) => {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
  delete: async (endpoint) => {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'DELETE',
      headers,
    });
    const data = await response.json();
    return data;
  },
  patch: async (endpoint, body) => {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
});

