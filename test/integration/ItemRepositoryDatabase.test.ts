import PgPromiseConnectionAdapter from "../../src/infrastructure/database/PgPromiseConnectionAdapter";
import ItemRepositoryDatabase from "../../src/infrastructure/repository/database/ItemRepositoryDatabase";


test("Deve retornar itens do banco de dados", async function (){
    const connection = new PgPromiseConnectionAdapter();
    const ItemRepository = new ItemRepositoryDatabase(connection);
    const items = await ItemRepository.list();
    expect(items).toHaveLength(3);
});