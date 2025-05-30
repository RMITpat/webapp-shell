import { useState } from "react";

interface useAsyncHookResponse {
  object: calculation | null;
  loading: boolean;
  error: string | null;
  calculateShipping: (formData: {
    shippingMethod: string;
    weight: number;
    dimensions: { length: number; width: number; height: number };
    destination: string;
  }) => void;
}
interface calculation {
  shippingCost: number;
  estimatedDays: number;
  breakdown: {
    name: string;
    email: string;
  };
}
const usePostAsyncHook = (): useAsyncHookResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [object, setObject] = useState<calculation | null>(null);

  const calculateShipping = async (formData: {
    shippingMethod: string;
    weight: number;
    dimensions: { length: number; width: number; height: number };
    destination: string;
  }) => {
    if (!formData) return;

    setLoading(true);
    setError(null);

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };
      const response = await fetch(
        "https://shipping-calculator.matthayward.workers.dev/calculate/",
        requestOptions
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to calculate");
      }

      setObject(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setObject(null);
    } finally {
      setLoading(false);
    }
  };

  return { object, loading, error, calculateShipping };
};
export default usePostAsyncHook;
