import { List, Datagrid, TextField, NumberField, BooleanField, DateField, EditButton, DeleteButton } from "react-admin";

export const ShopProductsList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="description" />
      <NumberField source="price" />
      <TextField source="category" />
      <TextField source="type" />
      <NumberField source="stock" />
      <BooleanField source="available" />
      <TextField source="shipping" />
      <TextField source="sizes" />
      <TextField source="colors" />
      <TextField source="capacity" />
      <TextField source="material" />
      <TextField source="batteryLife" />
      <TextField source="features" />
      <TextField source="compatibility" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
); 
