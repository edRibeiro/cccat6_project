import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromiseConnectionAdapter implements Connection {
  pgp: any;

  constructor() {
    this.pgp = pgp()(
      "postgres://postgresUser:postgresPW@localhost:5455/cccat6"
    );
  }
  query(statement: string, params: any): Promise<any> {
    return this.pgp.query(statement, params);
  }
}
