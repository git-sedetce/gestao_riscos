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

const TableTreatment = () => {
  const [treatments, setTreatments] = useState<TreatmentType[]>([]);
  const [risks, setRisks] = useState<RiskType[]>([]);
  const [types_treatments, setTypesTreatments] = useState<TypesTreatmentType[]>(
    []
  );
  const [status_treatments, setStatusTreatments] = useState<
    StatusTreatmentType[]
  >([]);
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
          } else if (sortConfig.key === "start_date") {
            const dateA = new Date(a.start_date);
            const dateB = new Date(b.start_date);
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
    const fetchTypesTreatments = async () => {
      const res = await listService.getTypesTreatments();

      if (res && res.data) {
        setTypesTreatments(res.data);
      }
    };
    const fetchStatusTreatments = async () => {
      const res = await listService.getStatusTreatments();

      if (res && res.data) {
        setStatusTreatments(res.data);
      }
    };

    fetchTreatments();
    fetchRisks();
    fetchTypesTreatments();
    fetchStatusTreatments();
  }, [sortConfig]);

  const getRiskNameById = (id: number) => {
    const risk = risks.find((r) => r.id === id);
    return risk?.name || "";
  };

  const getTypeNameById = (id: number) => {
    const types_treatment = types_treatments.find((r) => r.id === id);
    return types_treatment?.name || "";
  };

  const getStatusNameById = (id: number) => {
    const status_treatment = status_treatments.find((r) => r.id === id);
    return status_treatment?.name || "";
  };

  function formatStartDate(start_date: string) {
    const date = new Date(start_date);
    return date.toLocaleDateString();
  }

  function formatEndDate(end_date: string) {
    const date = new Date(end_date);
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

  return (
    <>
      <div className={styles.table}>
        <Table
          responsive
          bordered
          className="noWrap"
          style={{ color: "black", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Tratamentos {getSortIcon("name")}
              </th>
              <th onClick={() => handleSort("riskId")}>
                Riscos {getSortIcon("riskId")}
              </th>
              <th> Responsáveis da medida</th>
              <th onClick={() => handleSort("types_treatmentId")}>
                Tipos de tratamento {getSortIcon("types_treatmentId")}
              </th>
              <th onClick={() => handleSort("status_treatmentId")}>
                Status de tratamento {getSortIcon("status_treatmentId")}
              </th>
              <th onClick={() => handleSort("start_date")}>
                Data de Início {getSortIcon("start_date")}
              </th>
              <th onClick={() => handleSort("end_date")}>
                Data de término {getSortIcon("end_date")}
              </th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            {sortedTreatments.map((treatment) => (
              <tr key={treatment.id}>
                {/* <td>{treatment.id}</td> */}
                <td>{treatment.name}</td>
                <Link
                  href={`/risks/${treatment.riskId}`}
                  className={styles.link}
                >
                  <td>{getRiskNameById(treatment.riskId)}</td>
                </Link>
                <td>{treatment.user}</td>
                <td>{treatment.types_treatmentId}</td>
                <td>{treatment.status_treatmentId}</td>
                <td>{getTypeNameById(treatment.types_treatmentId)}</td>
                <td>{getStatusNameById(treatment.status_treatmentId)}</td>
                <td>{formatStartDate(treatment.start_date)}</td>
                <td>{formatEndDate(treatment.end_date)}</td>
                <td>{treatment.notes}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TableTreatment;
