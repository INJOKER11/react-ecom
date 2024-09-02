import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";



const FullProduct: React.FC = () => {

  const navigate = useNavigate();
  const {id} = useParams();
  const [item, setItem] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    types: string[];
    sizes: string[];
  }>();

  useEffect(() => {
    async function fetchProduct(){
      try {
        const {data} = await axios.get(`https://669ecf379a1bda368007a2e2.mockapi.io/pizza/${id}`)
        setItem(data)
      }catch (error) {
        alert('Issue with API')
        navigate('/')
      }
    }
    fetchProduct()
  }, [id]);


  if(!item){
    return 'Loading...'
  }

  return (
      <div>
        <img src={item.imageUrl}/>
        <h2>{item.title}</h2>
        <h3>{item.price}</h3>
        {
          item.types && item.types.map((type) => (
              <p key={type}> type {type}</p>
            ))
        }

        {item.sizes && item.sizes.map((size) => (
            <p key={size}> size{size}</p>
        ))}
      </div>
  );
};

export default FullProduct;