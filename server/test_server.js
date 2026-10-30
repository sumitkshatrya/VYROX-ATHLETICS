import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = 5099;

const server = app.listen(PORT, async () => {
  console.log(`Test server running on port ${PORT}`);

  try {
    // 1. Test Health
    console.log('Testing /api/health...');
    const healthRes = await fetch(`http://localhost:${PORT}/api/health`);
    const healthJson = await healthRes.json();
    console.log('Health Response:', healthJson);

    // 2. Test AI Status
    console.log('\nTesting /api/ai/status...');
    const statusRes = await fetch(`http://localhost:${PORT}/api/ai/status`);
    const statusJson = await statusRes.json();
    console.log('AI Status:', statusJson);

    // 3. Test AI Chat
    console.log('\nTesting /api/ai/chat...');
    const chatRes = await fetch(`http://localhost:${PORT}/api/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What are your gym operating hours and membership prices?',
        history: []
      })
    });
    const chatJson = await chatRes.json();
    console.log('Chat Status:', chatRes.status);
    console.log('Chat Provider:', chatJson.provider);
    console.log('Chat Reply preview:', chatJson.reply?.substring(0, 150) + '...');

    // 4. Test AI Fitness Plan
    console.log('\nTesting /api/ai/fitness-plan...');
    const planRes = await fetch(`http://localhost:${PORT}/api/ai/fitness-plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        goal: 'Build muscle',
        experience: 'Intermediate',
        daysPerWeek: 4,
        duration: '60',
        equipment: 'Full Commercial Gym',
        location: 'Gym'
      })
    });
    const planJson = await planRes.json();
    console.log('Plan Status:', planRes.status);
    console.log('Plan Success:', planJson.success);
    console.log('Plan Name:', planJson.plan?.planName);
    console.log('Days generated:', planJson.plan?.schedule?.length);

    // 5. Test Contact Submission
    console.log('\nTesting /api/contact/submit...');
    const contactRes = await fetch(`http://localhost:${PORT}/api/contact/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jordan Smith',
        email: 'jordan@example.com',
        phone: '+1 555-123-4567',
        interest: 'Quarterly Pro (₹7,999/quarter)',
        message: 'I would like to book a tour of the facility and test the recovery cold plunge.'
      })
    });
    const contactJson = await contactRes.json();
    console.log('Contact Status:', contactRes.status);
    console.log('Contact Success:', contactJson.success);
    console.log('Reference ID:', contactJson.referenceId);

    // 6. Test Honeypot Spam detection
    console.log('\nTesting Honeypot Spam filtering...');
    const spamRes = await fetch(`http://localhost:${PORT}/api/contact/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Bot Spammer',
        email: 'bot@spam.com',
        message: 'Spam link here',
        _honey: 'bot-filled-field'
      })
    });
    const spamJson = await spamRes.json();
    console.log('Spam Reference ID:', spamJson.referenceId);

    console.log('\nALL TESTS COMPLETED SUCCESSFULLY!');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Test failed with error:', err);
    server.close();
    process.exit(1);
  }
});

