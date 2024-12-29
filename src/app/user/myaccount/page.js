"use client"
import '../mylayout.css'
import './page.css'
import { createContext, useContext, useState } from 'react';
import AccountSettings from '../../component/AccountSettings.jsx'
import Link from 'next/link';

export default function page() {

 
  return (
    <>
<AccountSettings/>
  </>
  );
}

