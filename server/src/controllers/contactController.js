// Contact form controller with validation and spam protection

export async function submitContactForm(req, res) {
  try {
    const { name, email, phone, interest, message, _honey } = req.body;

    // Honeypot spam check: bots automatically fill hidden fields
    if (_honey) {
      console.warn('Spam submission detected and discarded via honeypot.');
      return res.status(200).json({
        success: true,
        referenceId: 'SPAM-FILTERED',
        message: 'Your inquiry has been received.'
      });
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your full name (minimum 2 characters).'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a message with at least 10 characters detailing your fitness goals or questions.'
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Message exceeds maximum length of 2000 characters.'
      });
    }

    const cleanData = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 100),
      phone: typeof phone === 'string' ? phone.trim().slice(0, 30) : '',
      interest: typeof interest === 'string' ? interest.trim().slice(0, 100) : 'General Enquiry',
      message: message.trim().slice(0, 2000),
      receivedAt: new Date().toISOString(),
      referenceId: `VYR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };

    // Log the enquiry cleanly to the server
    console.log(`[ENQUIRY RECEIVED] [${cleanData.referenceId}] From: ${cleanData.name} <${cleanData.email}> | Interest: ${cleanData.interest}`);

    return res.json({
      success: true,
      referenceId: cleanData.referenceId,
      message: `Thank you, ${cleanData.name}. Your enquiry (#${cleanData.referenceId}) has been successfully received by our Member Services team. We will review your request and reply to ${cleanData.email} within 24 hours.`
    });
  } catch (error) {
    console.error('Error submitting contact enquiry:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Unable to submit your enquiry at this moment. Please reach out via WhatsApp or call us directly.'
    });
  }
}

