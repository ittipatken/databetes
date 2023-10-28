export default function DeatilSlug({ params }: { params: { slug: string } }) {
    const urldecode = () => {
        const decodedString = decodeURIComponent((params.slug + '').replace(/\+/g, '%20'));
        return decodedString;
    }
    const decodedString = urldecode();
    return <div>My Post: {decodedString}</div>;
}
