import React from 'react';
import StudioNavbar from '@/components/ui/StudioNavbar';

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StudioNavbar />
      {children}
    </>
  );
}
