"use client";

// simple coded with chatGPT
// Important Note: Using ChatGPT to generate the whole page will absolutely cause problems.

import Head from "next/head";
import { useState } from "react";

const Transfer = () => {
    const [amount, setAmount] = useState("");
    const [receiverEmail, setReceiverEmail] = useState("");
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/transaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    receiver: receiverEmail,
                    amount: parseInt(amount),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setStatus(data.status);
        } catch (error: any) {
            setStatus("An error occurred: " + error.message);
        }
    };

    return (
        <div>
            <Head>
                <title>Transaction</title>
            </Head>
            <main>
                <h1>Send Money</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Amount:
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Receiver Email:
                        <input
                            type="email"
                            value={receiverEmail}
                            onChange={(e) => setReceiverEmail(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit">Send</button>
                    {status && <p>{status}</p>}
                </form>
            </main>
        </div>
    );
};

export default Transfer;