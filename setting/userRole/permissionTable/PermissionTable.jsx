import React from "react";
import {
  Badge,
  Card,
  CardHeader,
  // DropdownToggle,
  Input,
  Label,
  // UncontrolledDropdown,
} from "reactstrap";
import DataTableBase from "@reusable/dataTableBase/DataTableBase";
import permissionColorOptions from "../permissionColorOptions";
// import { MoreVertical } from "react-feather";

const columns = [
  {
    name: "S.N",
    maxWidth: "5px",
    cell: (row, i) => {
      return <div>{i + 1}</div>;
    },
  },
  {
    name: "PERMISSION",
    minWidth: "100px",
    cell: (row) => {
      return (
        <div>
          <p>{row.module}</p>
        </div>
      );
    },
  },
  {
    name: "ROLE",
    minWidth: "800px",
    cell: (row) => {
      return (
        <div className="py-1">
          {row.allowedRoles.map((roles) => {
            return (
              <Badge
                color={permissionColorOptions[roles.icon]}
                pill
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                  marginTop: "8px",
                  backgroundColorL: "red",
                }}
              >
                {roles.name}
              </Badge>
            );
          })}
        </div>
      );
    },
  },

  // {
  //   name: "Actions",
  //   minWidth: "100px",
  //   right: true,
  //   cell: () => {
  //     return (
  //       <div>
  //         <UncontrolledDropdown>
  //           <DropdownToggle tag="div" className="btn btn-sm">
  //             <MoreVertical size={14} className="cursor-pointer" />
  //           </DropdownToggle>
  //         </UncontrolledDropdown>
  //       </div>
  //     );
  //   },
  // },
];

const PermissionTable = ({ permissionList, isDataPending }) => {
  return (
    <Card>
      <div>
        <DataTableBase
          columns={columns}
          data={permissionList}
          progressPending={isDataPending}
        />
      </div>
    </Card>
  );
};

export default PermissionTable;
