"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart, FaHeart, FaEdit } from "react-icons/fa";
import { LuTrash2, LuPentagon } from "react-icons/lu";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};
function SubmitButton({
  className = "",
  text = "submit",
  size = "default",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn("capitalize", className)}
      size={size}
      disabled={pending}
      type="submit"
    >
      {pending ? (
        <>
          <ReloadIcon className="animate-spin mr-2 h-4 w-4" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

type actionType = "edit" | "delete";

export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();
  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <FaEdit />;
      case "delete":
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Unhandled action type: ${never}`);
    }
  };

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? <ReloadIcon className="animate-spin h-4 w-4" /> : renderIcon()}
    </Button>
  );
};

export default SubmitButton;

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="p-2 cursor-pointer"
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <ReloadIcon className="animate-spin h-4 w-4" />
      ) : isFavorite ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};
