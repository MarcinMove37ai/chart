/**
 * @file src/app/sales/page.tsx
 * @description Strona modułu sprzedaży
 */

import { Metadata } from "next"
import SalesView from "./SalesView"

export const metadata: Metadata = {
  title: "Sprzedaż - CRM",
  description: "Moduł sprzedaży systemu CRM",
}

export default function SalesPage() {
  return <SalesView />
}