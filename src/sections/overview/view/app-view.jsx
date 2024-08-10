import React from 'react';

import Categories from '../categoreis'
import CarouselComponent from '../CarouselComponent';

export default function AppView() {
  return (
    <div>
      <CarouselComponent />
      <Categories />
    </div>
  );
}
