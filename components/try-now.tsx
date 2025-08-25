"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import HtmlRunner from "@/components/html-runner";

type Props = {
  initialHtml: string;
};

export function TryNow({ initialHtml }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          Try Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogTitle>Try it now</DialogTitle>
        <HtmlRunner initialHtml={initialHtml} />
      </DialogContent>
    </Dialog>
  );
} 