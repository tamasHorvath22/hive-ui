import { SiteModel } from './site';
import { HiveModel } from "./hive";
export interface ApiaryModel {
  collaborators: string[];
  hives: HiveModel[];
  name: string;
  owner: string;
  sites: SiteModel[],
  _id: string
}
