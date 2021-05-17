import { SiteModel } from './site';
import { HivePostModel } from "./hive-post";

export interface HiveModel {
  number: number,
  creator: string,
  posts: HivePostModel[],
  site: SiteModel,
  _id: string
}
