import React, { useEffect, useState } from "react";
import {
  Box,
  H1,
  H2,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Text,
} from "@adminjs/design-system";
import { ApiClient, useCurrentAdmin } from "adminjs";

export default function Dashboard() {
  const [resources, setResources] = useState<{ [key: string]: number }>();
  const [currentAdmin] = useCurrentAdmin();
  const api = new ApiClient();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    const res = await api.getDashboard();
    setResources(res.data);
  }

  return (
    <section style={{ padding: "1.5rem" }}>
      <H1>Seja bem-vindo(a), {currentAdmin?.name}!</H1>

      <section style={{ backgroundColor: "#fafafa", padding: "1.5rem" }}>
        <H2>Resumo da Gestão de Riscos</H2>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#059669" }}>
              <TableCell style={{ color: "#fafafa" }}>Recursos</TableCell>
              <TableCell style={{ color: "#fafafa" }}>Registros</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources ? (
              Object.entries(resources).map(([resource, count]) => (
                <TableRow key={resource}>
                  <TableCell>{resource}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </section>
      {/* <Box
        mt={["x1", "x1", "-20px"]}
        mb="x1"
        mx={[0, 0, 0, "auto"]}
        px={["default", "lg", "xxl", "0"]}
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}
      >
        <Box width={[1, 1 / 2, 1 / 2]} p="lg">
          <Text>Chart 1</Text>
        </Box>
        <Box width={[1, 1 / 2, 1 / 2]} p="lg">
          <Text>Chart 2</Text>
        </Box>
      </Box> */}
    </section>
  );
}
