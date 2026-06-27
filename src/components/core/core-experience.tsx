"use client";

import { CoreProvider } from "@/components/core/core-context";
import { CoreNavigator } from "@/components/core/core-navigator";
import { CoreSpine } from "@/components/core/core-spine";

export function CoreExperience({ children }: { children: React.ReactNode }) {
  return (
    <CoreProvider>
      <CoreSpine />
      <CoreNavigator />
      {children}
    </CoreProvider>
  );
}
