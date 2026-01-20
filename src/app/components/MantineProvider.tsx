"use client";

import { MantineProvider } from "@mantine/core";
import { ReactNode } from "react";

const MantineProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider forceColorScheme="light">
      {children}
    </MantineProvider>
  );
};

export default MantineProviderWrapper;
