import { ERelationType, ERelationStatus } from "../types";

export type TUserFromDb = {
  __name: string;
  __email: string;
  user_id: string;
  street_id: number;
  is_maker: number;
  mask_stock: number;
  num_delivered: number;
  needs_mouthmask: number;
  needs_mouthmask_amount: number;
  stars: number;
  num_evaluations: number;
  whatsapp?: string;
  has_material: number;
  materials?: string;
};

export type TRelationFromDb = {
  id: number;
  hero_id: string;
  requestor_id: string;
  type: ERelationType;
  distance: number;
  status: ERelationStatus;
  request_date: Date;
  requestor_Handover_date: Date;
  heroHandover_date: Date;
  requestor_stars: number;
  hero_stars: number;
};

export type TStreetFromDb = {
  id: number;
  postal_code: number;
  street_desc_nl?: string;
  street_desc_fr?: string;
  street_desc_de?: string;
};

export type TShortStreetFromDb = Pick<
  TStreetFromDb,
  "id" | "street_desc_nl" | "street_desc_fr" | "street_desc_de"
>;

export type TPostalCodeFromDb = Pick<TStreetFromDb, "postal_code">;