// app/lib/apiClient.js
export async function authenticatedFetch(url, options = {}) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user?.token) throw new Error('Not authenticated');

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${user.token}`
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}
