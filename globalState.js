let userId = null;

export const setGlobalUserId = (id) => {
    userId = id;
};

export const getGlobalUserId = () => userId;
