import React from 'react';
import { Create, Edit, SimpleForm, ReferenceInput, SelectInput, TextInput, BooleanInput,List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';

// in src/posts.js
export const  RightCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);
export const RightEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

