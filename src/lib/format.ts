
export const formatPrice = (price: number):string => {  
  return price.toLocaleString("en-US", {style: 'currency', currency: 'USD'});
}