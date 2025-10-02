'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const API = '/fin-customer/api/customers';

export default function NewCustomer() {
  const router = useRouter();
  const [form, setForm] = useState({ name:'', dob:'', memberNumber:'', interests:'' });

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, memberNumber: Number(form.memberNumber) };
    const res = await fetch(API, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (res.ok) router.push('/customers');
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Add Customer</h1>
      <form className="space-y-3 max-w-md" onSubmit={onSubmit}>
        <input className="border p-2 w-full" placeholder="Name"
               value={form.name} onChange={e=>setForm({ ...form, name: e.target.value })}/>
        <input type="date" className="border p-2 w-full" placeholder="DOB"
               value={form.dob} onChange={e=>setForm({ ...form, dob: e.target.value })}/>
        <input type="number" className="border p-2 w-full" placeholder="Member Number"
               value={form.memberNumber} onChange={e=>setForm({ ...form, memberNumber: e.target.value })}/>
        <input className="border p-2 w-full" placeholder="Interests"
               value={form.interests} onChange={e=>setForm({ ...form, interests: e.target.value })}/>
        <button className="border px-4 py-2" type="submit">Create</button>
      </form>
    </main>
  );
}
