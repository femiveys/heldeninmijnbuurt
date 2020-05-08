// Enums
export enum ERelationType {
  maskRequest = "maskRequest",
}

export enum ERelationStatus {
  requested = "requested",
  accepted = "accepted",
  declined = "declined",
  problem = "problem",
  cancelled = "cancelled",
  handedOver = "handedOver",
}

export enum EUserStatus {
  active = "active",
  cancelled = "cancelled",
  done = "done",
}

// Types
export type TUser = {
  userId: string;
  name: string;
  email: string;
  picture: string;
  streetId: number;
  isMaker: boolean;
  maskStock: number;
  numDelivered: number;
  needsMouthmask: boolean;
  needsMouthmaskAmount: number;
  stars: number;
  numEvaluations: number;
  whatsapp?: string;
  hasMaterial: boolean;
  materials?: string;
  status: EUserStatus;
  isTester: boolean;
} & Omit<TStreet, "id">;

export type TRelation = {
  id: number;
  heroId: string;
  requestorId: string;
  type: ERelationType;
  distance: number;
  status: ERelationStatus;
  requestDate: Date;
  acceptDate: Date;
  cancelDate: Date;
  declineDate: Date;
  problemDate: Date;
  requestorHandoverDate: Date;
  heroHandoverDate: Date;
  problem: string;
  requestorStars: number;
  heroStars: number;
  thanksDate: Date;
};

export type TStreet = {
  id: number;
  postalCode: number;
  streetDescNl: string;
  streetDescFr: string;
  streetDescDe: string;
};

export type TRelationUser = {
  user: TUser;
  relation: TRelation;
};

export type TRequestedRequest = Pick<TRelation, "distance" | "requestDate"> &
  Pick<TUser, "needsMouthmaskAmount" | "numEvaluations" | "stars"> & {
    relationId: number;
  };

export type SentMessageInfo = {
  accepted: string[];
  rejected: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: {
    from: string;
    to: string[];
  };
  messageId: string;
};

export type TRelationRoles = "hero" | "requestor";

export type TDistanceAndStatus = Pick<TRelation, "status" | "distance">;

export type TStats = {
  numMakers: number;
  numMasksDelivered: number;
};

export type TUserAndDistance = TUser & { distance: number };
