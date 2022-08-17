const si = {
  name: "",
  remarks: "",
  icon: "",
  showActivity: {
    pos: false,
    menu: false,
    inventory: false,
    account: false,
    customer: false,
    staff: false,
    table: false,
    role: false,
  },
  pos: {
    canCheckOut: false,
    order: {
      edit: false,
      view: false,
    },
  },
  menu: {
    edit: false,
    view: false,
  },
  inventory: {
    edit: false,
    view: false,
  },
  account: {
    income: {
      edit: false,
      view: false,
    },
    expense: {
      edit: false,
      view: false,
    },
    receivable: {
      edit: false,
      view: false,
    },
    payable: {
      edit: false,
      view: false,
    },
  },
  user: {
    customer: {
      edit: false,
      view: false,
    },
    staff: {
      edit: false,
      view: false,
    },
    supplier: {
      edit: false,
      view: false,
    },
  },
  department: {
    edit: false,
    view: false,
  },
  tableAndSpace: {
    edit: false,
    view: false,
  },
  restaurant: {
    editProfile: false,
    editStatus: false,
    userRole: {
      edit: false,
      view: false,
    },
  },
};

export default si;
