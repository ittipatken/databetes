export default function DeatilSlug({ params }: { params: { slug: string } }) {
    const urldecode = () => {
        const decodedString = decodeURIComponent((params.slug + '').replace(/\+/g, '%20'));
        return decodedString;
    }
    const decodedString = urldecode();
    return (
        <div className="flex justify-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <p>{decodedString}</p>
                    <div className="card-actions">
                        <button className="btn btn-primary">ซื้อเลย</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
