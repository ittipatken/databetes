export default function WalletBox(props: any) {
  return (
    <div className="card w-screen bg-amber-200 border-black center">
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>เงินคงเหลือ {props.amount} Blub</p>
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
}
