const express = require('express');
const router = express.Router();

// @route    GET api/subscriptions/plans
// @desc     Get all subscription plans
// @access   Public
router.get('/plans', (req, res) => {
  try {
    // Mock subscription plans
    const plans = [
      {
        id: 1,
        name: 'Basic',
        price: 9.99,
        billingCycle: 'monthly',
        features: [
          { name: '10 Job Applications', included: true },
          { name: 'Basic Profile', included: true },
          { name: 'Email Support', included: true },
          { name: 'AI Resume Review', included: false },
          { name: 'Priority Application', included: false }
        ]
      },
      {
        id: 2,
        name: 'Pro',
        price: 19.99,
        billingCycle: 'monthly',
        features: [
          { name: 'Unlimited Job Applications', included: true },
          { name: 'Enhanced Profile', included: true },
          { name: 'Priority Support', included: true },
          { name: 'AI Resume Review', included: true },
          { name: 'Priority Application', included: false }
        ]
      },
      {
        id: 3,
        name: 'Premium',
        price: 29.99,
        billingCycle: 'monthly',
        features: [
          { name: 'Unlimited Job Applications', included: true },
          { name: 'Premium Profile', included: true },
          { name: '24/7 Support', included: true },
          { name: 'AI Resume Review', included: true },
          { name: 'Priority Application', included: true }
        ]
      }
    ];

    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/subscriptions/status
// @desc     Get user subscription status
// @access   Private
router.get('/status', (req, res) => {
  try {
    // Mock subscription status
    const subscription = {
      id: 1,
      userId: 1,
      plan: {
        id: 2,
        name: 'Pro',
        price: 19.99,
        billingCycle: 'monthly'
      },
      status: 'Active',
      startDate: '2023-01-01T00:00:00Z',
      nextBillingDate: '2023-05-01T00:00:00Z',
      paymentMethod: {
        id: 1,
        type: 'Credit Card',
        last4: '4242',
        expMonth: '12',
        expYear: '2025'
      }
    };

    res.json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/subscriptions/history
// @desc     Get user subscription billing history
// @access   Private
router.get('/history', (req, res) => {
  try {
    // Mock billing history
    const history = [
      {
        id: 1,
        amount: 19.99,
        status: 'Paid',
        date: '2023-04-01T00:00:00Z',
        invoice: 'INV-001'
      },
      {
        id: 2,
        amount: 19.99,
        status: 'Paid',
        date: '2023-03-01T00:00:00Z',
        invoice: 'INV-002'
      },
      {
        id: 3,
        amount: 19.99,
        status: 'Paid',
        date: '2023-02-01T00:00:00Z',
        invoice: 'INV-003'
      }
    ];

    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/subscriptions/change-plan
// @desc     Change subscription plan
// @access   Private
router.post('/change-plan', (req, res) => {
  try {
    const { planId } = req.body;

    // Mock change plan response
    res.json({
      success: true,
      message: 'Subscription plan changed successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/subscriptions/cancel
// @desc     Cancel subscription
// @access   Private
router.post('/cancel', (req, res) => {
  try {
    const { reason } = req.body;

    // Mock cancel subscription response
    res.json({
      success: true,
      message: 'Subscription cancelled successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 