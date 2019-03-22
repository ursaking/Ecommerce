import React from 'react';
import {
    Create,
    Edit,
    EmailField,
    UrlField,
    List,
    Datagrid,
    TextField,
    ReferenceManyField,
    EditButton,
    SelectInput,
    LongTextInput,
    DisabledInput,
    SimpleForm,
    ReferenceInput,
    TextInput } from 'react-admin';

export const ProductList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="label" />
            <TextField source="sublabel" />
            <TextField source="brand" />
            <TextField source="type" />
            <TextField source="ref" />
            <TextField source="dispo" />
            <TextField source="price" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ProductEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="label" />
            <LongTextInput source="sublabel" />
            <TextInput source="brand" />
            <TextInput source="average_market" />
            <TextInput source="data_anico" />
            <TextInput source="brand" />
            <TextInput source="type" />
            <TextInput source="ref" />
            <TextInput source="dispo" />
            <TextInput source="price" />
            <LongTextInput source="img60X60" />
            <LongTextInput source="img200X200" />
            <LongTextInput source="img500X500" />
            <LongTextInput source="url_product" />
            <ReferenceManyField label="address" reference="address">
                <Datagrid>
                    <TextField source="country" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);

export const ProductCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="label" />
            <TextInput source="sublabel" />
            <TextInput source="brand" />
            <TextInput source="type" />
            <TextInput source="ref" />
            <TextInput source="dispo" />
            <TextInput source="price" />
        </SimpleForm>
    </Create>
);