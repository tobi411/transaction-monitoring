'use client';
import React from 'react';

type Props = {
  value: string;
};

function Header({ value }: Props) {
  return <h2 className='text-2xl font-bold mb-2'>{value}</h2>;
}

export default Header;
