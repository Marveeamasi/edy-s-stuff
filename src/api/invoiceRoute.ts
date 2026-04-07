import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();


app.get('/api/invoices/:id', async (req, res) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id: req.params.id } 
  });
  
  res.json(invoice);
});