"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send, Info } from "lucide-react";

export function AskAIDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          <Bot className="h-5 w-5" />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed z-50 border border-border bg-card shadow-2xl outline-none flex flex-col
                  bottom-0 right-0 w-full h-[85vh] rounded-t-2xl
                  sm:bottom-20 sm:right-5 sm:w-[380px] sm:h-auto sm:max-h-[520px] sm:rounded-2xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                  <Dialog.Title className="text-[14px] font-semibold flex items-center gap-2 text-foreground">
                    <Bot className="h-4 w-4 text-primary" />
                    AI Assistant
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="rounded-full p-1.5 hover:bg-muted transition-colors outline-none cursor-pointer">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </Dialog.Close>
                </div>
                
                {/* Chat Area */}
                <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                  {/* AI Disclaimer — REQ17 (inline, compact) */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted/40 rounded-md">
                    <Info className="w-3 h-3 text-muted-foreground shrink-0" />
                    <p className="text-[9px] leading-snug text-muted-foreground">
                      <span className="font-medium">AI-generated</span> · Verify with primary sources
                    </p>
                  </div>

                  {/* Welcome Message */}
                  <Dialog.Description asChild>
                    <div className="flex gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div className="bg-muted/40 border border-border rounded-xl rounded-tl-sm px-3 py-2.5 text-[13px] leading-relaxed text-foreground">
                        Hello! I have indexed <strong>1,240</strong> documents on Dr-RES. Ask me anything about the evidence — I&apos;ll ground my answers with citations.
                      </div>
                    </div>
                  </Dialog.Description>
                </div>

                {/* Input */}
                <div className="px-4 pb-4 pt-2 shrink-0 border-t border-border/50">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask a question..."
                      className="w-full bg-muted/50 border border-border rounded-xl pl-3.5 pr-10 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all text-foreground placeholder:text-muted-foreground/50"
                    />
                    <button className="absolute right-1.5 top-1.5 h-7 w-7 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
