export const drawer = {
  state: {
    visible: false,
    drawerType: '',
    selectedKeys: [],
  },
  reducers: {
    setVisible(state, visible) {
      return { ...state, visible };
    },
    setDrawerType(state, drawerType) {
      return { ...state, drawerType };
    },
    setSelectedKeys(state, selectedKeys) {
      return { ...state, selectedKeys };
    },
  },
};
