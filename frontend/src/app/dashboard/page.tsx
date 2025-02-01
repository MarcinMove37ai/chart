import { Metadata } from "next"
import DashboardView from "./DashboardView"

export const metadata: Metadata = {
  title: "Dashboard - CRM",
  description: "Panel główny systemu CRM",
}

export default function DashboardPage() {
  return <DashboardView />
}