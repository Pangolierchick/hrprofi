import { randomUUID } from "node:crypto";
import { Database, open } from "sqlite";
import sqlite from "sqlite3";
import { getRandomString } from "./random";

export class Model {
  private db: Database | undefined;

  async connect(dbName: string) {
    if (dbName === "" || dbName === undefined) {
      throw Error("Provide valid database path.");
    }
    if (this.db === undefined) {
      this.db = await open({
        filename: dbName,
        driver: sqlite.Database,
      });

      await this.createDB();
    }
  }

  async disconnect() {
    if (this.db) {
      await this.db.close();
    }
  }

  async createDB() {
    if (this.db === undefined) {
      throw Error("Call connect firstly.");
    }

    await this.db.exec(`
      create table if not exists urls(
          id text primary key,
          shorturl text,
          url text
      );
    `);
  }

  async addShortUrl(url: string, shorturl: string) {
    if (this.db === undefined) {
      throw Error("Call connect firstly");
    }

    const short = await this.getUrlByShortname(shorturl);

    if (short === undefined) {
      const id = randomUUID();

      try {
        const query = await this.db.prepare(
          "insert into urls (id, shorturl, url) values (?, ?, ?)"
        );
        await query.run(id, shorturl, url);

        return shorturl;
      } catch (e) {
        throw Error("Error while adding url.");
      }
    } else {
      return null;
    }
  }

  async addGenShortUrl(url: string) {
    if (this.db === undefined) {
      throw Error("Call connect firstly.");
    }

    const shorturl = getRandomString(); //FIXME: collisions
    const id = randomUUID();

    try {
      const query = await this.db.prepare(
        "insert into urls (id, shorturl, url) values (?, ?, ?)"
      );
      await query.run(id, shorturl, url);

      return shorturl;
    } catch (e) {
      throw Error("Error while adding url.");
    }
  }

  async getUrlByShortname(shorturl: string) {
    if (this.db === undefined) {
      throw Error("Call connect firstly.");
    }

    try {
      const query = await this.db.prepare(
        "select url from urls where shorturl = ?"
      );
      const res = await query.get(shorturl);

      if (res) {
        return res.url;
      }

      return res; // undefined
    } catch (e) {
      console.log((e as Error).message);
      throw Error("Error while getting url.");
    }
  }
}
