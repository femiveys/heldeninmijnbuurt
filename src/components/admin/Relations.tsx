import { Table } from "antd";
import React, { useEffect } from "react";
import { ColumnProps } from "antd/es/table";
import { useApi } from "../../hooks";
import { TFullRelation, ERelationStatus, TRelation } from "../../types";

const getStatusColor = (relation: TRelation) => {
  const mapping = {
    requested: "yellow",
    accepted: "blue",
    declined: "orange",
    problem: "pink",
    cancelled: "#222",
  };

  return relation.status === ERelationStatus.handedOver
    ? relation.heroHandoverDate && relation.requestorHandoverDate
      ? "green"
      : "lime"
    : mapping[relation.status];
};

const getDate = (relation: TRelation) => {
  if (relation.heroHandoverDate) return relation.heroHandoverDate;
  if (relation.requestorHandoverDate) return relation.requestorHandoverDate;
  if (relation.cancelDate) return relation.cancelDate;
  if (relation.problemDate) return relation.problemDate;
  if (relation.acceptDate) return relation.acceptDate;
  if (relation.declineDate) return relation.acceptDate;
  if (relation.requestDate) return relation.requestDate;
};

const Relations = () => {
  const { data: fullRelations, callApi } = useApi<TFullRelation[]>(
    "GET",
    "admin/relations",
    []
  );

  useEffect(() => {
    callApi();
  }, []);

  if (!fullRelations) return null;

  const columns: ColumnProps<TFullRelation>[] = [
    {
      title: "Reqestor",
      key: "requestor",
      render: (_, { requestor }) => (
        <div>
          <div>{requestor.name}</div>
          <div>{requestor.email}</div>
        </div>
      ),
    },
    {
      title: "Date",
      key: "date",
      render: (_, { relation }) => <span>{getDate(relation)}</span>,
    },
    {
      title: "Status",
      key: "status",
      render: (_, { relation, requestor }) => (
        <span style={{ color: getStatusColor(relation) }}>
          {requestor.needsMouthmaskAmount} {relation.status}
        </span>
      ),
    },
    {
      title: "Hero",
      key: "hero",
      render: (_, { hero }) => (
        <div>
          <div>{hero.name}</div>
          <div>{hero.email}</div>
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={fullRelations.map((fullRelation) => ({
        ...fullRelation,
        key: fullRelation.relation.id,
      }))}
      columns={columns}
    />
  );
};

export default Relations;
