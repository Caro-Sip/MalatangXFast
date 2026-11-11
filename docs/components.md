# MalatangXFast: Component Tree

Component names, props, events, and state ownership for every screen.

Tags used below:
- **[wireframe]** documented from a finished Figma screen (simplified to the MVP scope).
- **[proposed]** no wireframe yet; a lean tree to design against.
- **[Nice to have]** built only if time allows.

## 1. Screen index

| # | Screen | Route | Who | Stories | Source |
|---|---|---|---|---|---|
| 1 | Home | `/` | everyone | entry to 5 | [wireframe] |
| 2 | Sign Up | `/signup` | guests | 4 | [wireframe] |
| 3 | Log In | `/login` | guests | 4 | [wireframe] |
| 4 | Build Your Bowl | `/builder` | customer | 1, 2, 3, 5 | [wireframe] |
| 5 | Review Pickup Order | `/review` | customer | 5 | [wireframe] |
| 6 | Order Status (incl. Declined) | `/orders/:id` | customer | 5, 7, 8 (customer view) | [wireframe] for Declined, [proposed] for other statuses |
| 7 | Staff Order Queue | `/staff/orders` | staff, admin | 6, 7, 8, 9 | [wireframe] |
| 8 | Admin Inventory | `/admin/inventory` | admin | 10 | [proposed] |
| 9 | Admin Users | `/admin/users` | admin | 11 | [proposed] |
| 10 | Error Page | `*`, `/forbidden` | everyone | n/a | [proposed] |

## 2. Conventions

- Vue 3 (`<script setup>`), Pinia, Vue Router.
- Props go down, emits go up. Child components never change shared state; they emit, and the page calls a store action.
- Derived values (line items, totals, allergen lists, tab counts, filtered lists) are `computed`, never stored.
- A page owns the loading and error state of its own requests. Stores own data shared between pages.
- The server is the source of truth: it recomputes totals, re-checks ingredient availability, enforces roles, and enforces status transitions. Client checks are for UX only.

## 3. Shared pieces

### App shell

`App.vue` renders `PageLoader` (a plain spinner) while `authStore.isInitializing` is true, then the router view. There is no branded loading screen.

### Layout

```
DefaultLayout
├── AppHeader
│   ├── BrandLogo
│   └── LoginLink (guest)  |  UserMenu (logged in)
├── SubNav (admin pages only, via slot)
├── <page>
└── AppFooter (optional)
```

| Component | Props | Emits | Local state |
|---|---|---|---|
| `DefaultLayout` | `showFooter` (default `true`) | none | none |
| `AppHeader` | `user: User \| null` | `logout` | none |
| `BrandLogo` | `to` (default `/`) | none | none |
| `UserMenu` | `user`, `items: { label, to }[]` | `logout` | `isOpen` |
| `SubNav` | `links: { label, to }[]` | none | none |
| `AppFooter` | `items: string[]` | none | none |
| `PageLoader` | `label` | none | none |

- `UserMenu` replaces the "My account" link. Items come from `menuItemsFor(role)`: customer = Current order (only when one exists) + Log out; staff = Order queue + Log out; admin = Inventory, Users, Order queue + Log out.
- `AppFooter` items are plain text, not links.

### Reusable components

| Component | Props | Emits | Local state |
|---|---|---|---|
| `BaseButton` | `label`, `variant: 'primary' \| 'secondary'`, `loading`, `disabled` | `click` | none |
| `TextField` | `modelValue`, `label`, `type`, `autocomplete`, `error?`, `disabled` | `update:modelValue`, `blur` | none |
| `InlineAlert` | `message`, `variant: 'error' \| 'info'`, `actionLabel?`, `actionTo?` | none | none |
| `QuantityStepper` | `quantity`, `min` (0), `max` (5), `disabled`, `addLabel` | `increment`, `decrement` | none |
| `OptionGroup` | `label`, `options: { id, label, price? }[]`, `modelValue` | `update:modelValue` | none |
| `OptionChip` | `label`, `price?`, `selected`, `disabled` | `click` | none |
| `AllergenLabel` | `allergens: string[]` | none | none |
| `AllergySummary` | `allergens: string[]` | none | none |
| `AllergenDisclaimer` | none | none | none |
| `BowlSummary` | `items: SummaryItem[]`, `title?` | none | none |
| `SummaryLineItem` | `label`, `quantity`, `price`, `emphasis?` | none | none |
| `TotalRow` | `label`, `amount` | none | none |
| `StatusBadge` | `status` or `label` + `tone` | none | none |
| `OrderProgress` | `steps: string[]`, `currentStep: number` | none | none |
| `BackLink` | `to`, `label` | none | none |
| `PickupInfoCard` | `locationName`, `address`, `note` | none | none |
| `TabBar` | `tabs: { key, label, count? }[]`, `modelValue` | `update:modelValue` | none |
| `SearchField` | `modelValue`, `placeholder` | `update:modelValue` | none |
| `ConfirmDialog` | `open`, `title`, `message`, `confirmLabel`, `loading` | `confirm`, `cancel` | none |

`BowlSummary` groups `SummaryItem`s into "Malatang bowl" (broth, noodles, meat, veg) and "Custom sauce", with a subtotal per group. `AllergySummary` renders "Selected allergens: wheat, soy, sesame" or "No listed allergens".

### Stores (Pinia)

| Store | Holds | Key actions |
|---|---|---|
| `authStore` | `user`, `isInitializing` | `initialize()`, `login()`, `register()`, `logout()` |
| `menuStore` | `ingredients`, `isLoading`, `loadError` | `fetch()`, `createIngredient()`, `updateIngredient()`, `setAvailability()` |
| `orderDraftStore` | `brothId`, `spiceLevel`, `quantities`, `cutlery` | `setBroth()`, `setSpice()`, `setQuantity()`, `setCutlery()`, `clear()`, `restoreFromOrder()`; getters `lineItems`, `total`, `allergens`, `canReview` |
| `ordersStore` | orders by id, `latestOrderId` | `fetchOrder(id)`, `fetchLatest()`, `submit(draft)` |
| `staffOrdersStore` | `orders`, `lastUpdatedAt`, `isRefreshing`, `refreshError`, `busyIds`, `newOrderIds` | `fetch()`, `startPolling()`, `stopPolling()`, `updateStatus()`, `decline()` |
| `usersStore` (admin) | `users`, `isLoading` | `fetch()`, `create()`, `update()`, `remove()` |

The order draft lives in memory only; a page refresh clears it. That is a known limitation of the MVP.

### Helpers

- `defaultRouteFor(role)`: customer `/builder`, staff `/staff/orders`, admin `/admin/inventory`.
- `menuItemsFor(role)`: items for `UserMenu`.
- `nextActionFor(status)`: next action for a status (table below).
- `useNow()`: one shared ticking clock for relative times ("14 min ago") and `LiveClock`.

### Order statuses

| Status | Display label | Can move to | Moved by |
|---|---|---|---|
| `pending` | Pending | `accepted`, `declined` | staff |
| `accepted` | Accepted | `preparing` | staff |
| `preparing` | Preparing | `ready` | staff |
| `ready` | Ready for pickup | `collected` | staff |
| `collected` | Collected | none | |
| `declined` | Declined | none | |

Declining requires a reason (`decline_reason`), shown to the customer. The server enforces every transition.

### Route guards

- `/login`, `/signup`: logged-in users go to `defaultRouteFor(role)`.
- `/builder`, `/review`, `/orders/:id`: customers only. Guests go to `/login`; other roles go to `/forbidden`.
- `/staff/orders`: staff and admin.
- `/admin/*`: admin only.
- Unknown route: `ErrorPage` (not found).

## 4. Screens

### Screen 1: Home [wireframe]

```
HomePage (inside DefaultLayout)
├── HeroBanner
│   ├── HeroImage
│   ├── HeroText
│   └── BaseButton ("make your own now!")
├── FeatureSection (x3: veg, meat, sauces)
│   ├── FeatureImage
│   └── FeatureCaption
└── QuoteBanner
```

| Component | Props | Emits | Local state |
|---|---|---|---|
| `HomePage` | none | none | none |
| `HeroBanner` | `title`, `tagline`, `subtext`, `imageSrc`, `imageAlt`, `ctaLabel` | `cta-click` | none |
| `FeatureSection` | `imageSrc`, `imageAlt`, `caption`, `imagePosition: 'left' \| 'right'` | none | none |
| `QuoteBanner` | `quote`, `author` | none | none |

State ownership
- Page copy (hero text, captions, quote) is static constants in `HomePage`, passed down as props.
- CTA routing is owned by `HomePage`: guest -> `/login`; customer -> `/builder`; staff -> `/staff/orders`; admin -> `/admin/inventory`.

### Screen 2: Sign Up [wireframe]

```
SignUpPage (inside DefaultLayout)
└── AuthCard ("Create Account")
    ├── SignUpForm
    │   ├── InlineAlert (server error)
    │   ├── TextField (name)
    │   ├── TextField (email)
    │   ├── TextField (phone, type "tel")
    │   ├── TextField (password, type "password")
    │   └── BaseButton ("Create Account")
    └── AuthSwitchPrompt ("Already have an account? Log in")
```

| Component | Props | Emits | Local state |
|---|---|---|---|
| `SignUpPage` | none | none | `isSubmitting`, `submitError`, `serverFieldErrors` |
| `AuthCard` | `title` (slots: default, `footer`) | none | none |
| `SignUpForm` | `loading`, `error`, `serverFieldErrors?: { email? }` | `submit({ name, email, phone, password })` | `name`, `email`, `phone`, `password`, `fieldErrors`, `touched` |
| `AuthSwitchPrompt` | `text`, `linkLabel`, `to` | none | none |

State ownership
- Session: `authStore`. Field values and client validation: `SignUpForm`. Submitting and server error: `SignUpPage`.

Behavior
- Validation: name required; email valid format; phone required; password minimum 8 characters. The server validates again and hashes the password (bcrypt or argon2).
- The client never sends a role; the server always creates a `customer`.
- Success: sign in automatically, then `router.replace(defaultRouteFor(role))`.
- "Email already registered" shows on the email field.

### Screen 3: Log In [wireframe]

```
LoginPage (inside DefaultLayout)
└── AuthCard ("Log In")
    ├── LoginForm
    │   ├── InlineAlert (server error)
    │   ├── TextField (email)
    │   ├── TextField (password, type "password")
    │   └── BaseButton ("Login")
    └── AuthSwitchPrompt ("New user? Create Account")
```

| Component | Props | Emits | Local state |
|---|---|---|---|
| `LoginPage` | none | none | `isSubmitting`, `submitError` |
| `LoginForm` | `loading`, `error` | `submit({ email, password })` | `email`, `password`, `fieldErrors`, `touched` |

State and behavior
- Same ownership as Sign Up.
- Failure shows one generic message ("Email or password is incorrect"); never say which one was wrong.
- Success: `router.replace(defaultRouteFor(role))`.
- The wireframe's "Forgot Password?" link is not rendered. An admin can set a new password from Admin Users.

### Screen 4: Build Your Bowl [wireframe]

One bowl per order.

> **Mockup vs. spec note:** The mockup shows "Bowl 1 · Sam's Bowl" and "+ Add another bowl", but the spec strictly supports one bowl per order. Multiple bowls, bowl tabs, and bowl naming are excluded from MVP to prevent scope creep.

```
BuildBowlPage (inside DefaultLayout)
├── PageIntro
│   ├── PageTitle + tagline
│   └── PickupNotice
├── BrothPanel
│   ├── OptionGroup (base / broth)
│   │   └── OptionChip (xN)
│   ├── OptionGroup (spice level)
│   │   └── OptionChip (x4)
│   └── AllergenNote
├── IngredientGrid
│   └── IngredientCard (xN)
│       ├── AllergenLabel
│       └── QuantityStepper
├── SaucePanel
│   └── SauceOption (xN)
│       ├── AllergenLabel
│       └── QuantityStepper
├── AllergenDisclaimer
└── BuildSummary
    ├── BowlSummary
    ├── AllergySummary
    ├── TotalRow
    └── BaseButton ("Review pickup order · $total")
```

| Component | Props | Emits | Local state |
|---|---|---|---|
| `BuildBowlPage` | none | none | none (reads `menuStore.isLoading` / `loadError`) |
| `PageIntro` | `title`, `tagline` | none | none |
| `PickupNotice` | `title`, `text` | none | none |
| `BrothPanel` | `broths`, `selectedBrothId`, `spiceLevels`, `selectedSpice` | `update:broth(id)`, `update:spice(level)` | none |
| `OptionGroup` | `legend`, `name`, `options: {value, label, disabled?}[]`, `modelValue` | `update:modelValue(value)` | none |
| `OptionChip` | `name`, `value`, `label`, `checked`, `disabled` | `select` | none |
| `AllergenNote` | `label`, `allergens`, `volumeLabel` | none | none |
| `IngredientGrid` | `ingredients`, `quantities: Record<id, number>` | `change-quantity(id, qty)` | none |
| `IngredientCard` | `ingredient`, `quantity` | `increment`, `decrement` | none |
| `SaucePanel` | `sauces`, `quantities` | `change-quantity(id, qty)` | none |
| `SauceOption` | `sauce`, `quantity` | `increment`, `decrement` | none |
| `AllergenLabel` | `allergens: string[]` | none | none |
| `QuantityStepper` | `quantity`, `max = 5`, `disabled = false` | `increment`, `decrement` | none |
| `TotalRow` | `label`, `amount` | none | none |
| `AllergySummary` | `allergens: string[]` | none | none |
| `BowlSummary` | `groups: SummaryGroup[]` | none | none |
| `BuildSummary` | `groups`, `total`, `allergens`, `customerName`, `spiceLevel`, `cutlery`, `canReview` | `review` | none |

State ownership

| State | Owner | Notes |
|---|---|---|
| Menu (broths, ingredients, sauces, availability) | `menuStore` | Fetched on mount; shared with Admin Inventory |
| Selected broth, spice, quantities, cutlery | `orderDraftStore` | Survives navigation to Review and back |
| Line items, total, allergen list, `canReview` | derived (`computed`) | Never stored; this is what makes Story 1 (dynamic price) work |
| Loading / load error | `menuStore` | Page shows `InlineAlert` with retry |

Behavior
- Exactly one broth (single select); one spice level (default Medium); ingredients and sauces use steppers (max 5 portions each).
- A sold-out ingredient (`isAvailable = false`) is shown but its stepper is disabled.
- Prices are per portion. Total = sum of unit price x quantity.
- Review is disabled until a broth is chosen.

### Screen 5: Review Pickup Order [wireframe, simplified]

```
ReviewOrderPage (inside DefaultLayout)
├── BackLink ("Back to bowl")
├── PageHeading
├── OrderProgress (Review -> Submit -> Staff acceptance)
├── PickupInfoCard
├── PickupDetailsCard
│   ├── ContactField (name)
│   ├── ContactField (email / phone)
│   └── cutlery checkbox
├── AllergyNotice
├── InlineAlert (submit error)
└── OrderSummaryCard
    ├── BowlSummary
    ├── TotalRow
    ├── BaseButton ("Place pickup order · $total")
    └── SubmitNote
```

| Component | Props | Emits | Local state |
|---|---|---|---|
| `ReviewOrderPage` | none | none | `isSubmitting`, `submitError` |
| `PickupDetailsCard` | `name`, `email`, `phone`, `cutlery` | `update:cutlery` | none |
| `ContactField` | `label`, `value`, `subValue?` | none | none |
| `AllergyNotice` | `allergens` | none | none |
| `OrderSummaryCard` | `items`, `total`, `loading`, `disabled` | `place-order` | none |
| `SubmitNote` | `text` | none | none |

State ownership
- Draft, cutlery: `orderDraftStore`. Pickup name, email, phone: read from `authStore.user` (not editable here).
- Totals, items, allergens: derived. Submitting and submit error: `ReviewOrderPage`.

Place-order flow
1. Click: `isSubmitting = true`; the button shows a spinner and is disabled.
2. `ordersStore.submit(draft)` with a 15 second timeout.
3. Success: draft cleared, `router.replace('/orders/:id')`.
4. Failure: keep the draft, re-enable the button, and show a banner:

| Server response | Banner |
|---|---|
| 409 `ingredient_unavailable` | "{name} is no longer available. Go back and change your bowl." (link back to builder) |
| 409 `order_already_pending` | "You already have an order waiting for staff." (link to current order) |
| other 4xx | "Check your bowl and try again." |
| timeout, network error, 5xx | "We couldn't confirm your order. Check your current order before trying again." (link to current order) |

Guards: empty draft -> `/builder`.

### Screen 6: Order Status [wireframe for Declined, proposed for the rest]

```
OrderStatusPage (inside DefaultLayout)
├── OrderProgress (hidden when declined)
├── StatusPanel
│   ├── StatusIcon
│   ├── StatusEyebrow
│   ├── StatusHeading
│   ├── StatusMessage (xN)
│   ├── NoticeBox (declined: reason from the counter)
│   ├── BaseButton ("Edit bowl", declined only)
│   ├── PaymentNote
│   └── PickupInfoCard
└── OrderReceiptCard
    ├── BowlSummary
    ├── AllergySummary
    └── TotalRow
```

| Component | Props | Emits | Local state |
|---|---|---|---|
| `OrderStatusPage` | none | none | `isLoading`, `loadError` |
| `StatusPanel` | `icon`, `eyebrow`, `heading`, `messages: string[]`, `notice?: { title, text }`, `action?: { label }`, `paymentNote` | `action` | none |
| `NoticeBox` | `title?`, `text` | none | none |
| `OrderReceiptCard` | `title`, `subtitle`, `items`, `allergens`, `totalLabel`, `total`, `footnote?` | none | none |

Content per status (kept in one `statusContent` constants map)

| Status | Eyebrow | Heading | Action |
|---|---|---|---|
| `pending` | Waiting for staff | Your order is at the counter | none |
| `accepted` | Accepted | Staff accepted your order | none |
| `preparing` | Preparing | Your bowl is being made | none |
| `ready` | Ready for pickup | Your bowl is ready | none |
| `collected` | Collected | Enjoy your malatang | none |
| `declined` | Declined · Order #id | We can't make this bowl today. | Edit bowl |

For `declined`, the receipt card total row reads "Amount payable: $0.00" and the notice shows `order.declineReason`. For all other statuses it reads "Total due at pickup". "No payment has been taken" is static text because payment is pay-at-pickup.

State ownership
- The order: `ordersStore`. Loading and load error: `OrderStatusPage`.
- Items, allergens, totals: derived from the order's items.

Behavior
- While the status is `pending`, `accepted`, `preparing`, or `ready`, the page polls the order every ~10 seconds. Polling stops on `collected`, `declined`, or leaving the page.
- Edit bowl: `orderDraftStore.restoreFromOrder(order)`, then `router.push('/builder')`. Totals recompute from the current menu; unavailable ingredients show as sold out. Editing never reopens the declined order, and submitting creates a new one.
- A customer can only open their own orders; anything else shows `ErrorPage` (not found).

### Screen 7: Staff Order Queue [wireframe, trimmed]

```
StaffQueuePage (inside DefaultLayout)
├── QueueHeader
│   └── LiveClock
├── QueueToolbar
│   ├── NewOrderBanner                  [Nice to have: Story 6]
│   ├── SearchField ("Find by order number")
│   └── RefreshControl
├── TabBar (Active, Pending, Accepted, Preparing, Ready, Collected, Declined)
├── OrderQueueTable
│   ├── OrderRow (xN)
│   │   ├── StatusBadge
│   │   └── BaseButton (next action)
│   └── QueueFooter
├── StatusFlowLegend
└── OrderDetailPanel
    ├── OrderDetailHeader
    ├── BowlSummary
    ├── AllergySummary
    ├── TotalRow ("Amount due · Pay at pickup")
    ├── DecisionBar (pending orders only)
    └── DeclineReasonForm
```

| Component | Props | Emits | Local state |
|---|---|---|---|
| `StaffQueuePage` | none | none | `activeTab`, `searchTerm`, `selectedOrderId` |
| `QueueHeader` | `title`, `subtitle` | none | none |
| `LiveClock` | none | none | none (reads `useNow`) |
| `NewOrderBanner` | `order: { id, customerName, receivedAt } \| null` | `view(orderId)`, `dismiss` | none |
| `RefreshControl` | `lastUpdatedAt`, `isRefreshing`, `error?` | `refresh` | none |
| `OrderQueueTable` | `orders`, `selectedId`, `busyIds`, `emptyMessage` | `select(orderId)`, `advance(orderId)` | none |
| `OrderRow` | `order`, `selected`, `busy` | `select`, `advance` | none |
| `QueueFooter` | `shownCount` | none | none |
| `StatusFlowLegend` | `steps: string[]` | none | none |
| `OrderDetailPanel` | `order: Order \| null`, `busy`, `error?` | `accept(orderId)`, `decline(orderId, reason)` | `isDeclining` |
| `OrderDetailHeader` | `orderId`, `status`, `customerName`, `phone`, `receivedAt`, `spiceLevel`, `cutlery` | none | none |
| `DecisionBar` | `busy` | `accept`, `decline` | none |
| `DeclineReasonForm` | `loading`, `error?` | `submit(reason)`, `cancel` | `reason`, `touched` |

Next action per status (`nextActionFor`)

| Status | Row button | Effect |
|---|---|---|
| `pending` | View receipt | Selects the row; accept or decline happens in the detail panel |
| `accepted` | Start preparing | `-> preparing` |
| `preparing` | Mark ready | `-> ready` |
| `ready` | Mark collected | `-> collected` |
| `collected`, `declined` | none | |

State ownership

| State | Owner | Notes |
|---|---|---|
| Orders, `lastUpdatedAt`, `isRefreshing`, `refreshError`, `busyIds`, `newOrderIds` | `staffOrdersStore` | The store runs the polling loop and diffs each poll to find new orders |
| `activeTab`, `searchTerm`, `selectedOrderId` | `StaffQueuePage` | |
| Visible orders (tab, search, sorted by `createdAt` oldest first) | derived in `StaffQueuePage` | Story 9 |
| Tab counts (Active = Pending + Accepted + Preparing + Ready) | derived | |
| Selected order | derived: found in the store by id | Stays fresh after each poll |
| `isDeclining` | `OrderDetailPanel` | |
| Decline reason, validation | `DeclineReasonForm` | Required; shown to the customer |
| Relative times, clock | `useNow` | One shared timer |

Behavior
- On mount: fetch and start polling every ~10 seconds; stop on unmount. Manual Refresh does the same fetch.
- Collected and Declined tabs show today's orders only.
- Row buttons call `updateStatus(orderId, nextStatus)`; the decision bar calls `updateStatus(orderId, 'accepted')` or `decline(orderId, reason)`.
- If the server returns 409 (someone else already changed the order), refresh and show "This order was already updated."
- `OrderDetailHeader` shows the customer's phone so staff can reach them.

### Screen 8: Admin Inventory [proposed]

```
AdminInventoryPage (inside DefaultLayout with SubNav)
├── InventoryToolbar
│   ├── TabBar (All, Broth, Noodle, Meat, Veg, Sauce)
│   └── BaseButton ("Add ingredient")
├── IngredientTable
│   └── IngredientRow (xN)
│       ├── AllergenLabel
│       ├── StatusBadge (Available / Disabled / Low stock)
│       └── BaseButton ("Edit")
└── IngredientFormModal
```

| Component | Props | Emits | Local state |
|---|---|---|---|
| `AdminInventoryPage` | none | none | `categoryFilter`, `formTarget` (`null` \| `'new'` \| ingredient), `isSaving`, `saveError` |
| `IngredientTable` | `ingredients`, `busyIds` | `edit(id)`, `toggle-available(id)` | none |
| `IngredientRow` | `ingredient`, `busy` | `edit`, `toggle-available` | none |
| `IngredientFormModal` | `open`, `ingredient: Ingredient \| null`, `loading`, `error?` | `save(values)`, `cancel` | `form`, `fieldErrors` |

Form fields: name, category, price per portion, portion label (e.g. "80 g"), allergens (tags), stock quantity, available.

State ownership
- Ingredients: `menuStore` (same store as the builder). Category filter, which ingredient is being edited, saving state: `AdminInventoryPage`. Form values: `IngredientFormModal`, working on a copy.

Behavior
- Create, update, restock (edit the stock number), and disable (toggle available) cover Story 10.
- No delete. Past orders reference ingredients, so items are disabled instead. A disabled item shows as sold out in the builder, and the server rejects orders that include it.
- "Low stock" is derived: stock at or below a constant threshold (e.g. 10).
- Stock is maintained by the admin; it is not decremented automatically when orders are placed.

### Screen 9: Admin Users [proposed]

```
AdminUsersPage (inside DefaultLayout with SubNav)
├── UsersToolbar
│   ├── SearchField (name or email)
│   └── BaseButton ("Add user")
├── UserTable
│   └── UserRow (xN)
│       ├── StatusBadge (role)
│       └── BaseButton ("Edit") / BaseButton ("Delete")
├── UserFormModal
└── ConfirmDialog (delete)
```

| Component | Props | Emits | Local state |
|---|---|---|---|
| `AdminUsersPage` | none | none | `searchTerm`, `formTarget` (`null` \| `'new'` \| user), `deleteTarget`, `isSaving`, `saveError` |
| `UserTable` | `users`, `currentUserId`, `busyIds` | `edit(id)`, `delete(id)` | none |
| `UserRow` | `user`, `isSelf`, `busy` | `edit`, `delete` | none |
| `UserFormModal` | `open`, `user: User \| null`, `loading`, `error?`, `serverFieldErrors?` | `save(values)`, `cancel` | `form`, `fieldErrors` |

Form fields: name, email, phone, role (customer, staff, admin), password (required when creating; optional when editing, as "Set new password").

State ownership
- Users: `usersStore`. Search, which user is being edited or deleted, saving state: `AdminUsersPage`. Form values: `UserFormModal`.

Behavior
- Admins are the only way to create staff and admin accounts, and to reset a password.
- An admin cannot delete their own account or the last remaining admin (the server enforces it; the UI also disables the button).
- Delete is a hard delete. Orders keep `pickup_name`, `pickup_email`, and `pickup_phone`, and `customer_id` becomes null, so order history survives.

### Screen 10: Error Page [proposed]

```
ErrorPage (inside DefaultLayout)
├── ErrorCode
├── ErrorTitle
├── ErrorMessage
└── BaseButton (primary action)
```

| Component | Props | Emits | Local state |
|---|---|---|---|
| `ErrorPage` | `kind: 'not-found' \| 'forbidden' \| 'generic'` | `retry` (generic only) | none |

- Title, message, and button label come from one `errorContent[kind]` constants map.
- Primary action goes to `defaultRouteFor(role)` (to `/` for guests).
- `not-found` is the catch-all route; `forbidden` is shown at `/forbidden` when a role guard fails; `generic` is for unexpected router-level errors.
- Failed data loads inside a page (menu, orders) use `InlineAlert` with a retry, not this page.

## 5. Data shapes

- `User`: `id`, `name`, `email`, `phone`, `role` (`customer` \| `staff` \| `admin`)
- `Ingredient`: `id`, `name`, `category` (`broth` \| `noodle` \| `meat` \| `veg` \| `sauce`), `price` (per portion), `portionLabel`, `allergens: string[]`, `stockQuantity`, `isAvailable`
- `Order`: `id`, `customerId` (nullable), `status`, `spiceLevel`, `cutlery`, `items: OrderItem[]`, `totalPrice`, `pickupName`, `pickupEmail`, `pickupPhone`, `declineReason?`, `createdAt`
- `OrderItem`: `id`, `orderId`, `ingredientId`, `quantity`, `unitPrice` (price at order time). The chosen broth and sauces are order items too.
- `SummaryItem`: `ingredientId`, `name`, `category`, `quantity`, `unitPrice`

Totals are computed from `unitPrice x quantity`. The client's total is display-only; the server recomputes it.

## 6. Out of scope (MVP)

- Multiple bowls per order ("Add another bowl", bowl tabs, a Bowl entity)
- Forgot Password flow (admins set passwords from Admin Users)
- Branded site loading screen (a plain spinner is used)
- Separate "Submitting", "Checking your order", and "Submission failed" screens; idempotency keys and submission lookups (the Review screen handles submit with a loading button and an inline error banner)
- Scheduled pickup times and pre-order slots (ordering remotely for next-available pickup is the core flow)
- WebSocket live updates (customer and staff views poll)
- Customer-declared allergy input, and the staff allergy conflict / on-hold workflow (allergens are shown per ingredient only)
- Edit-details modal on Review; contact details come from the account
- Payment (pay at pickup)
- Footer pages (About Us, Services, Community, Contact Us); footer items are plain text
- Password strength meter, show/hide password toggle, redirect-after-login
- Staff "Order history" page (the Collected and Declined tabs cover it)
- A separate account page (the user menu covers Current order and Log out)
- Order cancellation by the customer
- Automatic stock decrement when orders are placed

## 7. Assumptions and open decisions

1. **Story 2 (allergen tags) is built.** It is one field on `Ingredient`, and every wireframe shows it. Update the MVP scope to move it into Must Have.
2. **Story 6 (staff alert) stays Nice to have.** `NewOrderBanner` is cheap once polling exists; skip it and the rest of the queue still works.
3. **Admin screens, the non-declined Order Status states, and the Error Page have no wireframes yet.** Design them against the trees above, then update this file.
4. **Wireframes that differ from this doc and need a Figma update or a note:**
   - Sign Up shows only email and password; the build collects name, email, phone, and password.
   - Build Your Bowl: the "Bowl 1 · Sam's Bowl" label and "Add another bowl" button.
   - Login: the "Forgot Password?" link.
   - Review: "Edit bowl", "Edit details", "Change", and "No customer allergy declared".
   - Order Declined: the button reads "Edit unavailable ingredients"; here it is "Edit bowl", because staff decline reasons are free text.
   - Staff Queue: "2 bowls" in sample rows, the allergy conflict panel, the "Order history" link, and the duplicate "Last updated / Refresh".
   - The Site Loading, Checking Your Order, and Submission Failed screens are not built.
5. **Status names** follow the staff wireframe: `collected` replaces the earlier `picked_up`.
6. **Order draft is not persisted across a page refresh.**
7. **`Order.customer_id` is nullable** so deleting a user never deletes order history.
