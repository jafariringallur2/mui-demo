import React from 'react';
import { useParams } from 'react-router-dom';

import ProductList from '../product-list';


export default function CategoryProducts() {
  const { id } = useParams();
  return (
      
      <ProductList category={id} />
  );
}
