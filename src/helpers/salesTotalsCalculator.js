import salesItemCalculator from "./salesItemCalculator";

const salesTotalsCalculator = (salesItems) => {
  const totals = {
    numberSold: 0,
    numberGifted: 0,
    numberPaypal: 0,
    totalRevenue: 0,
    paypalCommission: 0,
    netRevenue: 0,
    chrisShare: 0,
    julieShare: 0,
    fatcatShare: 0
  };

  salesItems.forEach(salesItem => {
    const item = salesItemCalculator(salesItem);
    totals.numberSold += item.numberSold;
    totals.numberGifted += item.numberGifted;
    totals.numberPaypal += item.numberPaypal;
    totals.totalRevenue += item.totalRevenue;
    totals.paypalCommission += item.paypalCommission;
    totals.netRevenue += item.netRevenue;
    totals.chrisShare += item.chrisShare;
    totals.julieShare += item.julieShare;
    totals.fatcatShare += item.fatcatShare;
  })

  return totals;
}

export default salesTotalsCalculator;