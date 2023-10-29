import { BanknotesIcon } from "@heroicons/react/24/solid"

export default function WalletBox(props: any) {
  return (
    <div className="card w-screen bg-amber-200 text-center m-5 max-w-4xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">{props.name} {props.lastname}</h2>
        <div className="stat">
          <div className="stat-title">เงินคงเหลือ</div>
          <div className="flex items-center justify-center">
          <BanknotesIcon className="h-8 mr-3"/>
          <div className="stat-value">{props.amount} Blub</div>
          </div>
        </div>
      </div>
    </div>
  );
}
