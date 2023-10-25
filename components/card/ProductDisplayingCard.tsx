export default function ProductDisplayingCard(props: any) {
  return (
    <>
      <div className="card w-96 bg-gray-300 m-2">
        <div className="card-body">
          <h2 className="card-title">{props.name}</h2>
          <p className='card-body'>{props.description}</p>
          <div className="card-actions">
            <button className="btn btn-primary">{props.price}</button>
          </div>
        </div>
      </div>
    </>
  );
}
