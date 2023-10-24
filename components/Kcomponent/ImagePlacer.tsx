import Image from 'next/image';
import samplepImage from 'public/sample-image.jpg';

export default function ImagePlacer() {
    return (
        <div>
            <div className='z-[0] '>
                <Image
                    alt=" "
                    src={samplepImage}
                    placeholder="blur"
                    quality={100}
                    fill

                    sizes="100vw"
                    style={{
                        objectFit: 'cover',
                    }}
                />
            </div>
            <p>
                Image Component
                <br />
                as a Background
            </p>
        </div>
    )
}
