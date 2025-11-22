"use client";

import { useEffect } from "react";
import { registerSystem } from "@/lib/systemClient";

interface AutoRegisterSubsystemProps {
  id: string;
  name: string;
  description?: string;
}

export default function AutoRegisterSubsystem({
  id,
  name,
  description,
}: AutoRegisterSubsystemProps) {
  useEffect(() => {
    // Register subsystem on mount
    registerSystem({
      id,
      name,
      status: "online",
      description: description || "",
    });
  }, [id, name, description]);

  return null; // this component renders nothing
}
