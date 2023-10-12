import {Sponsor} from "./sponsor";

export interface Response {
  data: Sponsor[],
  current_page: string,
  per_page: string,
  total: string,
}
