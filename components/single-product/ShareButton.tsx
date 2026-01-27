"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";

import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
  FacebookIcon,
} from "react-share";

export default function ShareButton({
  productId,
  name,
}: {
  productId: string;
  name: string;
}) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL + `/products/${productId}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="p-2">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={10}
        className="flex items-center gap-x-2 justify-center w-full"
      >
        <FacebookShareButton url={url} title={name}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <EmailShareButton
          url={url}
          subject={name}
          body="Check out this product: "
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
        <LinkedinShareButton
          url={url}
          title={name}
          summary="Check out this product"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </PopoverContent>
    </Popover>
  );
}
