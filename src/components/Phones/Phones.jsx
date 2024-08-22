import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Audio, Grid } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";

const Phones = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //     // fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
  //     // .then(res => res.json())
  //     // .then(data => setPhones(data.data))

  //     axios.get('https://openapi.programming-hero.com/api/phones?search=iphone')
  //         .then(data => {
  //             const phoneData = data.data.data;
  //             const phonesWithFakeData = phoneData.map(phone => {
  //                 const obj = {
  //                     name: phone.phone_name,
  //                     price: parseInt(phone.slug.split('-')[1])
  //                 }
  //                 return obj;
  //             })
  //             console.log(phonesWithFakeData);
  //             setPhones(phonesWithFakeData);
  //             setLoading(false);
  //         });

  // }, [])

  const {
    isLoading,
    isError,
    data: phoneData = [],
  } = useQuery({
    queryKey: ["phoneData"],
    queryFn: async () => {
      const res = await fetch(
        "https://openapi.programming-hero.com/api/phones?search=iphone"
      );

      const data = await res.json();
      console.log(data.data);


      const phonesWithFakeData = data.data.map((phone) => ({
        name: phone.phone_name,
        price: parseInt(phone.slug.split("-")[1], 10),
      }));

      console.log(phonesWithFakeData);
      return phonesWithFakeData;
    },
  });

  return (
    <div>
      {isLoading && (
        <div>
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
          <Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <h2 className="text-5xl">PHones: {phoneData.length}</h2>
      <BarChart width={1200} height={400} data={phoneData}>
        <Bar dataKey="price" fill="#8884d8" />
        <XAxis dataKey="name"></XAxis>
        <YAxis></YAxis>
        <Tooltip></Tooltip>
      </BarChart>
    </div>
  );
};

export default Phones;
