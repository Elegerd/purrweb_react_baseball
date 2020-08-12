export const handleTrigger = (routine) => {
  return {
    [routine.TRIGGER]: (state) => ({
      ...state,
      error: null,
    }),
  };
};

export const handleRequest = (routine) => {
  return {
    [routine.REQUEST]: (state) => ({
      ...state,
      loading: true,
    }),
  };
};

export const handleSuccess = (routine) => {
  return {
    [routine.SUCCESS]: (state, { payload }) => ({
      ...state,
      data: payload,
      error: null,
    }),
  };
};

export const handleFailure = (routine) => {
  return {
    [routine.FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  };
};

export const handleFulfill = (routine) => {
  return {
    [routine.FULFILL]: (state) => ({
      ...state,
      loading: false,
    }),
  };
};
