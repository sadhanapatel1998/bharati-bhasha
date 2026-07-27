'use client';

import React from 'react';
import { IndiaMapInteractive } from '../shared/IndiaMapInteractive';

export const MapSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <IndiaMapInteractive />
    </section>
  );
};