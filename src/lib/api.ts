const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${response.status} ${errorText}`);
  }

  return response.json() as Promise<ApiResponse<T>>;
}

function authRequest<T>(path: string, token: string, init?: RequestInit): Promise<ApiResponse<T>> {
  return request<T>(path, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });
}

export async function getServices() {
  return request<Array<{ id: string; title: string; description: string; icon: string; features: string[] }>>('/services');
}

export async function getPortfolio() {
  return request<Array<{ id: string; title: string; category: string; description: string; image: string; link: string; metrics: string }>>('/portfolio');
}

export async function getBlogPosts() {
  return request<Array<{ id: number; title: string; excerpt: string; content: string; category: string; readTime: string; createdAt: string; updatedAt: string }>>('/blog');
}

export async function submitContact(data: { name: string; email: string; company: string; message: string }) {
  return request<unknown>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function loginAdmin(data: { email: string; password: string }) {
  return request<{ token: string; user: { id: number; name: string; email: string } }>('/admin/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function adminGetBlogPosts(token: string) {
  return authRequest<Array<{ id: number; title: string; excerpt: string; content: string; category: string; readTime: string; createdAt: string; updatedAt: string }>>('/blog', token);
}

export async function adminCreateBlogPost(token: string, data: { title: string; excerpt: string; content: string; category: string; readTime: string }) {
  return authRequest<{ id: number; title: string; excerpt: string; content: string; category: string; readTime: string; createdAt: string; updatedAt: string }>('/blog', token, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function adminUpdateBlogPost(token: string, id: number, data: { title?: string; excerpt?: string; content?: string; category?: string; readTime?: string }) {
  return authRequest<{ id: number; title: string; excerpt: string; content: string; category: string; readTime: string; createdAt: string; updatedAt: string }>(`/blog/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function adminDeleteBlogPost(token: string, id: number) {
  return authRequest<{ id: number }>(`/blog/${id}`, token, {
    method: 'DELETE',
  });
}

export async function adminGetServices(token: string) {
  return authRequest<Array<{ id: string; title: string; description: string; icon: string; features: string[] }>>('/services', token);
}

export async function adminCreateService(token: string, data: { id: string; title: string; description: string; icon: string; features: string[] }) {
  return authRequest<{ id: string; title: string; description: string; icon: string; features: string[] }>('/services', token, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function adminUpdateService(token: string, id: string, data: { title?: string; description?: string; icon?: string; features?: string[] }) {
  return authRequest<{ id: string; title: string; description: string; icon: string; features: string[] }>(`/services/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function adminDeleteService(token: string, id: string) {
  return authRequest<{ id: string; title: string; description: string; icon: string; features: string[] }>(`/services/${id}`, token, {
    method: 'DELETE',
  });
}

export async function adminGetPortfolio(token: string) {
  return authRequest<Array<{ id: string; title: string; category: string; description: string; image: string; link: string; metrics: string }>>('/portfolio', token);
}

export async function adminCreatePortfolio(token: string, data: { id: string; title: string; category: string; description: string; image: string; link: string; metrics: string }) {
  return authRequest<{ id: string; title: string; category: string; description: string; image: string; link: string; metrics: string }>('/portfolio', token, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function adminUpdatePortfolio(token: string, id: string, data: { title?: string; category?: string; description?: string; image?: string; link?: string; metrics?: string }) {
  return authRequest<{ id: string; title: string; category: string; description: string; image: string; link: string; metrics: string }>(`/portfolio/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function adminDeletePortfolio(token: string, id: string) {
  return authRequest<{ id: string; title: string; category: string; description: string; image: string; link: string; metrics: string }>(`/portfolio/${id}`, token, {
    method: 'DELETE',
  });
}

export async function adminGetContactMessages(token: string) {
  return authRequest<Array<{ id: number; name: string; email: string; company: string; message: string; createdAt: string }>>('/contact', token);
}

export async function adminUpdateContactMessage(token: string, id: number, data: { name?: string; email?: string; company?: string; message?: string }) {
  return authRequest<{ id: number; name: string; email: string; company: string; message: string; createdAt: string }>(`/contact/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function adminDeleteContactMessage(token: string, id: number) {
  return authRequest<{ id: number }>(`/contact/${id}`, token, {
    method: 'DELETE',
  });
}

export async function adminLogout(token: string) {
  return authRequest<null>('/admin/logout', token, { method: 'POST' });
}

