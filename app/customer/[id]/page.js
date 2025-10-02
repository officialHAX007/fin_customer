'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const API_ROOT = '/fin-customer/api/customers';

export default function CustomerDetail({ params }) {
  const { id } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const editing = searchParams.get('edit') === '1';

  const [data, setData] = useState(null);
  const [form, setForm] = useState({ name:'', dob:'', memberNumber:'', interests:'' });

  const load = async () => {
    const res = await fetch(`${API_ROOT}/${id}`, { cache: 'no-store' });
    const json = await res.json();
    setData(json);
    setForm({
      name: json.name ?? '',
      dob: json.dob ? new Date(json.dob).toISOString().slice(0,10) : '',
      memberNumber: json.memberNumber ?? '',
      interests: json.interests ?? ''
    });
  };

  useEffect(() => { load(); }, [id]);

  const update = async (e) => {
    e.preventDefault();
    const payload = { ...form, memberNumber: Number(form.memberNumber) };
    const res = await fetch(`${API_ROOT}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) router.push('/customers');
  };

  if (!data) return <main className="p-6">Loading...</main>;

  if (editing) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold mb-4">Edit Customer</h1>
        <form className="space-y-3 max-w-md" onSubmit={update}>
          <input className="border p-2 w-full" value={form.name}
                 onChange={e=>setForm({ ...form, name: e.target.value })}/>
          <input type="date" className="border p-2 w-full" value={form.dob}
                 onChange={e=>setForm({ ...form, dob: e.target.value })}/>
          <input type="number" className="border p-2 w-full" value={form.memberNumber}
                 onChange={e=>setForm({ ...form, memberNumber: e.target.value })}/>
          <input className="border p-2 w-full" value={form.interests}
                 onChange={e=>setForm({ ...form, interests: e.target.value })}/>
          <button className="border px-4 py-2" type="submit">Save</button>
        </form>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Customer Detail</h1>
      <div className="space-y-2">
        <p><b>Name:</b> {data.name}</p>
        <p><b>DOB:</b> {new Date(data.dob).toISOString().slice(0,10)}</p>
        <p><b>Member #:</b> {data.memberNumber}</p>
        <p><b>Interests:</b> {data.interests}</p>
      </div>
      <div className="mt-4">
        <a className="underline text-blue-700" href={`/fin-customer/customers/${id}?edit=1`}>Edit</a>
      </div>
    </main>
  );
}
