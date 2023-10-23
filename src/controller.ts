import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { config } from "./config";
import { Model } from "./model";

export class Controller {
  private model: Model;

  constructor() {
    this.model = new Model();
  }

  async connect() {
    await this.model.connect(config.dbname);
  }

  async rootPost(req: Request, res: Response) {
    await this.connect();

    const result = validationResult(req);

    if (result.isEmpty()) {
      const { url, userurl } = matchedData(req);

      try {
        let shorturl;

        //NOTE: thin controller. Maybe b logic unnecessary here
        if (userurl) {
          shorturl = await this.model.addShortUrl(url, userurl);
        } else {
          shorturl = await this.model.addGenShortUrl(url);
        }

        if (shorturl === null) {
          res
            .status(400)
            .json({ errors: `shorturl: ${userurl} already occupied.` });
        } else {
          res.status(200).json({ shorturl: shorturl });
        }
      } catch (e) {
        res.status(500).json({ errors: (e as Error).message });
      }
    } else {
      res.status(400).json({ errors: result.array() });
    }
  }

  async rootGet(req: Request, res: Response) {
    await this.connect();

    const result = validationResult(req);
    if (result.isEmpty()) {
      const { shorturl } = matchedData(req);

      try {
        const url = await this.model.getUrlByShortname(shorturl);

        if (url) {
          res.redirect(301, url);
        } else {
          res
            .status(400)
            .json({ errors: `shorturl: ${shorturl} does not exist.` });
        }
      } catch (e) {
        res.status(500).json({ errors: (e as Error).message });
      }
    } else {
      res.status(400).json({ errors: result.array() });
    }
  }
}
