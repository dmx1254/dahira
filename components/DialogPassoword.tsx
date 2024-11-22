import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DialogPassword = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = () => {
    const passwordLower = password.toLowerCase();
    if (passwordLower === "tct1254") {
      setIsOpen(false);
    } else {
      setPasswordError("Mot de passe incorrect");
    }
  };

  const handleOpenChange = (open: boolean) => {
    // Si on essaie de fermer le dialog et que le mot de passe n'est pas correct
    // On empêche la fermeture
    if (!open && password.toLowerCase() !== "tct1254") {
      return;
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="bg-green-50 max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>11 édition de la Ziarra annuelle</DialogTitle>
          <DialogDescription>
            Veuillez saisir votre code d'accès
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="password" className="text-right">
              Code d'accès
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="code d'accès"
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3 p-4 border-gray-200 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <span className="text-sm text-red-600">{passwordError}</span>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPassword;
