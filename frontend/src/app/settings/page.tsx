/**
 * @file src/app/settings/page.tsx
 * @description Strona modułu ustawień
 */

import { Metadata } from "next"
import SettingsView from "./SettingsView"

export const metadata: Metadata = {
  title: "Ustawienia - CRM",
  description: "Moduł ustawień systemu CRM",
}

export default function SettingsPage() {
  return <SettingsView />
}