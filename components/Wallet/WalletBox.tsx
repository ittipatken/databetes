export default function WalletBox(props: any) {
  return (
    <div className="card w-96 bg-orange-600 border-double border-8 border-black">
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>{props.amount}</p>
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
}
