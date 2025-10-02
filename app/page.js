"use client";

import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <main>
      <Box component="section" className="border border-gray-800 m-5 p-6 text-center">
        <h1 className="text-3xl text-violet-950 mb-4">Stock Management v1.0</h1>

        <ul className="space-y-2 list-disc list-inside text-blue-700">
          {/* Link auto-adds basePath (/fin-customer) */}
          <li><Link href="/product">Products</Link></li>
          <li><Link href="/category">Category</Link></li>
          <li><Link href="/customers">Customers</Link></li>
        </ul>
      </Box>
    </main>
  );
}
