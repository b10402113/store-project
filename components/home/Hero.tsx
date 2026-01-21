import React from "react";
import HeroCarousel from "./HeroCarousel";
import { Button } from "../ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className="mt-8  max-w-xl text-lg leading-8 text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          mollitia voluptatem voluptatum, aut ut vitae necessitatibus nihil
          iusto a nesciunt nobis. Ullam aliquid sequi vel sint autem possimus
          tempora temporibus, nihil sed eveniet quae ratione optio ipsum
          pariatur eligendi veniam nobis recusandae adipisci iusto
          necessitatibus voluptatibus cumque. Veniam, amet et?
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;
