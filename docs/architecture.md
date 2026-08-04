# Project architecture

This project is organized for scalability, clarity, and team collaboration.

## Frontend
- src/app: route-level files and layouts
- src/components: reusable UI building blocks
- src/features: domain-specific modules
- src/hooks: reusable React hooks
- src/providers: context providers
- src/styles: shared styling primitives

## Shared logic
- src/lib: framework and infrastructure helpers
- src/services: API client logic
- src/types: TypeScript contracts
- src/utils: small reusable helpers
- src/constants: shared values and config
- src/config: environment and app config

## Backend
- server: Express-style API services and Prisma setup
- server/routes: route definitions
- server/controllers: request handlers
- server/middleware: auth, validation, error handling
- server/prisma: database schema and client setup
