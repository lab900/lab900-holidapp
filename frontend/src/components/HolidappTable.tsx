import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";

export interface HolidappTableProps {
  headers: {
    key: string;
    header: string;
  }[];
  // todo add data rows from api
}
export default function HolidappTable(props: HolidappTableProps) {
  const mockDataRows = [
    {
      id: "a",
      requester: "Geralt of Rivia",
      from: "15/10/2023",
      to: "27/12/2023",
      status: "Approved",
      amountOfDaysTaken: "2",
    },
    {
      id: "b",
      requester: "Clark Kent",
      from: "15/10/2023",
      to: "27/12/2023",
      status: "Approved",
      amountOfDaysTaken: "6",
    },
    {
      id: "c",
      requester: "Johny Bravo",
      from: "15/10/2023",
      to: "27/12/2023",
      status: "Approved",
      amountOfDaysTaken: "1",
    },
  ];

  return (
    <DataTable rows={mockDataRows} headers={props.headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...(getHeaderProps({ header }) as any)}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
}
