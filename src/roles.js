import React from 'react';
import {
    Create,
    DateField,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    ReferenceManyField,
    SingleFieldList,
    ChipField,
    BooleanInput
} from 'react-admin';
import {RightListBox} from "./comp/rightlistbox";

// in src/posts.js
export const RoleCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>

);
export const RoleList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="activated" type="boolean" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <ReferenceManyField label="Rights" reference="role_right" target="right_id">
                <SingleFieldList>
                    <ReferenceField source="right_id" reference="right">
                        <ChipField source="name" />
                    </ReferenceField>
                </SingleFieldList>

            </ReferenceManyField>
            <EditButton />
        </Datagrid>
    </List>
);


export const RoleEdit = props => (
    <Edit {...props}>
        <SimpleForm >
            <TextInput source="name" />
            <RightListBox role_id="1"/>
            <ReferenceManyField label="Right" reference="role_right" target="role_id">
                <SingleFieldList>
                    <ReferenceField source="right_id" reference="right">
                        <ChipField source="name" />
                    </ReferenceField>
                </SingleFieldList>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>

);

export const RoleMinimalList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
        </Datagrid>
    </List>
);

