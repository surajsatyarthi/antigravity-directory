"use client";

import { Button } from "@/components/ui/button";

export default function SentryDebugPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Sentry Debugger</h1>
      <p>Click the button below to crash the app and test Sentry reporting.</p>
      
      <Button
        variant="destructive"
        onClick={() => {
          throw new Error("Sentry Test Error: This is a deliberate crash!");
        }}
      >
        Throw Test Error
      </Button>
    </div>
  );
}
