"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send, AlertTriangle } from "lucide-react";

export function AskAIDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          <Bot className="h-6 w-6" />
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
                className="fixed bottom-24 right-6 z-50 w-full max-w-[400px] flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-2xl outline-none"
              >
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <Dialog.Title className="text-lg font-semibold flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    Repository AI Assistant
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="rounded-full p-2 hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      <X className="h-4 w-4" />
                    </button>
                  </Dialog.Close>
                </div>
                
                <Dialog.Description className="text-sm text-muted-foreground">
                  Ask me questions about any rapid evidence in the repository. My answers will be strictly grounded with citations.
                </Dialog.Description>

                <div className="flex-1 min-h-[300px] my-2 p-4 rounded-xl bg-muted/30 overflow-y-auto flex flex-col gap-4">
                  {/* Mock Chat Message */}
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-card border border-border rounded-lg rounded-tl-none p-3 text-sm shadow-sm">
                      <p>Hello! I have indexed 1,240 documents on Dr-RES. How can I help inform your policy work today?</p>
                    </div>
                  </div>
                </div>

                {/* AI Disclaimer — REQ17 */}
                <div className="flex items-start gap-2 px-3 py-2.5 bg-primary/5 rounded-lg border border-primary/15">
                  <AlertTriangle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">AI-generated content.</span> Responses are synthesized from indexed evidence and may not be exhaustive. Always verify with primary sources.
                  </p>
                </div>

                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="Ask a question..."
                    className="w-full bg-muted border border-border rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button className="absolute right-2 top-2 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    <Send className="h-4 w-4 ml-0.5" />
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
