import Image from 'next/image';
import sampleImage from 'public/sample-image.jpg';

export default function ImagePlacer() {
    return (
        <Image alt="Sample Image" src={sampleImage} />
    );
}