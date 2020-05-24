import dataProvider from '../api/dataProvider';
import React from 'react';
import myDataProvider from "../api/dataProvider";

const { createContext, useContext } = React;

const ApiContext = createContext(null);

export const ApiService = (props) => {
    const value = {
    };

    return (
        <ApiService.Provider value={value}>
            {props.children}
        </ApiService.Provider>
    );
};

export const useApi = () => {
    return useContext(ApiContext);
};

const myApiService = {


    fetchRightIdsForRoles: function(roleIds) {
        return dataProvider.getManyOr('role_right', {
            role_id: roleIds
        });
    },

    /**
     * Insert a relation of RoleRight.
     *
     * @param {string} payload
     * @public
     */
    createRoleRight: function(payload) {
        dataProvider
            .create('role_right', {data: payload})
            .then(response => {
                // success side effects go here
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },
    fetchRightObjectsFOrId: function(userRightIds) {
        return dataProvider.getManyOr('right', {
            id: userRightIds
        });
    },
    fetchAllRights: function (resource, params) {
        return dataProvider.getList('right', {
            pagination: {
                page: 1,
                perPage: 20
            },
            sort: {
                field: 'name',
                order: 'ASC'
            },
            filter: {},
        });
    },

    fetchAllUserObjects : function(){
        return dataProvider.getList('user', {
            pagination: {
                page: 1,
                perPage: 20
            },
            sort: {
                field: 'name',
                order: 'ASC'
            },
            filter: {},
        })
    },

    fetchAllRoleObjects : function(){
        return dataProvider.getList('role', {
            pagination: {
                page: 1,
                perPage: 20
            },
            sort: {
                field: 'name',
                order: 'ASC'
            },
            filter: {},
        })
    },

    /**
     * Getting all Roles for a specified user.
     *
     * @param {string} userId
     * @public
     */
    fetchRoleListForUser: function(userId){
        return dataProvider.getList('user_role', {
            pagination: {
                page: 1,
                perPage: 50
            },
            sort: {
                field: 'id',
                order: 'ASC'
            },
            filter: {
                user_id: userId
            },
        });
    },
    createUserRole : function(payload){
        dataProvider
            .create('user_role', {data: payload})
            .then(response => {
                // success side effects go here
                //console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },
    deleteUserRole : function(userRoleId){
        dataProvider
            .delete('user_role', {id: userRoleId})
            .then(response => {
                // success side effects go here
                //console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
};


export default myApiService
