export default function ProductDisplayingCard(props: any) {
  return (
    <>
      <div className="card w-80 bg-base-200 shadow-xl flex-auto m-1">
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
