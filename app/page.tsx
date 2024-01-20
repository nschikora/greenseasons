import { Legend } from "@/components/legend";
import { SeasonalCalendar } from "@/components/seasonal-calendar";

export default function Home() {
  return (
    <main className="flex lg:justify-center overflow-auto h-screen">
      <SeasonalCalendar />
    </main>
  );
}
