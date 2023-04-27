import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Table } from "reactstrap";
import listService, {
  StatusTreatmentType,
  TypesTreatmentType,
} from "../../../../src/services/listService";
import riskService, {
  RiskType,
  TreatmentType,
} from ".././../../../src/services/riskService";
import CreateTreatment from "src/components/homeAuth/createTreatment";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Link from "next/link";

const baseUrl = `http://localhost:3000`;

const TreatmentComponent = () => {
  const [treatments, setTreatments] = useState<TreatmentType[]>([]);
  const [risks, setRisks] = useState<RiskType[]>([]);
  const [types, setTypes] = useState<TypesTreatmentType[]>([]);
  const [statuses, setStatuses] = useState<StatusTreatmentType[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "",
    direction: "",
  });
  const [sortedTreatments, setSortedTreatments] = useState<TreatmentType[]>([]);

  useEffect(() => {
    const fetchTreatments = async () => {
      const res = await riskService.getTreatmentsAll();

      if (res && res.data) {
        const sortedData = [...res.data].sort((a, b) => {
          if (sortConfig.key === "riskId") {
            const riskNameA = getRiskNameById(a.riskId);
            const riskNameB = getRiskNameById(b.riskId);
            if (riskNameA < riskNameB) {
              return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (riskNameA > riskNameB) {
              return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
          } else if (sortConfig.key === "deadline") {
            const dateA = new Date(a.deadline);
            const dateB = new Date(b.deadline);
            if (dateA < dateB) {
              return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (dateA > dateB) {
              return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
          } else {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
          }
        });
        setSortedTreatments(sortedData);
        setTreatments(res.data);
      }
    };
    const fetchRisks = async () => {
      const res = await riskService.getRisksAll();

      if (res && res.data) {
        setRisks(res.data);
      }
    };
    const fetchData = async () => {
      const treatmentResponse = await fetch(`${baseUrl}/treatments`);
      const treatments = await treatmentResponse.json();
      setTreatments(treatments);

      const typesResponse = await fetch(`${baseUrl}/typestreatments`);
      const types = await typesResponse.json();
      setTypes(types);

      const statusesResponse = await fetch(`${baseUrl}/statustreatments`);
      const statuses = await statusesResponse.json();
      setStatuses(statuses);
    };

    fetchTreatments();
    fetchRisks();
    fetchData();
  }, [sortConfig]);

  const getRiskNameById = (id: number) => {
    const risk = risks.find((r) => r.id === id);
    return risk?.name || "";
  };

  function formatDeadline(deadline: string) {
    const date = new Date(deadline);
    return date.toLocaleDateString();
  }

  const handleSort = (key: string) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...treatments].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setTreatments(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <FaSort />;
    } else if (sortConfig.direction === "ascending") {
      return <FaSortUp />;
    } else {
      return <FaSortDown />;
    }
  };

  const getTypeName = (typeId: number) => {
    const type = types.find((type) => type.id === typeId);
    return type ? type.name : "";
  };

  const getStatusName = (statusId: number) => {
    const status = statuses.find((status) => status.id === statusId);
    return status ? status.name : "";
  };

  return (
    <>
      <CreateTreatment riskId={0} />
      <div className={styles.table}>
        <Table
          responsive
          bordered
          className="noWrap"
          style={{ color: "black", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>ID {getSortIcon("id")}</th>
              <th onClick={() => handleSort("riskId")}>
                Riscos {getSortIcon("riskId")}
              </th>
              <th onClick={() => handleSort("name")}>
                Tratamentos {getSortIcon("name")}
              </th>
              <th>Tipos de Tratamento</th>
              <th>Status de Tratamento</th>
              <th onClick={() => handleSort("deadline")}>
                Prazo {getSortIcon("deadline")}
              </th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            {sortedTreatments.map((treatment) => (
              <tr key={treatment.id}>
                <td>{treatment.id}</td>
                <Link
                  href={`risks/${treatment.riskId}`}
                  className={styles.link}
                >
                  <td>{getRiskNameById(treatment.riskId)}</td>
                </Link>
                <td>{treatment.name}</td>
                <td>{getTypeName(treatment.types_treatmentId)}</td>
                <td>{getStatusName(treatment.status_treatmentId)}</td>
                <td>{formatDeadline(treatment.deadline)}</td>
                <td>{treatment.notes}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TreatmentComponent;
