import useSWR from "swr";
import PageSpinner from "src/components/common/spinner";
import contextService, { ContextType } from "../src/services/contextService";
import styles from "../styles/context.module.scss";

const Contexts = () => {
  const { data: contextData, error: contextError } = useSWR(
    "/contexts",
    contextService.getContexts
  );

  if (contextError) return contextError;

  if (!contextData) {
    return <PageSpinner />;
  }

  return (
    <div>
      <h1>Contexts</h1>
      <div className={styles.container}>
        {contextData.data.map((context: ContextType) => (
          <div key={context.id} className={styles.context_container}>
            <div className={styles.title}>{context.name}</div>
            <div className={styles.context_details}>
              <p>Area ID: {context.areaId}</p>
              <p>Critical Process: {context.critical_process}</p>
              <p>Priority: {context.priority}</p>
              <p>User ID: {context.userId}</p>
              <p>Critical Identification: {context.critical_identification}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contexts;
