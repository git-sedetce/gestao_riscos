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

const TreatmentComponent = () => {
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
                {/* <td>{treatment.types_treatmentId}</td>
                <td>{treatment.status_treatmentId}</td> */}
                <td>{getTypeNameById(treatment.types_treatmentId)}</td>
                <td>{getStatusNameById(treatment.status_treatmentId)}</td>
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

// import React, { useEffect, useState } from "react";
// import { Table } from "reactstrap";
// import riskService, { RiskType, TreatmentType } from "src/services/riskService";

// interface Props {
//   treatment: TreatmentType;
// }

// const baseUrl = `http://localhost:3000`;

// // const baseUrl = `https://api-gestaoderiscos.sedet.ce.gov.br`;

// const TreatmentComponent = ({ treatment }: Props) => {
//   const [treatments, setTreatments] = useState<TreatmentType[]>([]);
//   const [risks, setRisks] = useState<RiskType[]>([]);
//   const [typesTreatmentName, setTypesTreatmentName] = useState("");
//   const [statusTreatmentName, setStatusTreatmentName] = useState("");

//   useEffect(() => {
//     const fetchTreatments = async () => {
//       const res = await riskService.getTreatmentsAll();

//       if (res && res.data) {
//         setTreatments(res.data);
//       }
//     };
//     const fetchRisks = async () => {
//       const res = await riskService.getRisksAll();

//       if (res && res.data) {
//         setRisks(res.data);
//       }
//     };
// const fetchTypesTreatments = async () => {
//   if (treatment && treatment.types_treatmentId) {
//     const res = await fetch(
//       `${baseUrl}/typestreatments/${treatment.types_treatmentId}`
//     );
//     const data = await res.json();
//     setTypesTreatmentName(data.name);
//   }
// };

// const fetchStatusTreatments = async () => {
//   if (treatment && treatment.status_treatmentId) {
//     const res = await fetch(
//       `${baseUrl}/statustreatments/${treatment.status_treatmentId}`
//     );
//     const data = await res.json();
//     setStatusTreatmentName(data.name);
//   }
// };

//     fetchTreatments();
//     fetchRisks();
//     fetchTypesTreatments();
//     fetchStatusTreatments();
//   }, [treatment]);

//   const getRiskNameById = (id: number) => {
//     const risk = risks.find((r) => r.id === id);
//     return risk?.name || "";
//   };

//   return (
//     <Table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Riscos</th>
//           <th>Tratamentos</th>
//           <th>Tipos de Tratamentos</th>
//           <th>Status do Tratamento</th>
//         </tr>
//       </thead>
//       <tbody>
//         {treatments.map((treatment) => (
//           <tr key={treatment.id}>
//             <td>{treatment.id}</td>
//             <td>{getRiskNameById(treatment.riskId)}</td>
//             <td>{treatment.name}</td>
//             {typesTreatmentName && <td>{typesTreatmentName}</td>}
//             {statusTreatmentName && <td>{statusTreatmentName}</td>}
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// };

// export default TreatmentComponent;
