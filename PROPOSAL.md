# Project: *MalatangXFast*

## Background

Malatang is a convenient street food or a shop model around the world where the customer pick the veggies, meat, and the soup base for their preferred choice with sauces on the sides. 

## Problem

A traditional malatang restaurant can be unsanitary filled with cross-contamination and life threatening allergens. It is also often plagued by a large influx of people during rush hours causing delay and congestions.

## Users and roles

- Customers: Create an account with username and password, order by selecting their soup base, ingredients and sauce, checking out and picking up there order.
- Staff: Manage the incoming orders and deciding whether to accept it or not. They should also be able to update the order status and also decline an order.
- Admin: Manage the inventory ingredients, restocking missing or low ingredients, and basic CRUDs operation on user accounts.

## User stories

### Customer Stories

1. As a customer, I want to see the price of my bowl updates dynamically as I pick my ingredients so I can know how much I'm spending before checkout.
2. As a customer, I want ingredients to be tagged with possible allergen alerts so I am aware of it.
3. As a customer, I want to be able to select from a set of options for the convenience of ordering.
4. As a customer, I want to securely log into the website with my account.
5. As a customer, I want to be able to pre-order my malatang without having to wait for a long line.

### Staff Stories

6. As a staff, I want to be alert with a receipt of the customer order.
7. As a staff, I want to be able to decline or accept customer orders.
8. As a staff, I want update customer order status.
9. As a staff, i want to be see the order of the malatang in order so that i can manage the kitchen preparation.

### Admin Stories
10. As an admin, I want to be able to create, update, stock, and disable menu items that's out of stock.
11. As an admin, I want to be able to perform CRUDs operation on user accounts.

## MVP scope

- **Must Have:**
  - Story 1, 2, 3, 4, 7, 8, 9, 10, 11
- **Nice To Have:**
  - Story 5, 6

### Which story got cut and why

- Story 5: scheduled pre-ordering is a feature that would be useful for the customer in case of long wait time or work but because pre-ordering is already apart of the flow, this should be a nice to have
- Story 6: an alert is QoL feature that doesn't necessary impair the workflow of the product

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