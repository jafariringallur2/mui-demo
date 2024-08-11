import React from 'react';

import Categories from '../categoreis'
import CarouselComponent from '../CarouselComponent';

import ProductList from '../product-list';


export default function AppView() {
  return (
    <div>
      <CarouselComponent />
      <Categories />
      <ProductList />
    </div>
  );
}
