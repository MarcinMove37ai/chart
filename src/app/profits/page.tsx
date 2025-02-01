/**
 * @file src/app/profits/page.tsx
 * @description Strona modułu zysków
 */

import { Metadata } from "next"
import ProfitsView from "./ProfitsView"

export const metadata: Metadata = {
  title: "Zyski - CRM",
  description: "Moduł zysków systemu CRM",
}

export default function ProfitsPage() {
  return <ProfitsView />
}