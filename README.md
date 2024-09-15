
# Pizza Fusion Menu Service

This service manages the menu items (Pizza and Soda) for the Pizza Fusion application. It includes CRUD operations to create, read, update, and delete menu items. The service is built with **Node.js**, **TypeScript**, **Express**, and **Prisma** as the ORM.

## Table of Contents
1. [Features](#features)
2. [API Documentation](#api-documentation)
3. [Setup Instructions](#setup-instructions)
4. [Environment Variables](#environment-variables)
5. [Kubernetes Deployment](#kubernetes-deployment)
6. [Health Check](#health-check)
7. [Contributing](#contributing)

---

## Features
- **Create Menu Items**: Create new pizza or soda items.
- **Get Menu Items**: Retrieve pizza or soda items.
- **Update Menu Items**: Update details of existing menu items.
- **Delete Menu Items**: Delete menu items by ID.
- **Health Check**: Check the health of the service.

---

## API Documentation

### Base URL
- Local: `http://localhost:3002`
- Kubernetes ClusterIP: `http://pizza-fusion-menu-service:3002`

### Endpoints

#### 1. **Create a New Menu Item**
- **Endpoint**: `/`
- **Method**: `POST`
- **Description**: Creates a new pizza or soda menu item.
- **Request Body**:
  ```json
  {
    "name": "Margherita",
    "description": "Classic pizza with cheese and tomato sauce",
    "price": 10.99,
    "size": "MEDIUM",   // Valid options: "SMALL", "MEDIUM", "LARGE"
    "type": "PIZZA"     // Valid options: "PIZZA", "SODA"
  }
  ```
- **Response**:
  - `201 Created`: Returns the created menu item.
  - `400 Bad Request`: Invalid request data.

#### 2. **Get All Menu Items**
- **Endpoint**: `/get-items`
- **Method**: `GET`
- **Query Parameters**:
  - `type`: `pizza` or `soda`
- **Description**: Fetches all menu items by type (pizza or soda).
- **Response**:
  - `200 OK`: Returns an array of menu items.

#### 3. **Update a Menu Item**
- **Endpoint**: `/update-item/:id`
- **Method**: `PUT`
- **Description**: Updates a menu item by its ID.
- **Request Body**:
  ```json
  {
    "name": "Pepperoni",
    "description": "Delicious pizza with pepperoni",
    "price": 12.99,
    "size": "LARGE",   // Valid options: "SMALL", "MEDIUM", "LARGE"
    "type": "PIZZA"    // Valid options: "PIZZA", "SODA"
  }
  ```
- **Response**:
  - `200 OK`: Returns the updated menu item.
  - `404 Not Found`: If the item is not found.

#### 4. **Delete a Menu Item**
- **Endpoint**: `/remove-item/:id`
- **Method**: `DELETE`
- **Description**: Deletes a menu item by its ID.
- **Response**:
  - `200 OK`: Success message.
  - `404 Not Found`: If the item is not found.

#### 5. **Health Check**
- **Endpoint**: `/health`
- **Method**: `GET`
- **Description**: Check the health status of the menu service.
- **Response**:
  - `200 OK`: Health check success.

---

## Setup Instructions

### Prerequisites
- **Node.js** v20.16.0 or higher
- **npm** or **yarn**
- **Docker** (for containerization)
- **Kubernetes** (for orchestration)

### Local Development Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/striveToAce/pizza-hub-menu-msc
   cd pizza-fusion-menu-msc
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` or `.env.local` file in the root directory and add the following:
   ```env
   DATABASE_URL=your_database_url
   ```
   **DOCKER IMAGE (ALREADY HAVE ENV INCLUDED)**

4. **Run Prisma migrations**:
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Access the service**:
   Open `http://localhost:3002` in your browser or API tool (Postman, Insomnia).

---

## Environment Variables

The service requires the following environment variables to function:

- **DATABASE_URL**: The connection string for the PostgreSQL database (provided by Supabase).

```bash
DATABASE_URL=your_supabase_database_url
```

Make sure to define this in the `.env` or `.env.local` file.

---

## Kubernetes Deployment

### 1. **Deploy to Kubernetes**

First, ensure that the **Docker image** for the service is built and pushed to **Docker Hub**:

```bash
docker build -t docker.io/docker380431/pizza-fusion-menu-msc .
docker push docker.io/docker380431/pizza-fusion-menu-msc
```

Apply the **Kubernetes** deployment and service files:

```bash
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml
```

### 2. **Deployment File**

#### `k8s/deployment.yml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pizza-fusion-menu
spec:
  replicas: 2
  selector:
    matchLabels:
      app: pizza-fusion-menu
  template:
    metadata:
      labels:
        app: pizza-fusion-menu
    spec:
      containers:
      - name: pizza-fusion-menu
        image: docker.io/docker380431/pizza-fusion-menu-msc:latest
        ports:
        - containerPort: 3002
```

### 3. **Service File**

#### `k8s/service.yml`
```yaml
apiVersion: v1
kind: Service
metadata:
  name: pizza-fusion-menu-service
spec:
  selector:
    app: pizza-fusion-menu
  ports:
    - protocol: TCP
      port: 3002
      targetPort: 3002
  type: ClusterIP
```

---

## Health Check

You can use the health check endpoint to ensure that the menu service is running correctly:

```bash
curl http://localhost:3002/health
```

Expected output:
```json
{
  "message": "menu service working fine"
}
```

---

## Contributing

Contributions are welcome! If you'd like to make improvements to this service, feel free to submit a PR or open an issue.

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m "Add some feature"`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

---
