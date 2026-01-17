# Technicians Portal – Agent Guide

This file acts as a **system prompt** for any AI coding agent working in this repository. It explains how the project is structured and how to add or modify features under `features/` while staying consistent with the existing clean architecture.

### System Instructions for Agents

- You are a Senior Frontend Developer working on the Technicians Portal codebase.
- Always follow the architecture and rules in this document when generating or editing code.
- Prefer extending existing patterns over introducing new libraries or structures.
- When implementing a new feature, follow the steps in section "3. How to Add a New Feature Under `features/`" and the checklist in section "6. Quick Checklist for Adding a New Feature".

---

## 1. Tech Stack & Structure (Short Overview)

- Framework: **Next.js 16** (App Router, `app/` directory).
- Language: **TypeScript**.
- Styling:
  - **Tailwind CSS** (via `app/globals.css`, Tailwind v4-style imports).
  - **shadcn/ui** components in `components/ui/` built on Radix UI.
  - **Dark/light theme** with `next-themes` via `components/theme-provider.tsx`.
- State management:
  - **Redux Toolkit** store in `core/store/index.ts`.
  - Typed hooks in `core/store/hooks.ts`:
    - `useAppSelector`
    - `useAppDispatch`
  - Redux `Provider` in `components/providers.tsx`.
- HTTP / API:
  - `core/api/axios-instance.ts` with:
    - `baseURL` from `NEXT_PUBLIC_API_URL` (fallback `"https://api.example.com"`).
    - Request interceptor that adds `Authorization: Bearer <token>` from `localStorage`.
    - Response interceptor that clears auth and redirects to `/login` on `401`.

**Routing & layouts:**

- Root layout: `app/layout.tsx`
  - Sets up global styles, fonts, theme provider, Redux provider, analytics.
- Auth segment: `app/(auth)/...`
  - `login/page.tsx`
  - `register/page.tsx`
- Dashboard segment: `app/(dashboard)/layout.tsx` + `app/(dashboard)/dashboard/...`
  - `page.tsx`, `customers/page.tsx`, `services/page.tsx`, `users/page.tsx`, `sms/page.tsx`,
    `credits/page.tsx`, `broadcast/page.tsx`.
  - Layout wraps content with `DashboardSidebar` and `DashboardHeader` and seeds mock data.

---

## 2. Architecture Pattern: Feature-Based Clean Architecture

Each feature lives in `features/<feature-name>/` with the structure:

- `domain/` – **pure business logic**
  - `entities/` – domain models.
  - `enums/` – domain-specific enums.
  - `repositories/` – interfaces that describe what operations are possible.
  - `usecases/` – use cases that orchestrate business flows using repositories.

- `data/` – **infrastructure & integration**
  - `datasources/` – low-level IO (HTTP via Axios, etc.).
  - `dto/` – API-layer data shapes (what the backend sends/receives).
  - `mappers/` – convert between DTOs and domain entities.
  - `repositories/` – repository implementations that satisfy domain interfaces.

- `presentation/` – **UI & state for the feature**
  - `slice.ts` – Redux slice + async thunks using usecases & repository impls.
  - `components/` – React components/hooks that connect UI to the feature slice.
  - These components are composed in the App Router pages under `app/`.

**Global code:**

- `core/`:
  - `core/api/axios-instance.ts`
  - `core/store/index.ts`
  - `core/store/hooks.ts`
- `components/`:
  - `components/dashboard/*` – layout pieces.
  - `components/ui/*` – shadcn primitives (Button, Card, Dialog, etc.).
  - `components/providers.tsx` – Redux provider wrapper.
  - `components/theme-provider.tsx` – theme provider.
- `lib/utils.ts` – helpers like `cn`.

---

## 3. How to Add a New Feature Under `features/`

Assume the new feature is called `appointments` (replace this with your real feature name).

### 3.1 Create the Feature Folder

Create the folder:

- `features/appointments/`

Inside it, create three subfolders:

- `features/appointments/domain/`
- `features/appointments/data/`
- `features/appointments/presentation/`

When creating those subfolders don't add files inside until prompt say so.

Maintain the existing pattern used by `auth`, `customers`, `services`, `sms`, `users`.

If that feature already exist do nothing.


---

### 3.2 Domain Layer (Business Logic)

Create the domain structure: 
Create the domain stucture until you get the prompt to create the stucture.

- `features/appointments/domain/entities/appointment.ts`
- Optional: `features/appointments/domain/enums/appointment-status.ts`
- `features/appointments/domain/repositories/appointment-repository.ts`
- `features/appointments/domain/usecases/` (one file per use case).

**Example entity (shape, not exact code):**

- `domain/entities/appointment.ts`
  - Fields such as `id`, `customerId`, `technicianId`, `scheduledAt`, `status`, etc.
  - No React imports. No browser APIs. Only TypeScript types and logic.

**Repository interface:**

- `domain/repositories/appointment-repository.ts`
  - Define methods like:
    - `getAll()`
    - `getById(id)`
    - `create(data)`
    - `update(id, data)`
    - `cancel(id)`
  - Keep this **completely UI-agnostic** and do not import Axios here.

**Usecases:**

- Example files:
  - `domain/usecases/create-appointment-usecase.ts`
  - `domain/usecases/update-appointment-status-usecase.ts`
  - `domain/usecases/cancel-appointment-usecase.ts`
- Each use case:
  - Receives a repository interface in the constructor.
  - Exposes one `execute()` method that handles the business logic.

**Rules:**

- Do not access `window`, `localStorage`, or `axios` in the domain layer.
- Do not import React in domain files.

---

### 3.3 Data Layer (API, DTOs)

Create the data structure:

-- `features/appointments/data/datasources/appointment-datasource.ts`
-- `features/appointments/data/dto/appointment-dto.ts`
-- `features/appointments/data/mappers/appointment-mapper.ts`
-- `features/appointments/data/repositories/appointment-repository-impl.ts`

**Datasource:**

- `appointment-datasource.ts`:
  - Import `axiosInstance` from `core/api/axios-instance.ts`.
  - Implement low-level API calls only (e.g. `getAll`, `getById`, `create`, `update`, etc.).
  - Use DTO types to represent what the API returns/expects.
  - No Redux imports here.

**DTO & Mapper:**

- DTO(s) in `dto/appointment-dto.ts`:
  - Mirror API response/request shapes (snake_case, etc.).
- Mapper in `mappers/appointment-mapper.ts`:
  - Provide methods like:
    - `toEntity(dto: AppointmentDto): Appointment`
    - `toDto(entity: Appointment): AppointmentDto`
  - Handle any field name conversions (e.g. `customer_id` → `customerId`).

**Repository implementation:**

- `appointment-repository-impl.ts`:
  - Implements `IAppointmentRepository` from the domain layer.
  - Uses `AppointmentDatasource` and `AppointmentMapper`.
  - Provides domain entities to callers:
    - Example: in `create()`:
      - Call datasource.
      - Map DTO → domain entity.
      - Return domain entity.

**Redux slice:**

- `presentation/slice.ts`:
  - Import `{ createSlice, createAsyncThunk }` from `@reduxjs/toolkit`.
  - Import types from `domain/entities/appointment.ts` and repository/usecases.
  - Import the repository implementation from `data/repositories/appointment-repository-impl`.
  - Instantiate repository + usecases at the top of the file.
  - Define `initialState` with:
    - `items: Appointment[]`
    - `selectedAppointment: Appointment | null`
    - `isLoading: boolean`
    - `error: string | null`
    - Any other fields (filters, pagination, etc.).
  - Add async thunks, e.g.:
    - `fetchAppointments`
    - `createAppointment`
    - `updateAppointment`
    - `cancelAppointment`
  - Use `try/catch`, call usecases, and `rejectWithValue` for errors.
  - Define reducer actions for local-only state changes (e.g. `setSelectedAppointment`, `clearError`).
  - Optionally add `setMockAppointments` for demo data, following patterns in `services` and `customers`.

**Rules for slice:**

- No direct `axios` calls in UI components; they must go through thunks.
- Use domain types in state (`Appointment`), not DTO types.
- Keep all network & IO inside thunks/datasource.

---

### 3.4 Wire the Feature into the Store

Open `core/store/index.ts` and:

1. Import your new reducer:
   - `import appointmentsReducer from "@/features/appointments/presentation/slice"`
2. Add it to the `reducer` object in `configureStore`:
   - `appointments: appointmentsReducer`
3. The `RootState` type will automatically include `appointments`.

**Usage:**

- Read from state:
  - `const { items, isLoading, error } = useAppSelector((state) => state.appointments)`
- Dispatch actions:
  - `const dispatch = useAppDispatch()`
  - `dispatch(fetchAppointments())`, etc.

**Rules:**

- Always use `useAppSelector` and `useAppDispatch` from `core/store/hooks.ts`.
- Do not import `useSelector` / `useDispatch` directly from `react-redux` in components.

---

### 3.5 Presentation Layer (UI Components)

Create UI under:

- `features/appointments/presentation/components/`

Example components:

- `appointments-table.tsx`
- `create-appointment-dialog.tsx`
- `appointment-details-dialog.tsx`

**Patterns to follow:**

- Client components must start with `"use client"` at the top.
- For forms and dialogs, follow patterns in:
  - `features/customers/presentation/components/create-customer-dialog.tsx`
  - `features/services/presentation/components/create-service-dialog.tsx`
- Use shadcn/ui primitives from `components/ui/`:
  - `Button`, `Input`, `Label`, `Card`, `Dialog`, `Table`, etc.
- Use `useAppSelector` / `useAppDispatch`:
  - Select data from `state.appointments`.
  - Dispatch thunks for operations.

**Rules:**

- Keep data fetching/side-effects minimal in components:
  - Call thunks like `fetchAppointments()` inside `useEffect` hooks or event handlers.
  - Let the slice manage `isLoading` and `error` states.

---

### 3.6 Add Routing for the New Feature

To expose the new feature in the dashboard:

1. Create a route file under dashboard:
   - `app/(dashboard)/dashboard/appointments/page.tsx`
2. Mark as client component:
   - Add `"use client"` at the top.
3. Use the feature’s presentation components:
   - Import `useAppSelector`, `useAppDispatch`.
   - Import your components from `features/appointments/presentation/components/*`.

**Example structure (conceptual):**

- Header:
  - Title (e.g. “Appointments”), description.
- Controls:
  - Search/filter input using `Input`.
  - Button to open `CreateAppointmentDialog`.
- Content:
  - Table of appointments using `Table` from `components/ui/table`.
  - Action menu per row (edit, cancel, etc.).

**Rules for routing:**

- All dashboard pages live under `app/(dashboard)/dashboard/...`.
- Use existing layout structure: no need to set up sidebar/header again; `app/(dashboard)/layout.tsx` already does that.

---

## 4. Auth & Mock Data Considerations

The current project uses **mock/demo data** in dashboard:

- `app/(dashboard)/layout.tsx`:
  - Seeds a mock admin user if not authenticated.
  - Calls:
    - `setMockServices()`
    - `setMockCustomers()`
    - `setMockSmsData()`
    - `setMockUsers()`

If you add a new feature and want it included in the demo:

- Create an action like `setMockAppointments` in the new `appointments` slice.
- Import and dispatch it from `app/(dashboard)/layout.tsx`, alongside other `setMock*` actions.

For a more realistic/production-oriented setup:

- Remove or gate the mock seeding.
- Instead dispatch real `fetch*` thunks in the layout or in each page’s `useEffect`.

---

## 5. General Rules for Any Agent Working Here

- Preserve the **domain/data/presentation** structure for every feature.
- Keep **domain** pure (no React, no Axios, no browser APIs).
- Keep **HTTP and IO** in `data/datasources` using `axiosInstance`.
- Keep **Redux logic** in `presentation/slice.ts` using `createSlice` and `createAsyncThunk`.
- Use **typed hooks** `useAppSelector` / `useAppDispatch` from `core/store/hooks.ts`.
- Add new slices to `core/store/index.ts` and use them via `state.<featureName>`.
- Use `components/ui/*` and existing Tailwind + shadcn styling patterns for UI.
- Use icons from `lucide-react`, consistent with existing components.
- Respect the App Router structure:
  - Public/auth routes in `(auth)` group.
  - Dashboard routes in `(dashboard)` group.

---

## 6. Quick Checklist for Adding a New Feature

1. Create `features/<feature>/domain/` with:
   - entities, enums, repository interfaces, usecases.
2. Create `features/<feature>/data/` with:
   - datasources using `axiosInstance`.
   - DTOs + mappers.
   - repository implementation.
   - `slice.ts` with thunks and reducers.
3. Wire slice into `core/store/index.ts`.
4. Create `features/<feature>/presentation/components/` with UI components.
5. Add a page under `app/(dashboard)/dashboard/<feature>/page.tsx` using those components.
6. Use `useAppSelector` / `useAppDispatch` everywhere instead of raw `react-redux` hooks.
7. Optionally add `setMock<Feature>` and seed from `app/(dashboard)/layout.tsx` for demo data.

If all these steps are followed, the new feature will be consistent with the existing architecture and easy for other agents to understand and extend.
