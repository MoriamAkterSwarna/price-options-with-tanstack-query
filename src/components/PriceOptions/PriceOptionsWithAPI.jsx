import React, { useEffect, useState } from "react";
import PriceOptionWithAPI from "../PriceOption/PriceOptionWithAPI";

const PriceOptionsWithAPI = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/priceOptions")
      .then((res) => res.json())
      .then((data) => setOptions(data));
  }, []);

  console.log(options);

  return (
    <div>
      <h1 className="text-4xl text-center text-fuchsia-500 font-extrabold my-4">
        Price Options with Express JS API
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mx-16">
        {options.map((option) => (
          <PriceOptionWithAPI
            key={option.id}
            option={option}
          ></PriceOptionWithAPI>
        ))}
      </div>
    </div>
  );
};

export default PriceOptionsWithAPI;
