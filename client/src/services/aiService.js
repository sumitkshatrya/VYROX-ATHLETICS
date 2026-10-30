// Client AI Service to communicate with the secure Node.js backend
import { API_BASE_URL } from './apiConfig';

export async function sendChatMessage(message, history = [], context = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history,
        context,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `Server responded with status ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error('sendChatMessage error:', error);
    throw error;
  }
}

export async function getFitnessPlan(preferences) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/ai/fitness-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `Server responded with status ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error('getFitnessPlan error:', error);
    throw error;
  }
}

export async function checkAiStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/ai/status`);
    if (!res.ok) return { status: 'offline' };
    return await res.json();
  } catch (error) {
    return { status: 'offline' };
  }
}
