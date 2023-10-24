/*import React from "react";
import img1 from './images/imgtest.jpg';

function Addimage() {
  return (
   
    <div>
      eslint-disable-next-line @next/next/no-img-element
      <img src={img1} alt="" />
    </div>
  );
}
export default Addimage;*/

/*
import React from 'react'
import Image from 'next/image'
 
function Addimage() {
  return (
    <div>
    <Image
      src="/next/images/imgtest.jpg"
      alt=""
      width={1841}
      height={933}
    />
    </div>
  )
}
 
export default Addimage
*/
import Image from 'next/image';
import sampleImage from 'public/sample-image.jpg';

export default function ImagePlacer() {
    return (
        <Image alt="Sample Image" src={sampleImage} />
    );
}