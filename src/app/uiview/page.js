"use client"
import { createContext, useContext, useState } from 'react';
import Uiview from '../component/global_component';
 import Button from '../component/button';
export default function Home() {

    const handleButtonClick = () => {
        alert('Button clicked!');
      };

  return (
   <>
  {/* <Uiview /> */}


<Button
        onClick={() => alert('Right Icon Button')}
        rightIcon="icons\right.svg"
        backgroundColor="#1389F0"
        textColor="#fff"
      >
        Right Icon
      </Button>
   </>
  );
}
