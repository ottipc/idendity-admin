import React from 'react';

import {useQuery} from 'react-admin';

import { Resource,Create, Edit, DateField, ReferenceManyField, SimpleForm, ReferenceInput,ReferenceArrayField}  from 'react-admin';
import {SingleFieldList,ChipField, SelectInput, TextInput, BooleanInput,List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';
import dataProvider from './api/dataProvider';
import {RoleCreate, RoleEdit, RoleList, RoleMinimalList} from './roles';
import {RoleListBox} from './comp/rolelistbox';
import {UserRightBox} from "./comp/userrightlistbox";

// in src/posts.js
export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <BooleanInput source="activated" />
        </SimpleForm>
    </Create>
);


export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm >
            <TextInput source="name" />
            <BooleanInput source="activated" />
            <RoleListBox user_id="1"/>
            <UserRightBox/>
        </SimpleForm>
    </Edit>

);

export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" type="email" />
            <TextField source="activated" type="boolean" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <ReferenceManyField label="Roles " reference="user_role" target="user_id">
                <SingleFieldList>
                    <ReferenceField source="role_id" reference="role">
                        <ChipField source="name" />
                    </ReferenceField>
                </SingleFieldList>

            </ReferenceManyField>
            <EditButton />
        </Datagrid>
    </List>
);
