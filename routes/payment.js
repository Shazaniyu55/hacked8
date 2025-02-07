import express from 'express';
// middlewares
import hacked from '../controller/paymemt.js';

const router = express.Router();

router.post('/payment', hacked.subscriptionFee);
router.get('/verify-payment', hacked.verifyPayment);

export default router;