import React, { useState, ChangeEvent } from "react";
import './index.css';


interface optionType {
  name: string;
  lat: number;
  lon: number;
}

function App() {
  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<optionType[]>([]);

  const getSearchOptions = (value: string) => {
    fetch(`http://api.openweathermap.org/geo/1.0/
    direct?q=${value.trim()}&limit=5&appid=${process.env.REACT_API_KEY}`)
    .then((res) => res.json())
    .then((data) => setOptions(data))
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === '') {
      return;
    }
    getSearchOptions(value);
  }



  const onOptionSelect = (option: optionType) => {
    setTerm(option.name);
    setOptions([]);
  };


  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-green-500 to-blue-500">
      <section
        className="w-full md:max-w-[500px] p-4 flex flex-col bg-white rounded-md shadow-lg"
        style={{ height: "90vh" }}
      >
        <h1 className="text-2xl text-center font-semibold">
          Weather App using OpenWeatherMap API
        </h1>
        <p className="text-sm mt-2">
          Enter below a place you want to know the weather and select an option
          from the dropdown
        </p>
        <div className="relative flex mt-10 md:mt-4">
          <input
            type="text"
            value={term}
            className="px-2 py-1 rounded-1-md border-2 border-white"
            onChange={onInputChange}
          />
          <ul key="options-list" className="absolute top-8 bg-white ml-[-0.2px] rounded-b-md">
            {options.map((option: optionType) => (
              <li key={option.name}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default App;
