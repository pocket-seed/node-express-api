import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.transactions));
});

router.get('/:transactionId', (req, res) => {
  return res.send(req.context.models.transactions[req.params.transactionId]);
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const transaction = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.transactions[id] = transaction;

  return res.send(transaction);
});

router.delete('/:transactionId', (req, res) => {
  const {
    [req.params.transactionId]: transaction,
    ...othertransactions
  } = req.context.models.transactions;

  req.context.models.transactions = othertransactions;

  return res.send(transaction);
});

export default router;
