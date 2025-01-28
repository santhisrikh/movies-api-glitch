const express = require("express");
const crypto = require("crypto");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const users = [
  { username: "admin", password: "password123" },
  { username: "user", password: "user123" },
];

const movies = [
  {
    id: 1,
    title: "Inception",
    poster: "https://placehold.co/150",
    releaseDate: "2010-07-16",
    genre: "Sci-Fi",
    description: "A mind-bending thriller by Christopher Nolan.",
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "https://placehold.co/150",
    releaseDate: "2008-07-18",
    genre: "Action",
    description: "The Caped Crusader takes on the Joker.",
  },
  {
    id: 3,
    title: "The Matrix",
    poster: "https://placehold.co/150",
    releaseDate: "1999-03-31",
    genre: "Sci-Fi",
    description: "A hacker learns the true nature of reality and his role in the war against its controllers.",
  },
  {
    id: 4,
    title: "Titanic",
    poster: "https://placehold.co/150",
    releaseDate: "1997-12-19",
    genre: "Romance",
    description: "A young couple from different social backgrounds fall in love aboard the ill-fated R.M.S. Titanic.",
  },
  {
    id: 5,
    title: "Avatar",
    poster: "https://placehold.co/150",
    releaseDate: "2009-12-18",
    genre: "Sci-Fi",
    description: "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
  },
  {
    id: 6,
    title: "The Godfather",
    poster: "https://placehold.co/150",
    releaseDate: "1972-03-24",
    genre: "Crime",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: 7,
    title: "Pulp Fiction",
    poster: "https://placehold.co/150",
    releaseDate: "1994-10-14",
    genre: "Crime",
    description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: 8,
    title: "Forrest Gump",
    poster: "https://placehold.co/150",
    releaseDate: "1994-07-06",
    genre: "Drama",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold from the perspective of an Alabama man with an extraordinary amount of luck.",
  },
  {
    id: 9,
    title: "The Shawshank Redemption",
    poster: "https://placehold.co/150",
    releaseDate: "1994-09-22",
    genre: "Drama",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: 10,
    title: "Interstellar",
    poster: "https://placehold.co/150",
    releaseDate: "2014-11-07",
    genre: "Sci-Fi",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 11,
    title: "Gladiator",
    poster: "https://placehold.co/150",
    releaseDate: "2000-05-05",
    genre: "Action",
    description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
  },
  {
    id: 12,
    title: "The Lion King",
    poster: "https://placehold.co/150",
    releaseDate: "1994-06-15",
    genre: "Animation",
    description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
  },
  {
    id: 13,
    title: "Fight Club",
    poster: "https://placehold.co/150",
    releaseDate: "1999-10-15",
    genre: "Drama",
    description: "An insomniac office worker and a soap salesman form an underground fight club that evolves into something much, much more.",
  },
  {
    id: 14,
    title: "The Avengers",
    poster: "https://placehold.co/150",
    releaseDate: "2012-05-04",
    genre: "Action",
    description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from subjugating Earth.",
  },
  {
    id: 15,
    title: "The Lord of the Rings: The Return of the King",
    poster: "https://placehold.co/150",
    releaseDate: "2003-12-17",
    genre: "Fantasy",
    description: "Gandalf and Aragorn lead the World of Men against Sauron to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
  }
];


// Generate a random token
const generateToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = generateToken();
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});


// Movies API
app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (movie) res.json(movie);
  else res.status(404).json({ error: "Movie not found" });
});

// Add a new movie (POST)
app.post("/movies", (req, res) => {
  const { title, poster, releaseDate, genre, description } = req.body;

  if (!title || !poster || !releaseDate || !genre || !description) {
    return res.status(400).json({ error: "All movie fields are required" });
  }

  const newMovie = {
    id: movies.length ? movies[movies.length - 1].id + 1 : 1, // Auto-generate ID
    title,
    poster,
    releaseDate,
    genre,
    description,
  };

  movies.push(newMovie);
  res.status(201).json(newMovie); // Send the created movie back as a response
});


// Update a movie (PUT)
app.put("/movies/:id", (req, res) => {
  const movieIndex = movies.findIndex((m) => m.id === parseInt(req.params.id));
  if (movieIndex !== -1) {
    const updatedMovie = { id: movies[movieIndex].id, ...req.body };
    movies[movieIndex] = updatedMovie;
    res.json(updatedMovie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

// Partially update a movie (PATCH)
app.patch("/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (movie) {
    Object.assign(movie, req.body);
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

// Delete a movie (DELETE)
app.delete("/movies/:id", (req, res) => {
  const movieIndex = movies.findIndex((m) => m.id === parseInt(req.params.id));
  if (movieIndex !== -1) {
    const deletedMovie = movies.splice(movieIndex, 1); // Remove movie from array
    res.json({ message: "Movie deleted successfully", movie: deletedMovie[0] });
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});
// search query params

app.get("/movies", (req, res) => {
  console.log("Query Parameters: ", req.query); // Debug log for query parameters

  const { genre, search, limit = 10, page = 1 } = req.query;

  const parsedLimit = parseInt(limit, 10) || 10; // Fallback to 10 if NaN
  const parsedPage = parseInt(page, 10) || 1;   // Fallback to 1 if NaN

  let filteredMovies = movies;

  // Filter by genre
  if (genre) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  // Search by title or description
  if (search) {
    filteredMovies = filteredMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Pagination logic
  const startIndex = (parsedPage - 1) * parsedLimit;
  const endIndex = startIndex + parsedLimit;

  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

  // Send the response
  res.json({
    totalItems: filteredMovies.length,
    currentPage: parsedPage,
    totalPages: Math.ceil(filteredMovies.length / parsedLimit),
    movies: paginatedMovies,
  });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API is running on port ${PORT}`));