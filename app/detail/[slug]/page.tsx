"use client";

import { useRouter } from "next/navigation";

export default function DeatilSlug({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const urldecode = () => {
        const decodedString = decodeURIComponent((params.slug + '').replace(/\+/g, '%20'));
        return decodedString;
    }
    const decodedString = urldecode();

    const handleClick = () => {
        router.replace('/');
    }
    return (
        <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-screen">
            <p className="text-5xl py-6">{decodedString}</p> 
            <button className="btn btn-primary px-10" onClick={handleClick}>ซื้อเลย</button>
          </div>
        </div>
      </div>
    );
}
