type QueryType = 'profitable' | 'oftenBought' | 'oftenBoughtYesterday';

export const getQuery = (limit: number, type: QueryType) => {
  switch (type) {
    case 'profitable':
      return getTopProfitableProductsQuery(limit);
    case 'oftenBought':
      return getTopMostOftenBoughtProductsQuery(limit);
    case 'oftenBoughtYesterday':
      return getTopMostOftenBoughtProductsQueryFromYesterday(limit);
  }
};

const getTopProfitableProductsQuery = (limit: number) => `
SELECT item."externalId", item.name, SUM(order_row.quantity * item.price) AS "sum"
FROM order_row
INNER JOIN item ON item.id = order_row."itemId"
GROUP BY item.id
ORDER BY "sum" DESC
LIMIT ${limit}
`;

const getTopMostOftenBoughtProductsQuery = (limit: number) => `
SELECT item."externalId", item.name, COUNT(order_row.id) AS "count"
FROM order_row
INNER JOIN item ON item.id = order_row."itemId"
GROUP BY item.id
ORDER BY "count" DESC
LIMIT ${limit}
`;

const getTopMostOftenBoughtProductsQueryFromYesterday = (limit: number) => `
SELECT item.id, COUNT(order_row.id) AS "count"
FROM order_row
INNER JOIN "order" ON "order".id = order_row."orderId"
INNER JOIN item ON item.id = order_row."itemId"
WHERE "order".date >= (current_date - INTEGER '1')
GROUP BY item.id
ORDER BY "count" DESC
LIMIT ${limit}
`;
