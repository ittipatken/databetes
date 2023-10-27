"use client";

import BuyHistoryBox from "@/components/Kcomponent/BuyHistoryBox";
import { useEffect, useState } from "react";
type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  seller: number
};

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getproducts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  let arrayofloss = products.filter(products=>products.seller)

  let test = [{id: 1, name: "www" , price: 999, description: "asdkmsfsmdpfsp"}, {id: 1, name: "ppp" , price : 333, description: "hhhhsdgftiiaisdiasiiacioinocnioscni"}]
  return (
    <>
    <div className="flex flex-wrap gap-4 m-3">
        {test.map((test) => (
          <div key={test.id}>
            <BuyHistoryBox
              name={test.name}
              price={test.price}
              description={test.description}/>
          </div>))}
    </div>
      </>)



  /*
type userdatatype = {
  id  : number
  email : string
  name : string     
  lastname : String
  products: ProductType[]
} 

  const [userinfo, setUserinfo] = useState<userdatatype[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getusers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setUserinfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
*/
  /*
  let arrayofpay : number[] = products.map(p=>p.price)
  
  //et arrayofproduct : Array[]= userinfo.map(p=>p.products)

  //let userproduct= userinfo.products

  let sumpay = arrayofpay.reduce((sum, currentvalue) => sum + currentvalue, 0)
  */
 
//let test = [{id: 1, name: "www" , price: 999}, {id: 1, name: "ppp" , price : 333}]
/*
return (
  <>
  <div className="flex flex-wrap">
      {test.map((test) => (
        <div key={test.id}>
          <BuyHistoryBox
            name={test.name}
            price={test.price}/>
        </div>))}
  </div>
    </>
)}
      */}