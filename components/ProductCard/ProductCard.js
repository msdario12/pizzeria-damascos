import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function ProductCard() {
  return (
    <Card className="pt-3">
      <CardContent className="flex items-center justify-between gap-x-5">
        <div className="flex flex-col gap-x-5 justify-between items-center ">
          <Image src="/images/pizza1.jpg" width={200} height={200} />

          <div className="flex gap-x-4  items-center mt-5">
            <Button>-</Button>
            <span className="font-bold">3</span>
            <Button>+</Button>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-2xl">Tomate</h2>
          <p className="text-sm my-2">
            Larget | Anchovies, Fresh tomatos, Basil & green herbs.
          </p>
          <span className="text-3xl font-bold">$57</span>
        </div>
      </CardContent>
    </Card>
  );
}
