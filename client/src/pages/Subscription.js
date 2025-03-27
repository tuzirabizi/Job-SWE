import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  CreditCard as CreditCardIcon,
  Receipt as ReceiptIcon,
  History as HistoryIcon,
  Help as HelpIcon,
  Star as StarIcon,
  Business as BusinessIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Subscription() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [billingHistory, setBillingHistory] = useState([]);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      const [subscriptionResponse, plansResponse, historyResponse] = await Promise.all([
        axios.get('/api/subscription/status'),
        axios.get('/api/subscription/plans'),
        axios.get('/api/subscription/history')
      ]);
      setSubscription(subscriptionResponse.data);
      setPlans(plansResponse.data);
      setBillingHistory(historyResponse.data);
    } catch (error) {
      setError('Failed to load subscription data');
      console.error('Error fetching subscription data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = async (planId) => {
    try {
      setLoading(true);
      await axios.post('/api/subscription/change-plan', { planId });
      setSuccess('Plan changed successfully');
      fetchSubscriptionData();
    } catch (error) {
      setError('Failed to change plan');
      console.error('Error changing plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      await axios.post('/api/subscription/cancel', { reason: cancelReason });
      setSuccess('Subscription cancelled successfully');
      setOpenCancelDialog(false);
      fetchSubscriptionData();
    } catch (error) {
      setError('Failed to cancel subscription');
      console.error('Error cancelling subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePaymentMethod = async () => {
    try {
      setLoading(true);
      await axios.post('/api/subscription/update-payment', { paymentMethod });
      setSuccess('Payment method updated successfully');
      setOpenPaymentDialog(false);
      fetchSubscriptionData();
    } catch (error) {
      setError('Failed to update payment method');
      console.error('Error updating payment method:', error);
    } finally {
      setLoading(false);
    }
  };

  const PlanCard = ({ plan }) => {
    const isCurrentPlan = subscription?.plan.id === plan.id;
    const isUpgrade = subscription?.plan.price < plan.price;
    const isDowngrade = subscription?.plan.price > plan.price;

    return (
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          border: isCurrentPlan ? '2px solid' : 'none',
          borderColor: 'primary.main'
        }}
      >
        {isCurrentPlan && (
          <Chip
            label="Current Plan"
            color="primary"
            sx={{ position: 'absolute', top: 16, right: 16 }}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {plan.name}
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            ${plan.price}
            <Typography component="span" variant="body2" color="text.secondary">
              /{plan.billingCycle}
            </Typography>
          </Typography>
          <List>
            {plan.features.map((feature, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {feature.included ? (
                    <CheckIcon color="success" />
                  ) : (
                    <CloseIcon color="error" />
                  )}
                </ListItemIcon>
                <ListItemText primary={feature.name} />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            variant={isCurrentPlan ? 'outlined' : 'contained'}
            fullWidth
            disabled={isCurrentPlan || loading}
            onClick={() => handlePlanChange(plan.id)}
          >
            {isCurrentPlan
              ? 'Current Plan'
              : isUpgrade
              ? 'Upgrade'
              : isDowngrade
              ? 'Downgrade'
              : 'Select Plan'}
          </Button>
        </Box>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Subscription Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Current Subscription
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Plan
                    </Typography>
                    <Typography variant="h5">
                      {subscription?.plan.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${subscription?.plan.price}/{subscription?.plan.billingCycle}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Status
                    </Typography>
                    <Typography variant="h5">
                      {subscription?.status}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Next billing: {new Date(subscription?.nextBillingDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Billing History
            </Typography>
            <List>
              {billingHistory.map((invoice) => (
                <React.Fragment key={invoice.id}>
                  <ListItem>
                    <ListItemIcon>
                      <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`$${invoice.amount} - ${invoice.status}`}
                      secondary={new Date(invoice.date).toLocaleDateString()}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ReceiptIcon />}
                    >
                      Download
                    </Button>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CreditCardIcon sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">
                      **** **** **** {subscription?.paymentMethod.last4}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    Expires {subscription?.paymentMethod.expMonth}/{subscription?.paymentMethod.expYear}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setOpenPaymentDialog(true)}
            >
              Update Payment Method
            </Button>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Subscription Actions
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary="View Usage"
                  secondary="Check your subscription usage"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Support"
                  secondary="Get help with your subscription"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CloseIcon color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="Cancel Subscription"
                  secondary="End your subscription"
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setOpenCancelDialog(true)}
                >
                  Cancel
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cancel Subscription</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Please provide a reason for cancelling your subscription.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Reason"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCancelSubscription}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirm Cancellation'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Payment Method</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Enter your new payment method details.
          </Typography>
          <TextField
            fullWidth
            label="Card Number"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                placeholder="MM/YY"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                type="password"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpdatePaymentMethod}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Update Payment Method'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Subscription; 