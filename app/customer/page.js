'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = '/fin-customer/api/customers';

export default function CustomersList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch(API, { cache: 'no-store' });
    const data = await res.json();
    setRows(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!confirm('Delete this customer?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Customers</h1>
      <div className="mb-4">
        <Link className="underline text-blue-600" href="/customers/new">+ Add new</Link>
      </div>
      {loading ? <p>Loading...</p> : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">DOB</th>
              <th className="p-2 border">Member #</th>
              <th className="p-2 border">Interests</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r._id}>
                <td className="p-2 border">
                  <Link className="text-blue-700 underline" href={`/customers/${r._id}`}>{r.name}</Link>
                </td>
                <td className="p-2 border">{new Date(r.dob).toISOString().slice(0,10)}</td>
                <td className="p-2 border">{r.memberNumber}</td>
                <td className="p-2 border">{r.interests}</td>
                <td className="p-2 border space-x-2">
                  <Link className="underline" href={`/customers/${r._id}?edit=1`}>Edit</Link>
                  <button className="text-red-600 underline" onClick={() => onDelete(r._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td className="p-2 border text-center" colSpan="5">No customers yet.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </main>
  );
}
