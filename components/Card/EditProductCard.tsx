import EditProductModal from "../Modal/EditProductModal";

export default function EditProductCard(props: any) {
    const handleClick = () => {
        // edit product
        const dialogElement = document.getElementById("model_" + props.id) as HTMLDialogElement;
        if (dialogElement) {
            dialogElement.showModal();
        }
    }
    return (
        <>
            {/* quantity is still missing */}
            <EditProductModal id={props.id} name={props.name} description={props.description} price={props.price} quantity={props.quantity} />
            <div className="card w-80 h-52 bg-base-300 shadow-xl flex-auto m-1">
                <div className="card-body">
                    <h2 className="card-title">{props.name}</h2>
                    <p>{props.description}</p>
                    <div className="card-actions">
                        <button className="btn btn-secondary text-lg" onClick={handleClick}>แก้ไข</button>
                    </div>
                </div>
            </div>
        </>
    );
}
