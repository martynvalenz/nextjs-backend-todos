import { WidgetItem } from "@/components";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Generated by create next app',
}

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* <WidgetItem /> */}
    </div>
  );
}