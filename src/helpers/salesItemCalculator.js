const salesItemCalculator = (salesItem) => {
  const item = {};

  item.name = salesItem.product.name;

  item.numberSold = salesItem.openingStock - salesItem.closingStock - salesItem.numberFreebies;

  item.numberGifted = salesItem.numberFreebies;

  item.numberPaypal = salesItem.numberPaypalSales;

  item.totalRevenue = item.numberSold * salesItem.product.price;

  item.paypalCommission = salesItem.numberPaypalSales * (salesItem.product.price * 0.0275);
  
  item.netRevenue = item.totalRevenue - item.paypalCommission;

  item.fatcatShare = item.numberSold * salesItem.product.fatCatShare;

  item.chrisShare = (item.netRevenue - item.fatcatShare) * (salesItem.product.chrisPercentage / 100);

  item.julieShare = (item.netRevenue - item.fatcatShare) * (salesItem.product.juliePercentage / 100);
  
  return item;
}

export default salesItemCalculator;