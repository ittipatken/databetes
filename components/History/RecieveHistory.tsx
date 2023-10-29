export default function Recievehistory(props: any) {
    return (
        <div className="card w-96 bg-green-200 border-solid border-8 border-green-600">
          <div className="card-body">
            <h2 className="font-bold text-xl underline underline-offset-4 decoration-4">จาก {props.name}</h2>

            <div className="card-actions justify-end">
              <button className="btn text-black bg-white"> + {props.price} bulb
              </button>
            </div>
          </div>
        </div>
    );
  }
 // <p>description : {props.description}</p> 