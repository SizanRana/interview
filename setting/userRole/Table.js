import {
  Badge,
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import DataTableBase from "@reusable/dataTableBase/DataTableBase";
import Avatar from "@components/avatar";
import { MoreVertical } from "react-feather";
import { useEffect, useState } from "react";
import * as Icon from "react-feather";
import TransferSingleUserRole from "./transferSingleUserRole/TransferSingleUserRole";
import UserDetailRightModal from "./userDetailRightModal/UserDetailRightModal";
import colorOptions from "./colorOption";

const Table = ({ isLoading, staffList, allRoleList, setIsDataMutated }) => {
  const [roleOptions, setRoleOptions] = useState();
  const [selectedUserData, setSelectedUserData] = useState({});
  const [openTransferRoleModal, setOpenTransferRoleModal] = useState(false);
  const [openUserDetailRightModal, setOpenUserDetailRigtMdoal] =
    useState(false);

  // Function to close transfer modal
  const closeTransferRoleModal = () => setOpenTransferRoleModal(false);

  // Function to close user detail right modal
  const closeUserDetailRightModal = () => setOpenUserDetailRigtMdoal(false);

  useEffect(() => {
    const roleOptionList = [
      {
        label: "All",
        value: "All",
      },
    ];
    allRoleList.map((roleData) => {
      roleOptionList.push({
        label: roleData.name,
        value: roleData._id,
      });
    });

    setRoleOptions(roleOptionList);
  }, [allRoleList]);

  // Function to handel row click
  const handleRowClick = (row) => {
    setSelectedUserData(row);
    setOpenUserDetailRigtMdoal(true);
  };

  // Column
  const columns = [
    {
      name: "Name",
      minWidth: "297px",
      sortable: true,
      selector: "name",
      cell: (row) => {
        return (
          <div onClick={() => handleRowClick(row)}>
            <div className="d-flex justify-content-left align-items-center">
              <Avatar
                className="mr-1"
                img={
                  row.image
                    ? row.image
                    : `https://ui-avatars.com/api/?name=${
                        row.name ? row.name : row.email
                      }%&background=abcdef`
                }
                width="32"
                height="32"
              />

              <div className="d-flex flex-column">
                <span className="font-weight-bold ms-1">
                  {row.name ? (
                    <p>{row.name}</p>
                  ) : (
                    <p className="text-uppercase">{row.email[0]}</p>
                  )}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      name: "Email",
      minWidth: "320px",
      sortable: true,
      selector: "role",
      cell: (row) => {
        return (
          <div onClick={() => handleRowClick(row)}>
            <div className="d-flex">
              {row.email}
              {row.isPending && (
                <div className="ms-1">
                  <Badge color="light-warning" pill>
                    pending
                  </Badge>
                </div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      name: "Role",
      minWidth: "320px",
      sortable: true,
      selector: "role",
      cell: (row) => {
        const IconTag = Icon[`${row.relation.icon}`];
        return (
          <div onClick={() => handleRowClick(row)} className="d-flex">
            {row.relation.icon && (
              <div>
                <IconTag
                  color={colorOptions[row.relation.icon]}
                  size={18}
                  className="me-1"
                />
              </div>
            )}

            <p>{row.relation.name}</p>
          </div>
        );
      },
    },
    {
      name: "Position",
      minWidth: "138px",
      cell: (row) => {
        return (
          <div onClick={() => handleRowClick(row)}>
            {row.employeeType ? row.employeeType : "No Position"}
          </div>
        );
      },
    },

    {
      name: "Actions",
      minWidth: "100px",
      cell: (row) => {
        return (
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu end style={{ zIndex: "1" }}>
              <DropdownItem
                onClick={() => handleRowClick(row)}
                className="w-100 d-flex"
              >
                <Icon.User size={15} style={{ marginRight: "10px" }} />
                View Details
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setSelectedUserData(row);
                  setOpenTransferRoleModal(true);
                }}
                className="w-100 d-flex"
              >
                <Icon.Repeat size={15} style={{ marginRight: "10px" }} />
                Transfer Role
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];
  return (
    <Card>
      <div className="react-dataTable roles-table">
        <DataTableBase
          columns={columns}
          data={staffList}
          // fixedHeaderScrollHeight="50vh"
          progressPending={isLoading}
          onRowClicked={handleRowClick}
        />
      </div>

      {/* Transfer Modal */}
      <TransferSingleUserRole
        state={openTransferRoleModal}
        closeTransferRoleModal={closeTransferRoleModal}
        userData={selectedUserData}
        roleOptions={roleOptions}
        setIsDataMutated={setIsDataMutated}
      />

      {/* User detail Right Modal */}
      <UserDetailRightModal
        state={openUserDetailRightModal}
        closeUserDetailRightModal={closeUserDetailRightModal}
        selectedUserData={selectedUserData}
      />
    </Card>
  );
};

export default Table;
