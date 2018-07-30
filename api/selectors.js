export const createLoadingSelector = actions => state => {
  console.log("createLoadingSelector", actions);
  return actions.some(action => state.loading[action]);
};

export const createErrorMessageSelector = actions => state => {
  console.log("createErrorMessageSelector", actions);
  const errors = actions.map(action => state.error[action]);
  if (errors && errors[0]) {
    return errors[0];
  }
  return ``;
};
