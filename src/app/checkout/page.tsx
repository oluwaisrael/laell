import { Checkout } from "@/components/checkout";
export const metadata = {
  title: "Demo checkout",
  robots: { index: false, follow: false },
};
export default function CheckoutPage() {
  return (
    <div className="section-pad page-space">
      <header className="page-intro">
        <p className="eyebrow">Demo only</p>
        <h1>A considered selection.</h1>
      </header>
      <p className="notice">
        Preview checkout — live orders and payments are unavailable.
      </p>
      <Checkout />
    </div>
  );
}
