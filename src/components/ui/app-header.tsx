"use client";

import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          Settings
        </Button>
        <UserCircle className="w-8 h-8 text-gray-600" />
      </div>
    </header>
  );
}
