import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Customer from '@/models/Customer';

let isConn = false;
async function db() {
  if (!isConn) {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set');
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'fin' });
    isConn = true;
    console.log('DB connected');
  }
}

// GET /fin-customer/api/customers
export async function GET() {
  await db();
  const customers = await Customer.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(customers);
}

// POST /fin-customer/api/customers
export async function POST(req) {
  await db();
  const body = await req.json();
  const created = await Customer.create(body);
  return NextResponse.json(created, { status: 201 });
}
