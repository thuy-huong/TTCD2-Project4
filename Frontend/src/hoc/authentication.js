import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const adminIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'adminIsAuthenticated',
    redirectPath: '/login'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
});

export const candidateIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state =>
        state.user.isLoggedIn && state.user.userInfo && state.user.userInfo.roleId === 2,
    wrapperDisplayName: 'candidateIsAuthenticated',
    redirectPath: '/home'
});

export const employerIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state =>
        state.user.isLoggedIn && state.user.userInfo && state.user.userInfo.roleId === 3,
    wrapperDisplayName: 'employerIsAuthenticated',
    redirectPath: '/home'
});