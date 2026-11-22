// Actions qui modifient les données : réservées aux utilisateurs connectés
const isProtectedAction = (type) =>
    typeof type === "string" && /^(ADD|UPDATE|DELETE)_/.test(type);

const loggerMiddleware = store => next => action => {

    const state = store.getState();

    // Les thunks sont déjà traités par redux-thunk (placé avant ce middleware),
    // mais on protège quand même contre une action sans "type".
    if (!action || typeof action !== "object") {
        return next(action);
    }

    if (!state.authstate.isAuthenticated && isProtectedAction(action.type)) {
        if (window.location.pathname !== "/login") {
            window.location.href = "/login";
        }
        return;
    }

    console.log("Action :", action);
    console.log("State avant :", state);

    const result = next(action);

    console.log("State après :", store.getState());

    return result;
};

export default loggerMiddleware;
