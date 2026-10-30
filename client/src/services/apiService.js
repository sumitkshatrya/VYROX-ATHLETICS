// Client API Service for Contact and General Backend interactions

export async function submitContact(formData) {
  try {
    const res = await fetch('/api/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to submit contact enquiry.');
    }

    return data;
  } catch (error) {
    console.error('submitContact error:', error);
    throw error;
  }
}

export async function checkServerHealth() {
  try {
    const res = await fetch('/api/health');
    return await res.json();
  } catch (error) {
    return { status: 'offline' };
  }
}

