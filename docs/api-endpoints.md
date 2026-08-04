# REST API Endpoints

The API is served under the `/api` base path.

## Authentication

Protected endpoints require an `Authorization: Bearer <token>` header. Admin login is available at `/api/admin/login`.

## Services

- `GET /api/services`
  - Returns all services.
  - Response: `{ success: true, data: [...] }`

- `GET /api/services/:slug`
  - Returns one service by slug/id.
  - Response: `{ success: true, data: {...} }`

- `POST /api/services`
  - Creates a new service.
  - Required body fields: `id`, `title`, `description`, `icon`, `features`
  - Requires authentication.

- `PUT /api/services/:slug`
  - Updates an existing service.
  - Requires authentication.

- `DELETE /api/services/:slug`
  - Deletes a service by slug/id.
  - Requires authentication.

## Portfolio

- `GET /api/portfolio`
  - Returns all portfolio items.

- `GET /api/portfolio/:slug`
  - Returns one portfolio item by slug/id.

- `POST /api/portfolio`
  - Creates a new portfolio item.
  - Required body fields: `id`, `title`, `category`, `description`, `image`, `link`, `metrics`
  - Requires authentication.

- `PUT /api/portfolio/:slug`
  - Updates an existing portfolio item.
  - Requires authentication.

- `DELETE /api/portfolio/:slug`
  - Deletes a portfolio item.
  - Requires authentication.

## Blog

- `GET /api/blog`
  - Returns all blog posts sorted by newest first.

- `GET /api/blog/:id`
  - Returns one blog post by ID.

- `POST /api/blog`
  - Creates a new blog post.
  - Required body fields: `title`, `excerpt`, `content`, `category`, `readTime`
  - Requires authentication.

- `PUT /api/blog/:id`
  - Updates an existing blog post.
  - Requires authentication.

- `DELETE /api/blog/:id`
  - Deletes a blog post by ID.
  - Requires authentication.

## Contact

- `GET /api/contact`
  - Returns all submitted contact messages.
  - Requires authentication.

- `GET /api/contact/:id`
  - Returns one contact message by ID.
  - Requires authentication.

- `POST /api/contact`
  - Submits a new contact form message.
  - Required body fields: `name`, `email`, `message`
  - Public endpoint.

- `PUT /api/contact/:id`
  - Updates a contact message.
  - Requires authentication.

- `DELETE /api/contact/:id`
  - Deletes a contact message.
  - Requires authentication.
