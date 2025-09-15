import { Edit, SimpleForm, TextInput, NumberInput, BooleanInput, SelectInput } from "react-admin";

export const ShopProductsEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" multiline rows={3} />
      <NumberInput source="price" />
      <SelectInput 
        source="category" 
        choices={[
          { id: "digital", name: "Digital" },
          { id: "merchandise", name: "Merchandise" },
          { id: "gaming", name: "Gaming" },
          { id: "premium", name: "Premium" }
        ]}
      />
      <SelectInput 
        source="type" 
        choices={[
          { id: "digital", name: "Digital" },
          { id: "physical", name: "Physical" }
        ]}
      />
      <TextInput source="image" />
      <NumberInput source="stock" />
      <BooleanInput source="available" />
      
      {/* Physical Product Fields */}
      <TextInput source="shipping" />
      <TextInput source="sizes" />
      <TextInput source="colors" />
      <TextInput source="capacity" />
      <TextInput source="material" />
      
      {/* Tech Product Fields (AirPods, etc.) */}
      <TextInput source="batteryLife" />
      <TextInput source="features" />
      <TextInput source="compatibility" />
    </SimpleForm>
  </Edit>
); 