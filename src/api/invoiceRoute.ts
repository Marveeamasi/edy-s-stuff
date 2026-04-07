import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// @security: Strict Ownership Enforcement (BOLA Protection)
app.get('/api/invoices/:id', async (req, res) => {
  const invoice = await prisma.invoice.findFirst({
    where: { 
        id: req.params.id,
         userId: req.user.id // safety lock
    } 
  });
  
  if (!invoice) {
    // We return 404, not 403. Don't even tell them the record exists.
    return res.status(404).json({ error: "Record not found" });
  }
  
  res.json(invoice);
});