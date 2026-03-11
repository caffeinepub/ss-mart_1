# SS Mart

## Current State
Admin can add products via a password-protected dialog. Products have name, price, category, and optional badge. Admin mode is toggled via a lock icon in the footer.

## Requested Changes (Diff)

### Add
- Edit (alter) product dialog: pre-fills existing product fields, allows admin to update name, price, category, badge, and save changes.
- Delete product: admin sees a delete button on each product card; clicking prompts a confirmation before removing the product.

### Modify
- Product cards: when admin is logged in, show Edit and Delete action buttons on each card.
- App state: add handleEditProduct and handleDeleteProduct handlers.

### Remove
- Nothing removed.

## Implementation Plan
1. Add `EditProductDialog` component (same fields as Add, pre-populated, saves via `onEdit` callback).
2. Add `editProductOpen` state and `selectedProduct` state to track which product is being edited.
3. Add `handleEditProduct(updated: Product, index: number)` to replace product in list.
4. Add `handleDeleteProduct(index: number)` with inline confirmation (AlertDialog) to remove product.
5. On each product card (when `isAdmin`), render Edit button (pencil icon) and Delete button (trash icon).
6. Wire dialogs and handlers in App.
