## API Documentation

### 1. **Login API**

- **Endpoint**: `POST /login`
- **Description**: Authenticates a user based on the provided username and password.
- **Request Body**:
    
    ```json
    
    {
      "username": "admin",
      "password": "password123"
    }
    
    ```
    
- **Response**:
    - **Success**:
        
        ```json
        
        {
          "success": true,
          "token": "string"
        }
        
        ```
        
    - **Failure** (Invalid credentials):
        
        ```json
        
        {
          "success": false,
          "message": "Invalid credentials"
        }
        
        ```
        
- **Status Codes**:
    - `200 OK`: Authentication successful
    - `401 Unauthorized`: Invalid credentials

---

### 2. **Movies API - Get All Movies**

- **Endpoint**: `GET /movies`
- **Description**: Fetches a list of movies with optional filtering, searching, and pagination.
- **Query Parameters**:
    - `genre` (optional): Filter movies by genre.
    - `search` (optional): Search movies by title or description.
    - `limit` (optional, default: 15): Number of movies per page.
    - `page` (optional, default: 1): Page number for pagination.
- **Response**:
    
    ```json
    {
      "totalItems": 30,
      "currentPage": 1,
      "totalPages": 2,
      "movies": [
        {
          "id": 1,
          "title": "Inception",
          "poster": "https://placehold.co/150",
          "releaseDate": "2010-07-16",
          "genre": "Sci-Fi",
          "description": "A mind-bending thriller by Christopher Nolan."
        },
        // more movie objects...
      ]
    }
    
    ```
    
- **Status Codes**:
    - `200 OK`: Successfully retrieved movies.
    - `400 Bad Request`: Invalid query parameters.

---

### 3. **Movies API - Get Movie by ID**

- **Endpoint**: `GET /movies/:id`
- **Description**: Fetches a specific movie by its unique ID.
- **Path Parameters**:
    - `id`: The ID of the movie (e.g., `1`, `2`).
- **Response**:
    - **Success**:
        
        ```json
        
        {
          "id": 1,
          "title": "Inception",
          "poster": "https://placehold.co/150",
          "releaseDate": "2010-07-16",
          "genre": "Sci-Fi",
          "description": "A mind-bending thriller by Christopher Nolan."
        }
        
        ```
        
    - **Failure** (Movie not found):
        
        ```json
        
        {
          "error": "Movie not found"
        }
        
        ```
        
- **Status Codes**:
    - `200 OK`: Successfully retrieved movie details.
    - `404 Not Found`: Movie not found.

---

### 4. **Movies API - Add a New Movie**

- **Endpoint**: `POST /movies`
- **Description**: Adds a new movie to the database.
- **Request Body**:
    
    ```json
    
    {
      "title": "string",
      "poster": "string",
      "releaseDate": "YYYY-MM-DD",
      "genre": "string",
      "description": "string"
    }
    
    ```
    
- **Response**:
    - **Success**:
        
        ```json
        
        {
          "id": 31,
          "title": "New Movie",
          "poster": "https://placehold.co/150",
          "releaseDate": "2025-01-01",
          "genre": "Action",
          "description": "Description of the new movie."
        }
        
        ```
        
    - **Failure** (Missing required fields):
        
        ```json
        
        {
          "error": "Missing required fields"
        }
        
        ```
        
- **Status Codes**:
    - `201 Created`: Successfully added the movie.
    - `400 Bad Request`: Missing required fields or invalid data.

---

### 5. **Movies API - Update an Existing Movie**

- **Endpoint**: `PUT /movies/:id`
- **Description**: Updates the details of an existing movie by its ID.
- **Path Parameters**:
    - `id`: The ID of the movie (e.g., `1`, `2`).
- **Request Body**:
    
    ```json
    
    {
      "title": "string",
      "poster": "string",
      "releaseDate": "YYYY-MM-DD",
      "genre": "string",
      "description": "string"
    }
    
    ```
    
- **Response**:
    - **Success**:
        
        ```json
        
        {
          "id": 1,
          "title": "Updated Movie Title",
          "poster": "https://placehold.co/150",
          "releaseDate": "2025-01-01",
          "genre": "Action",
          "description": "Updated movie description."
        }
        
        ```
        
    - **Failure** (Movie not found):
        
        ```json
        
        {
          "error": "Movie not found"
        }
        
        ```
        
- **Status Codes**:
    - `200 OK`: Successfully updated the movie.
    - `404 Not Found`: Movie not found.

---

### 6. **Movies API - Delete a Movie**

- **Endpoint**: `DELETE /movies/:id`
- **Description**: Deletes a movie by its ID.
- **Path Parameters**:
    - `id`: The ID of the movie (e.g., `1`, `2`).
- **Response**:
    - **Success**:
        
        ```json
        
        {
          "success": true,
          "message": "Movie deleted successfully."
        }
        
        ```
        
    - **Failure** (Movie not found):
        
        ```json
        
        {
          "error": "Movie not found"
        }
        
        ```
        
- **Status Codes**:
    - `200 OK`: Successfully deleted the movie.
    - `404 Not Found`: Movie not found.

---

### Notes:

- The `movies` endpoint supports filtering and pagination through query parameters (`genre`, `search`, `limit`, and `page`).
