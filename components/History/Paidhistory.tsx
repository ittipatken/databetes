export default function Paidhistory(props: any) {
  return (
      <div className="card w-96 bg-orange-100 border-solid border-8 border-orange-600">
        <div className="card-body">
          <h2 className="font-bold text-xl underline underline-offset-4 decoration-4">ให้ {props.name}</h2>
         
          <div className="card-actions justify-end">
            <button className="btn bg-black text-white"> - {props.price} bulb
            </button>
          </div>
        </div>
      </div>
  );
}
//<p>description : {props.description}</p>