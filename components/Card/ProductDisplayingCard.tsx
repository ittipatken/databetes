const handleClick = () => {
  // buy product
}

export default function ProductDisplayingCard(props: any) {
  return (
    <>
      <div className="card w-80 h-52 bg-base-300 shadow-xl flex-auto m-1">
        <div className="card-body">
          <h2 className="card-title">{props.name}</h2>
          <p>{props.description}</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleClick}>Price: {props.price}</button>
          </div>
        </div>
      </div>
    </>
  );
}
