import EditProductModal from "../Modal/EditProductModal";

const handleClick = () => {
    // edit product
    const dialogElement = document.getElementById("edit_product_modal") as HTMLDialogElement;
    if (dialogElement) {
        dialogElement.showModal();
    }
}

export default function EditProductCard(props: any) {
    return (
        <>
            {/* quantity is still missing */}
            <EditProductModal name={props.name} description={props.description} price={props.price} quantity={props.quantity} />
            <div className="card w-80 bg-base-300 shadow-xl flex-auto m-1">
                <div className="card-body">
                    <h2 className="card-title">{props.name}</h2>
                    <p>{props.description}</p>
                    <div className="card-actions">
                        <button className="btn btn-secondary" onClick={handleClick}>แก้ไข</button>
                    </div>
                </div>
            </div>
        </>
    );
}
