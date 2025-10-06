import { FeePaymentForm } from "../FeePaymentForm";

export default function FeePaymentFormExample() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <FeePaymentForm
        onSubmit={(data) => console.log("Payment recorded:", data)}
        onCancel={() => console.log("Payment cancelled")}
      />
    </div>
  );
}
