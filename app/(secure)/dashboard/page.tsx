"use client";

import * as React from "react";
import { useUserfront, LogoutButton } from "@userfront/next/client";
import UserDataComponent from './UserDataComponent';
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useUserfront();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Hello, {user.email}</p>
      <UserDataComponent />
     <LogoutButton />
     <Link href="/server">Server Example with Async Data Fetching &#8594;</Link>
    </div>
  );
}