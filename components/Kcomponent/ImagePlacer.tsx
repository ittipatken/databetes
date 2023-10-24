import Image from 'next/image';
import samplepImage from 'public/sample-image.jpg';

export default function ImagePlacer() {
    return (
        <Image alt="Sample Image" src={samplepImage} />
    );
}