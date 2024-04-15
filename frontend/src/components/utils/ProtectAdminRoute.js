'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProtectAdminRoute = () => { 
  const router = useRouter();
  const { push } = useRouter();

  try {
   const user = window.localStorage.getItem('user_type') === 'user';
 
    return user;
  } catch (error) {

  }
  
};

export default ProtectAdminRoute;
