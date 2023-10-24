export default function Letter() {
    return (
        <>
            <div className="place-content-center">
                <label
                    htmlFor="ชื่อสินค้า"
                    className="place-content-center  relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                    <input
                        type="text"
                        id="มีอะไร"
                        className="place-content-center peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="มีอะไร"
                    />

                    <span
                        className="place-content-center pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        ชื่อสินค้า
                    </span>
                </label>
            </div>
        </>
    )
}