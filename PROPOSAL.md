# Project: *MalatangXFast*

## Background

Malatang is a convenient street food or a shop model around the world where the customer pick the veggies, meat, and the soup base for their preferred choice with sauces on the sides. 

## Problem

Despite the enjoyable model, these restaurant would still face service problems. For instance, there is a problem with cleanliness, cross-contamination, and life-threatening allergen due to the ingredients section opened to any customers. Another problem would be coordinating the cooks with the incoming bowls from customers and the crowded nature of a malatang kitchen. Finally, there's the fear of overspending while picking out the ingredients you'd want inside your pot just to be shocked when you finally weigh it.

## Users and roles

- Customers: Order by selecting their ingredients, pick-up or order.
- Staff: Manage the incoming orders to the cooks and delivery.
- Admin: Server management and on-standby.

## User stories

1. As a customer, I want to see the price of my bowl updates dynamically as I pick my ingredients so I can know how much I'm spending before checkout.
2. As a customer, I want to pick ingredients without having to worry about cross contaminations by other customer so I don't get an allergic reaction.
3. As a customer, I want to be able to select from a set of options for the convenience of ordering.
4. As a staff, I want to be alert with a receipt of the customer order.
5. As a staff, I want to be able to decline or accept customer orders.
6. As a customer, I want to securely log into the website with my account.
7. As a customer, I want to be able to pre-order my malatang without having to wait for a long line.
8. As a staff member, I want update customer order status.
9. As an admin, I want to be able to create, update, stock, and disable menu items that's out of stock.
10. As a staff, i want to be see the order of the malatang in order so that i can manage the kitchen preparation.

- Story 1, 10, and 6 should be the most important.

## MVP scope

- **Must have:** User authentication (register/login with roles), dynamic custom pot builder interface, full CRUD for ingredients (Admin), order submission flow (Customer), and order status management queue (Staff).
- **Nice to have:** Order history analytics view, saved "favorite pot" presets for customers, and rich promotional banner management.

## Entities

| Entity     | Main attributes                                                       | Relations                                           |
| ---------- | --------------------------------------------------------------------- | --------------------------------------------------- |
| User       | `user_id`, `name`, `email`, `password_hash`, `role`                   | Has many `Orders`                                   |
| Ingredient | `ingredient_id`, `name`, `category`, `price_per_unit`, `is_available` | Has many `OrderItems` (N-to-N via OrderItem)        |
| Order      | `order_id`, `customer_id`, `status`, `total_price`, `created_at`      | Belongs to one `User`; has many `OrderItems`        |
| OrderItem  | `order_item_id`, `order_id`, `ingredient_id`, `quantity`              | Belongs to one `Order`; belongs to one `Ingredient` |

## Stretch feature

- Real-time update using websocket 
- So the website status of the order changes for the customer without having to refresh the website.

## Repository

https://github.com/Caro-Sip/MalatangXFast