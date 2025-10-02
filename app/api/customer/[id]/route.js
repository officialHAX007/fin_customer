import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Customer from '@/models/Customer';

let isConn = false;
async function db() {
  if (!isConn) {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set');
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'fin' });
    isConn = true;
  }
}

// GET /fin-customer/api/customers/:id
export async function GET(_req, { params }) {
  await db();
  const row = await Customer.findById(params.id).lean();
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(row);
}

// PUT /fin-customer/api/customers/:id
export async function PUT(req, { params }) {
  await db();
  const body = await req.json();
  const updated = await Customer.findByIdAndUpdate(params.id, body, { new: true });
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

// DELETE /fin-customer/api/customers/:id
export async function DELETE(_req, { params }) {
  await db();
  const res = await Customer.findByIdAndDelete(params.id);
  if (!res) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
