const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  return data;
};

export const getAllNews = async (options = {}) => {
  try {
    const { category, page = 1, limit = 10, featured } = options;
    const params = new URLSearchParams();

    if (category) params.append('category', category);
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (featured) params.append('featured', 'true');

    const response = await fetch(`${API_URL}/news?${params}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const getNewsById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/news/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

export const getNewsByCategory = async (categorySlug, page = 1, limit = 10) => {
  try {
    const params = new URLSearchParams({
      category: categorySlug,
      page: page.toString(),
      limit: limit.toString(),
    });
    const response = await fetch(`${API_URL}/news?${params}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching category news:', error);
    throw error;
  }
};

export const searchNews = async (query, page = 1, limit = 10) => {
  try {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
    });
    const response = await fetch(`${API_URL}/news/search?${params}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

export const getRelatedNews = async (articleId, limit = 3) => {
  try {
    const response = await fetch(`${API_URL}/news/${articleId}/related?limit=${limit}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching related news:', error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return await handleResponse(response);
  } catch (error) {
    console.error('API health check failed:', error);
    return { status: 'error', message: error.message };
  }
};
