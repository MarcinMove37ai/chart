/**
 * @file src/app/map/page.tsx
 * @description Strona modułu mapy klientów
 */

import { Metadata } from "next"
import MapView from "./MapView"

export const metadata: Metadata = {
  title: "Mapa Klientów - CRM",
  description: "Moduł mapy klientów systemu CRM",
}

export default function MapPage() {
  return <MapView />
}