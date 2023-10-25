export default function ProductDisplayingCard(props: any) {
  return (
    <>
      <div className="card w-96 bg-neutral text-neutral-content m-auto flex-auto my-4">
        <div className="card-body">
          <h2 className="card-title">{props.name}</h2>
          <p>{props.description}</p>
          <div className="card-actions">
            <button className="btn btn-primary">Price: {props.price}</button>
          </div>
        </div>
      </div>
    </>
  );
}
