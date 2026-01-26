import { Separator } from "@/components/ui/separator";
import React from "react";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl pl-4">Dashboard</h2>
      <Separator className="my-4" />
      <section className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-2">
          <Sidebar />
        </div>
        <div className="lg:col-span-10">{children}</div>
      </section>
    </>
  );
}

export default DashboardLayout;
