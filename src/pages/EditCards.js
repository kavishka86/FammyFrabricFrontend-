import React, { useEffect, useState } from "react";
import {  } from 'antd';

//components
import CardComponent from '../Components/CardComponent'

import Layout from "../Components/Layout";


function EditCards () {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/card');
        if (response.ok) {
          const data = await response.json();
          setCards(data.data); 
        } else {
          console.error('Failed to fetch cards:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (


    <Layout>
    <div className="background">
      <h1 className="text1">All Cards</h1>
        {cards && cards.map((card) => (
          <CardComponent key={card._id} card ={card}/>
        ))}
    </div>


    </Layout>
  );
};

export default EditCards;