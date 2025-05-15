import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src="/404.svg"
        width={500}
        height={500}
        alt="404 Page not foound"
      />
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
