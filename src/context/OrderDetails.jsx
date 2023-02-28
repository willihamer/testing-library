import { createContext, useContext, useState } from 'react';
import { pricePerItem } from '../constants';

const OrderDetails = createContext();


//create custom Hook to check whether we're in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error("useOrderDetails must be called from within an OrderDetailsProvider");
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {

  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {}
  })

  function updateItemCount(itemName, newItemCount, optionType) {
    const newOptionCounts = { ...optionCounts };
    newOptionCounts[optionType][itemName] = newItemCount;

    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  function calculateTotal(optionType) {
    const countsArray = Object.values(optionCounts[optionType]);
    const total = countsArray.reduce((total, value) => total + value, 0);

    return total * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  }

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return (
    <OrderDetails.Provider value={value} {...props} />
  )
}