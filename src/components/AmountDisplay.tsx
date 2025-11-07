import { formatCurrency } from "../helpers";

type AmountDisplayPropost = {
    label:string
    amount:number
}

export default function AmountDisplay({ label, amount }: AmountDisplayPropost) {
  return (
    <p className=" text-2xl text-blue-600 font-bold">
        {label}: {''}
        <span className=" font-black text-black">{formatCurrency(amount)}</span>

    </p>
  );
}

