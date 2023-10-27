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
  data: {
    id: string;
    answeredOn: string; // timestamp
    approver: string; // email
    createdOn: string; // timestamp
    days: number; // float
    halfDays: string; // date[]
    from: string; // date
    to: string; //date
    requesterRemark: string;
    approverRemark: string;
    requester: string; //email
  }[];
}
export default function HolidappTable(props: HolidappTableProps) {
  return (
    <DataTable rows={props.data} headers={props.headers}>
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
