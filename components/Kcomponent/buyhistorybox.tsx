export default function Buyhistorybox (props:any) {
    return(
        <><article
            className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6"
        >
            <div>
                <p className="text-sm text-gray-500">{props.names}</p>

                <p className="text-2xl font-medium text-gray-900">{props.price}</p>
            </div>
            </article></>
    )
}