import Markdown from "react-markdown";
import food from "@/data/food.json";
import Link from "next/link";
import { FoodType } from "@/data/food.definition";

function getFood(id: string): FoodType | undefined {
  return food.find((f) => f.id === id);
}

export default function DetailsPage({ params }: { params: { id: string } }) {
  const item = getFood(params.id);

  if (!item) {
    return <h1>Not found</h1>;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-50">
      <Link
        href={"/"}
        className="rounded-full fixed top-4 right-4 bg-slate-700 text-white w-10 h-10 flex items-center justify-center"
      >
        ⇦
      </Link>
      <main className="flex flex-col items-start justify-start h-full max-w-[800px] mx-auto py-8 p-4">
        <h1 className="text-3xl font-bold mb-8">{item.name}</h1>
        <h2 className="text-2xl">Beschreibung</h2>
        <p className="py-4">{item.description}</p>
        <h2 className="text-2xl">Herkunft</h2>
        <p className="py-4">{item.origin}</p>
        <h2 className="text-2xl">Gesundheit</h2>
        <p className="py-4">
          <Markdown>{item.health}</Markdown>
        </p>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return food.map(({ id }) => ({
    id,
  }));
}
