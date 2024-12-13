# Form

This plugin enhances [Ant Design Forms](https://ant.design/components/form/) to simplify their integration into your app. It offers two approaches:

1. **`FormClient.useForModel`**: Optimized for managing Prisma models with built-in CRUD operations.
2. **`FormClient.use`**: A flexible version where you define the logic.

---

## FormClient.useForModel

Use this when working with a Prisma model. It handles CRUD operations out of the box.

### Example: Managing a `User` Model

1. Import the Hook

   ```tsx
   import { FormClient } from '~/plugins/form/client'

   const { FormView, CreateButton, UpdateButton, DeleteButton } =
     FormClient.useForModel({
       modelName: 'user',
       onSuccess: values => {
         // Handle successful form submission
       },
       onDelete: () => {
         // Handle delete success
       },
     })
   ```

2. Add the FormView Component

   Renders a modal form for your inputs—no extra layout handling required.

   ```tsx
   <FormView>
     <Form.Item
       label="Name"
       name="name"
       rules={[{ required: true, message: 'Name is required' }]}
     >
       <Input placeholder="Enter your name" />
     </Form.Item>
   </FormView>
   ```

3. Create New Users with CreateButton

   Optionally, set default values for the form.

   ```tsx
   <CreateButton valuesDefault={{ name: 'Default Name' }} />
   ```

4. Update Existing Users with UpdateButton

   Fetches user data based on the where condition.

   ```tsx
   <UpdateButton where={{ id: user.id }} />
   ```

5. Delete Users with DeleteButton

   Deletes user data based on the where condition.

   ```tsx
   <DeleteButton where={{ id: user.id }} />
   ```

## FormClient.use

Use this for full control over form logic.

### Example: Custom Form Logic

1. Import the Hook

   ```tsx
   import { FormClient } from '~/plugins/form/client'

   const { FormView, CreateButton, UpdateButton, DeleteButton } =
     FormClient.use({
       onSubmit: values => {
         // Handle form submission logic
       },
       onDelete: values => {
         // Handle deletion logic
       },
     })
   ```

2. Add the FormView Component

   ```tsx
   <FormView>
     <Form.Item
       label="Name"
       name="name"
       rules={[{ required: true, message: 'Name is required' }]}
     >
       <Input placeholder="Enter your name" />
     </Form.Item>
   </FormView>
   ```

3. Create New Entries with CreateButton

   Optionally, set default values for the form.

   ```tsx
   <CreateButton valuesDefault={{ name: 'Default Name' }} />
   ```

4. Update Entries with UpdateButton

   Pass the values directly to the component.

   ```tsx
   <UpdateButton values={values} />
   ```

5. Delete Entries with DeleteButton

   ```tsx
   <DeleteButton values={values} />
   ```
