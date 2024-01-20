import fruits from "./fruits.json";
import { Legend } from "./legend";
import salad from "./salad.json";
import vegetables from "./vegetables.json";

// Each the elements imported from the JSON files are arrays of objects of the following shape:
// {
//     "vegetable": "Radicchio",
//     "available": [8, 9, 10, 11],
//     "storage": [1, 2, 12],
//     "notAvailable": [3, 4, 5, 6, 7]
// },

// merge the arrays and order them by when they are available
const seasonalCalendar = [...fruits, ...salad, ...vegetables].sort(
  (a, b) => a.available[0] - b.available[0]
);

// render a table with the fruits etc in y and months in x. Hightlight when they are available, storage or not available
export function SeasonalCalendar() {
  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th className="bg-white absolute top-0 left-0 z-40 text-white">
              Frühlingszwiebeln
            </th>
            {Array.from(Array(12).keys()).map((month) => (
              <th key={month} className="px-8 bg-white sticky top-0 z-30">
                {
                  // get localised monht name
                  new Date(2021, month).toLocaleString("default", {
                    month: "short",
                  })
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="sticky left-0 z-20">
          {seasonalCalendar.map((item) => (
            <tr key={item.vegetable} className="border-b border-b-slate-200">
              <td className="px-1 bg-white sticky left-0 z-20">
                {item.vegetable}
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
                      ? "bg-slate-400"
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
