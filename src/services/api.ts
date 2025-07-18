const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Auth methods
  async register(userData: { name: string; email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return response.json();
  }

  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return response.json();
  }

  // CV methods
  async getCVs() {
    const response = await fetch(`${API_BASE_URL}/cv`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch CVs');
    }
    
    return response.json();
  }

  async getCV(id: string) {
    const response = await fetch(`${API_BASE_URL}/cv/${id}`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch CV');
    }
    
    return response.json();
  }

  async createCV(cvData: any) {
    const response = await fetch(`${API_BASE_URL}/cv`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(cvData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return response.json();
  }

  async updateCV(id: string, cvData: any) {
    const response = await fetch(`${API_BASE_URL}/cv/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(cvData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return response.json();
  }

  async deleteCV(id: string) {
    const response = await fetch(`${API_BASE_URL}/cv/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete CV');
    }
    
    return response.json();
  }
}

export const apiService = new ApiService();