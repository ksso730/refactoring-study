// 상품 결제금액을 계산
function priceOrder(product, quantity, shippingMethod) {
    const priceData = calculatePricingData(product, quantity);
    return applyShipping(priceData, shippingMethod);
}

function applyShipping(priceData, shippingMethod) {
    const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold)?
                            shippingMethod.dicountedFee : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase;
    return priceData.basePrice - priceData.discount + shippingCost;
    return price;
}

function calculatePricingData(product, quantity) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0)
                    * product.basePrice * product.discountRate;
    return {basePrice: basePrice, quantity:quantity, discount:discount};
}