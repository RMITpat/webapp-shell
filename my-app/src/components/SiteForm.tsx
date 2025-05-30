import usePostAsyncHook from "@/pages/api/postApi";
import { Button, Title, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function SiteForm() {
  const { object, loading, error, calculateShipping } = usePostAsyncHook();

  interface ShippingDetails {
    shippingMethod: string;
    weight: number;
    dimensions: { length: number; width: number; height: number };
    destination: string;
  }
  const [formData, setFormData] = useState<ShippingDetails>({
    shippingMethod: "",
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 },
    destination: "",
  });
  // const [profileDetails, setDetails] = useState<PersonDetails>({
  //   name: "",
  //   email: "",
  //   age: "",
  // });
  const [errors, setErrors] = useState<{
    shippingMethod?: string;
    weight?: string;
    length?: string;
    width?: string;
    height?: string;
    destination?: string;
  }>({});
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");

    if (formValidation()) {
      calculateShipping(formData);
    }
  };

  const formValidation = () => {
    const errors: {
      shippingMethod?: string;
      weight?: string;
      length?: string;
      width?: string;
      height?: string;
      destination?: string;
    } = {};
    let valid = true;
    if (
      !(
        formData.shippingMethod == "Standard" ||
        formData.shippingMethod == "Express" ||
        formData.shippingMethod == "Overnight"
      )
    ) {
      errors.shippingMethod =
        "Shipping method must be Standard, Express or Overnight";
      valid = false;
    }
    if (formData.shippingMethod == "Standard") {
      if (formData.weight <= 0.1 || formData.weight >= 20) {
        errors.weight =
          "Weight must be greater than or equal to 0.1 and less than or equal to 20";
      }
    } else if (formData.shippingMethod == "Express") {
      if (formData.weight <= 0.1 || formData.weight >= 10) {
        errors.weight =
          "Weight must be greater than or equal to 0.1 and less than or equal to 10";
      }
    } else if (formData.shippingMethod == "Overnight") {
      if (formData.weight <= 0.1 || formData.weight >= 5) {
        errors.weight =
          "Weight must be greater than or equal to 0.1 and less than or equal to 5";
      }
    } else {
      errors.weight = "Invalid shipping method";
    }

    if (formData.dimensions.length <= 0) {
      errors.length = "Length must be a positive number";
    }
    if (formData.dimensions.width <= 0) {
      errors.width = "Width must be a positive number";
    }
    if (formData.dimensions.height <= 0) {
      errors.height = "Height must be a positive number";
    }
    if (
      !(
        formData.destination == "Local" ||
        formData.destination == "Domestic" ||
        formData.destination == "International"
      )
    ) {
      errors.destination =
        "Shipping method must be Local, Domestic or International";
      valid = false;
    }
    setErrors(errors);
    return valid;
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        {JSON.stringify(object)}
        <div className="box1">
          <Title order={3}>Input shipping method</Title>
          <input
            name="shippingMethod"
            data-testid="shipping-input"
            required
            type="text"
            value={formData.shippingMethod}
            onChange={(e) =>
              setFormData({ ...formData, shippingMethod: e.target.value })
            }
            placeholder="Enter your shipping method"
          ></input>
          <Text>{errors.shippingMethod}</Text>
          <Title order={3}>Input weight of package</Title>
          <input
            name="weight"
            data-testid="shipping-input"
            required
            type="number"
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: Number(e.target.value) })
            }
            placeholder="Enter your weight"
          ></input>
          <Text>{errors.weight}</Text>
        </div>
        <div className="box2">
          <Title order={2}>Input dimensions</Title>
          <Title order={3}>Input height</Title>
          <input
            name="dimensions"
            data-testid="dimension-input"
            required
            type="number"
            value={formData.dimensions.height}
            onChange={(e) =>
              setFormData({
                ...formData,
                dimensions: {
                  ...formData.dimensions,
                  height: Number(e.target.value),
                },
              })
            }
            placeholder="Enter your package height"
          ></input>
          <Text>{errors.height}</Text>

          <Title order={3}>Input length</Title>
          <input
            name="dimensions"
            data-testid="dimension-input"
            required
            type="number"
            value={formData.dimensions.length}
            onChange={(e) =>
              setFormData({
                ...formData,
                dimensions: {
                  ...formData.dimensions,
                  length: Number(e.target.value),
                },
              })
            }
            placeholder="Enter your package length"
          ></input>
          <Text>{errors.length}</Text>

          <Title order={3}>Input width</Title>
          <input
            name="dimensions"
            data-testid="dimension-input"
            required
            type="number"
            value={formData.dimensions.width}
            onChange={(e) =>
              setFormData({
                ...formData,
                dimensions: {
                  ...formData.dimensions,
                  width: Number(e.target.value),
                },
              })
            }
            placeholder="Enter your package width"
          ></input>
          <Text>{errors.width}</Text>

          <Title order={3}>Enter your destination</Title>
          <input
            name="destinationZone"
            data-testid="shipping-input"
            required
            type="text"
            value={formData.destination}
            onChange={(e) =>
              setFormData({ ...formData, destination: e.target.value })
            }
            placeholder="Enter your destination"
          ></input>
          <Text>{errors.destination}</Text>
        </div>
      </div>
      <Button w="100%" type="submit">
        Calculate
      </Button>
    </form>
  );
}
