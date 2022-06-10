import GetItems from "./application/GetItems";
import PgPromiseConnectionAdapter from "./infrastructure/database/PgPromiseConnectionAdapter";
import ExpressAdapter from "./infrastructure/http/ExpressAdapter";

import ItemRepositoryDatabase from "./infrastructure/repository/database/ItemRepositoryDatabase";


const http = new ExpressAdapter();

const connection = new PgPromiseConnectionAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);

http.on("get", "/items", async function (params: any, body: any) {
  const getItems = new GetItems(itemRepository);
  const output = await getItems.execute();
  return output;
});

http.listen(3000);
