"use client";

import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";

export function useChatKeyboardShortcuts(
  sendMessage: () => void,
  focusInput: () => void
) {
  // Keyboard shortcuts have been disabled
  return;
}
