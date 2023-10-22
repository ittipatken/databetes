import Header from "@/components/Home/Header";
import ProductCard from "@/components/Home/ProductCard";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <Link href="/product">Products</Link>
      <ProductCard />
    </>
  );
}
