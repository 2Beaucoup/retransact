# Address

Provides a clean and simple form to capture user addresses.

## Installation

1. Update your `models.zmodel` to include the `Address` model

   ```
   model Address {
       id          String   @id @default(uuid())

       name        String?
       line1       String?
       line2       String?
       city        String?
       region      String?
       postalCode  String?
       countryCode String?

       isDefault   Boolean  @default(false)

       userId      String   @default(auth().id)
       user        User     @relation(fields: [userId], references: [id])

       createdAt   DateTime @default(now())
       updatedAt   DateTime @updatedAt @default(now())

       @@allow('all', auth().globalRole == 'ADMIN')
       @@allow('all', userId == auth().id)
       @@allow('create', true)
   }
   ```

1. Add the `addresses` property to your `User` model:

   ```zmodel
   model User {
       ...
       addresses         Address[]
       ...
   }
   ```

## Usage

```tsx
export default function YourPage() {
  return (
    <PageLayout>
      <Typography.Title level={1}>Addresses</Typography.Title>

      <AddressClient.List />
    </PageLayout>
  )
}
```

## Customization

### Country List Order

Update the `useCountries.tsx` to define a set of countries you want to appear first in the country selection.

## Roadmap

- Support address capture for any model.
- Dynamically adapt inputs to country-specific conventions.
