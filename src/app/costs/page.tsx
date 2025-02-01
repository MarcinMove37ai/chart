/**
 * @file src/app/costs/page.tsx
 * @description Strona modułu kosztów
 */

import { Metadata } from "next"
import CostsView from "./CostsView"

export const metadata: Metadata = {
  title: "Koszty - CRM",
  description: "Moduł kosztów systemu CRM",
}

export default function CostsPage() {
  return <CostsView />
}