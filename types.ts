// Enums
export enum ERelationType {
  maksRequest = "maksRequest",
}

export enum ERelationStatus {
  requested = "requested",
  pending = "pending",
  delivered = "delivered",
  declined = "declined",
}

// Types
export type TUser = {
  userId: string;
  streetId: number;
  isMaker: boolean;
  maskStock: number;
  numDelivered: number;
  needsMouthmask: boolean;
  needsMouthmaskAmount?: number;
  stars: number;
  numEvaluations: number;
  whatsapp?: string;
  hasMaterial: boolean;
  materials?: string;
};

export type TRelation = {
  id: number;
  heroId: string;
  requestorId: string;
  type: ERelationType;
  distance: number;
  status: ERelationStatus;
  requestDate: Date;
  requestorHandoverDate: Date;
  heroHandoverDate: Date;
  requestorStars: number;
  heroStars: number;
};

export type TStreet = {
  id: number;
  postalCode: number;
  streetDescNl?: string;
  streetDescFr?: string;
  streetDescDe?: string;
};
