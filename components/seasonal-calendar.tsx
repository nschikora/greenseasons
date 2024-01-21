"use client";
import { useRouter } from "next/navigation";
import { Legend } from "./legend";
import food from "@/data/food.json";

function getFoodSorted() {
  return food.sort((a, b) => a.available[0] - b.available[0]);
}

export function SeasonalCalendar() {
  const seasonalFood = getFoodSorted();
  const router = useRouter();
  return (
    <>
      <table className="w-full border-separate border-spacing-y-1 border-spacing-x-0">
        <thead>
          <tr>
            <th className="bg-white absolute top-0 left-0 z-40 text-white h-6">
              Frühlingszwiebeln
            </th>
            {Array.from(Array(12).keys()).map((month) => (
              <th key={month} className="px-8 bg-white sticky top-0 z-30">
                {new Date(2021, month).toLocaleString("de-DE", {
                  month: "short",
                })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="sticky left-0 z-20 gap-1">
          {seasonalFood.map((item) => (
            <tr
              key={item.id}
              className="cursor-pointer hover:ring-1 ring-slate-700"
              onClick={() => router.push(`/details/${item.id}`)}
            >
              <td className="px-1 bg-white sticky left-0 z-20 h-12">
                {item.name}
              </td>
              {Array.from(Array(12).keys()).map((month) => (
                <td
                  key={month}
                  className={
                    item.available.includes(month + 1)
                      ? "bg-emerald-400"
                      : item.storage.includes(month + 1)
                      ? "bg-sky-400"
                      : item.notAvailable.includes(month + 1)
                      ? "bg-slate-300"
                      : ""
                  }
                ></td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="sticky left-0 z-20">
              <Legend />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
