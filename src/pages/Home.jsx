import { useState } from "react";

export default function Home() {
    const [click, setClick] = useState("");
    console.log(click)
    return (
        <div className="flex flex-col items-center gap-6">
            <h1 className="text-6xl text-blue-200 font-bold">
                Next Level <span className="text-blue-400">Weatherly App</span>
            </h1>
            <p className="max-w-md text-md text-gray-400">Check your weather today in Weatherly</p>

            <div>
                <button onClick={() => setClick("clicked")} type="button" className="text-gray-100 text-md bg-blue-600 rounded-2xl shadow-2xl px-4 py-2 cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all duration-300 ring-2 ring-blue-500">Check Weather</button>
            </div>
        </div>
    );
}