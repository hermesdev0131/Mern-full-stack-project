# Burnt Toast - GA Project 3

This is my third project for the General Assembly Software Engineering Immersive course.

This app is deployed with Heroku and available [here](http://burnt-toast-ga.herokuapp.com/).

Burnt Toast is a movie review website (based on rotten tomatoes), where users can not only rate and review movies, but also add and edit movies of their choice. 

![gif](https://github.com/hermesdev0131/Mern-full-stack-project/blob/main/screen.gif)

## TABLE OF CONTENTS

- [Overview](#overview)
  - [Technologies Used](#technologies)
  - [Brief](#brief)
  - [Getting Started](#getting-started)
- [Planning](#planning)
- [Site Architecture](#architecture)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Featured Code](#featured-code)
- [Bugs & Known Errors](#bugs)
- [Future Improvements](#improvements)
- [Wins & Challenges](#wins)
- [Key Learnings](#learnings)

## <a name='overview'>OVERVIEW</a>

### <a name='technologies'>TECHNOLOGIES USED</a>

- Node.js
- Express
- MongoDB
- Mongoose
- JavaScript (ES6)
- React
- Axios
- Nodemon
- CSS / Sass
- React Bootstrap
- JWT
- Git / GitHub

### <a name='brief'>BRIEF</a>

We were tasked with building a MERN (MongoDB, Express, React.js & Node) full stack application, in groups of three, in a 10 day timescale. 

We had to use an Express API to serve our data from a Mongo database, which then had to be accessed and utilised in a separate front-end React app. 

The app had to include CRUD functionality, both referenced and embedded relationships, and styled using SASS. 

Suggested challenges included having Authentication, and React libraries, such as Bootstrap. 

### <a name='getting-started'>GETTING STARTED</a>

Clone or download this repository

In a new terminal window, run `mongod mongod --dbpath ~/data/db` to start a MongoDB server

Run `mongosh` to start a MongoDB shell

Run `yarn` at the project root to download any dependencies

Run `yarn serve` to start the backend server

Navigate to the frontend with `cd frontend` and run `yarn start` to start the frontend server

## <a name='planning'>PLANNING</a>

The first task was coming up with an idea for the project. I wanted to have a site which most people could relate to, but also one that users would enjoy. I suggested a movie review site, referencing Rotten Tomatoes, and the group immediately agreed. 

We then set up a Trello board to allow us to collaborate effectively and use, as a single point of reference for the group. This was by far the largest project we had been tasked with so far on the course, and along with the fact it was a group project, having a clear plan was imperative. 

![image](https://user-images.githubusercontent.com/89402596/149979693-9c0ab063-e8ef-4023-a320-8ffa8d3d6294.png)

We first created wireframes to envisage how we wanted each page to look, along with potential schemas so we had an idea of how our models interacted with each other and the frontend. 

![image](https://user-images.githubusercontent.com/81522060/151805540-a9e15a27-ce75-460e-8d0b-e575b6b3e38e.png)

My experience in management came in handy here, and an understanding of the importance of time management, so we came up with timescales for when we wanted each section to be complete. In particular, we wanted the MVP to be completed within 5 days, meaning we would have the remaining 5 days to add extra features and work on styling, ensuring the site was aesthetically pleasing and matched the theme.

We then allocated responsibilities for each group member. 

#### Arthur was responsible for:

- ALL forms.
- Incorporating React Bootstrap and React Reveal.
- Majority of the styling, using SASS. 
- Adding some extra features, such as giving users the ability to ‘Like’ comments.
- Project deployment.

#### Kirtan was responsible for:

- The search-bar feature.
- ALL Media queries.
- Contributing to the styling using SASS.
- Adding data to the database to help with testing.

#### I was responsible for:

- Setting up the Backend.
- ALL route testing, done in Postman.
- Authentication.
- Relationships.
- CRUD functionality.

## <a name='architecture'>SITE ARCHITECTURE</a>

### <a name='backend'>BACKEND</a>

#### DATA MODELS

We decided to create our database across two central models, one for movies and one for users.

We used a Mongoose schema to dictate the information each movie would display. This was the longest schema we built. In addition to containing all of the movie information, each movie had a reference relationship with a user as that movies’ owner, and an embedded relationship with the ratings schema where the ‘ratings’ and ‘comments’ made by other users were stored.

```

//Movie schema
const movieSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, unique: true, required: true },
  trailer: { type: String },
  director: { type: String },
  releaseYear: { type: Number },
  description: { type: String, required: true, maxlength: 280 },
  cast: [{ type: String }],
  genre: [{ type: String }],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: [ratingsSchema,]
})

```
We then leveraged Mongoose virtuals to enable us to get a sum of all the ratings for a particular movie and return an average rating for that movie. This was essential for the site so that each movie had one overall rating by the community, as opposed to lots of ratings by individual users. 

```

movieSchema.virtual('averageRating').get(function(){
  //If there are no ratings, return a string
  if (!this.rating.length) return 'Not Rated Yet'
  const sumOfRatings = this.rating.reduce((acc, rating) => {
    if (!rating.rating) return acc
    return acc + rating.rating
  }, 0)
  const averageRatingPercentage = ((sumOfRatings / this.rating.length).toFixed(2))*10
  return `${averageRatingPercentage}%`
})

```
Our user model also had quite a lot of information in its schema, as one of our planned extras was to have a profile page for each user. We then, again, leveraged Mongoose virtuals to add extra properties that we did not want mapped to the MongoDB collection, such as a password confirmation field as part of the authentication process (see below). 

With virtual fields, we were also able to create a reverse relationship and populate a ‘created movies’ field, using local and foreign fields to identify movies a particular user has added.

```
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, maxlength: 30},
  firstName: {type: String},
  surname: {type: String},
  email: { type: String, unique: true, required: true },
  dateOfBirth: {type: Date},
  favoriteFilm: [{type: String}],
  image: { type: String },
  gender: {type: String},
  password: { type: String, required: true },
})

//Reverse relationship, show the movies user has added
userSchema.virtual('createdMovies', {
  ref: 'Movie', //Model this relates to
  localField: '_id', //Field from user model stored on movie model
  foreignField: 'owner', //Field on the movie that stores the user id
})

```
For user authentication, we wrote in custom pre-validation and pre-save checks to ensure that the password and password confirmation match and to hash the plain-text password with bcrypt before saving. We also added a method to the user model to validate passwords, checking the user inputted plain text password against the stored hash.

```

//Custom pre validation
userSchema.pre('validate', function(next){
  if (this.isModified('password') && this.password !== this._passwordConfirmation){
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})

//Custom pre save
userSchema.pre('save', function(next){
  if (this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

```
#### CONTROLLERS

We stored all functions that control endpoint functionality within a controllers folder. Movies could be created, read, updated, and deleted by users, while ratings and comments could be created and deleted. Auth controllers could be used to register and login users, while our user model also had controllers to view profile details. 

```

//Get /movies/:id
//Get single movie
export const getSingleMovie = async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id).populate('owner').populate('rating.owner')
    // console.log(movie)
    if (!movie) throw new Error()
    return res.status(200).json(movie)
  } catch (err) {
    console.log(`Movie not found`)
    console.log(err)
    return res.status(404).json({ 'message': 'Movie Not Found'})
  }
}

```
The CRUD methods are assigned to the correct backend routes in config/router.js. We also added a secure route middleware to routes where user authentication was required, such as adding, deleting, or editing movies. Here’s an example route for a single movie.

```

router
  .route("/movies/:id")
  .get(getSingleMovie)
  .put(secureRoute, updateMovie)
  .delete(secureRoute, removeMovie);
  
```
#### SEEDING THE DATABASE

While we wanted users to be able to add movies of their choice, we needed the database to have a list of movies already stored. This was also important when testing routes and the CRUD functionality, so we could easily revert back to an original list of movies. We saved these in db/data.js where they could be exported, and then wrote out a seed function using Mongoose to drop and reseed the database.

```

const seedDatabase = async () => {
  try {
    //Connect to the db
    await mongoose.connect(dbURI)
    console.log(`DB connected`)
    //Drop the db
    await mongoose.connection.db.dropDatabase()
    console.log(`DB Dropped`)

    //Add the user to db
    const users = await User.create(userData)
    // console.log(`Users added to the db`, users)

    //Add owner to each movie
    const moviesWithOwners = movieData.map(movie => {
      movie.owner = users[0]._id
      return movie
    })

    //Seed the db with data file
    const moviesAdded = await Movie.create(moviesWithOwners)
    console.log(`DB has been seed with ${moviesAdded.length} Movies`)
    //Close our connection to db
    await mongoose.connection.close()
    console.log(`Connection to DB closed`)
    
  } catch (err) {
    console.log(err)
    //Close the connection to db
    await mongoose.connection.close()
    console.log(`Error. DB connection closed`)
  }
}

seedDatabase()

```

I was very confident with how the backend needed to work to make the site function which is why I took responsibility for setting this up. So much so, that by the end of day 2, all our backend endpoints were working in Postman and we were on track to hit our deadlines. 

### <a name='frontend'>FRONTEND</a>

For the frontend, each person worked on tasks allocated to them. I focused on components and pages that linked to what I had already written in the backend, such as the Log In, Register, and Add a Movie Page, as well as, the Nav component. We would create a new branch for each feature and merge into our development branch before moving on to the next. Throughout the project we communicated over Zoom and Slack. Once the MVP had been achieved, we then started to collaborate together using VScodes LiveShare feature.

Once we set up the front-end React app, we realised an update had been made to the react-router-dom architecture. 
While initially frustrating, we saw this as an opportunity to learn the importance of being flexible as a software engineer, as the field is forever updating and this is a skill we will certainly need to have when working. We studied the relevant [documentation](https://reactrouter.com/docs/en/v6/upgrading/v5) and soon were able to implement the necessary changes.

Here is an outline of our final UX:

#### Homepage

![gif](https://github.com/Shak-H/MERN-Full-Stack-Project---Movie-Review-Site/blob/main/home.gif)

#### All movies

![gif](https://github.com/Shak-H/MERN-Full-Stack-Project---Movie-Review-Site/blob/main/all-movies.gif)

#### Single Movie

![gif](https://github.com/Shak-H/MERN-Full-Stack-Project---Movie-Review-Site/blob/main/single-movie.gif)

#### Add a Movie form

![gif](https://github.com/Shak-H/MERN-Full-Stack-Project---Movie-Review-Site/blob/main/add-movie.gif)

#### Profile

![gif](https://github.com/Shak-H/MERN-Full-Stack-Project---Movie-Review-Site/blob/main/profile.gif)

## <a name='featured-code'>FEATURED CODE</a>

We all worked full-stack and touched on most functionality/elements at some point during the development process, whether in styling, debugging or testing. However, here are a few of the elements that I owned on the front-end:

### LOGGED IN VS NOT LOGGED IN

It was important that the user experience changed depending on if they were logged in versus not logged in. 

Firstly, on the `App.js` file, I used React’s State Hook to set variables for whether a user was logged in, and then used React’s Effect Hook to set the variable to True or False depending on whether or not the user had been allocated a JWT (jsonwebtoken). Then I set this as a prop on all the `Nav.js` files, as well as the `MovieShow.js` file.

```

function ShowOneMovie() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])
  
  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <MovieShow isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

```
I then wrote a ternary statement to display different information, if the user was logged in versus if they were not.

```

 {isLoggedIn ? (
  <>
    <div id="alter-movie-buttons" className="alter-movie-buttons">
        <Button className="button"><Link className="link" to={`/movies/${id}/edit`}>Edit</Link></Button>
      <Button className="button" onClick={handleDeleteClick}>Delete</Button>
      <Button className="button"><Link className="link" to={`/movies/${id}/rating`}>Rate</Link></Button>
    </div>
  </>
  ) : (
  <>
    <div id="alter-movie-buttons" className="alter-movie-buttons">
      <p>Log in to rate this movie</p>
      <Button id="button"  className="button"><Link className="link" to={'/login'}>Log In</Link></Button>
      <Button id="button" className="button"><Link className="link" to={'/register'}>Sign Up</Link></Button>
    </div>
  </>
 )}
        
```
### SINGLE MOVIE PAGE PLAYS MOVIE TRAILER

One of the extra features we wanted to include was to have videos of movie trailers on the Movie Show page, as this was a constant feature on most Movie sites. I did this using React Player.

First I had to install react player using `yarn add react-player`.

Then I had to import React Player. 

Finally I had to use the React Player tag, passing in props which set the; url to be the ‘trailer’ defined in the movie schema, controls so users could play and pause the video while on the site, height and width (all YouTube videos have the same height and width parameters)

```

 return (
    <div className="movie-show-div">
      <div className="movie-show-img-div">
        <ReactPlayer className="video"
          url={movie.trailer}
          controls
          width={640}
          height={360}
        />
      </div>
 
 ```
### PROFILE PAGE

I created the profile page, which was another extra feature we wanted to include to improve the social aspect of the site. Here you can see it takes advantage of the reverse relationship created in the backend, between users and the movies which they have added. 

These are saved as an array, therefore I map over them to be displayed in the same format as movies are on all the pages of the site. 

```

return (
    <div className="profile-container">
      <div className="personal-details">
        <Card className="profile-card">
          <Card.Img className="card-image" variant="top" src={`${userData.image}`} style={{ minWidth: '200px' }}/>
          <Card.Body className="card-body">
            <Card.Title className='card-title'>
              <p className="username">{userData.username}</p>
            </Card.Title>
            <Card.Text>
              <p className="card-text">Gender: {userData.gender}</p>
            </Card.Text>
            <Card.Text>
              <p className="card-text">Favorite Films: {userData.favoriteFilm}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="movie-list-div" id="created-movies-div">
        <p className="movies-add-by">Your Movies</p>
        <ul className="movie-list" id="profile-movie-list">
          {moviesAdded.map((m) => (
            <li key={m._id}>
              <MovieCard {...m} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
  
```
### USER AVATARS

I liked the idea of users having pre-selected Avatars. I used the select tag, and set the values to be images, so the user could pick from different Avatars in a dropdown menu.

```

<div>
  <Fade left>
    <Form.Select 
      name="image" type="image" 
      aria-label="Floating label select example" 
      {...formInputProps} onChange={handleFormChange}
      className="form-select" >
      <option>Choose your avatar</option>
      <option value='https://image.emojipng.com/393/209393.jpg'>😉</option>
      <option value="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/grinning-face.png">😀</option>
      <option value="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/face-with-tears-of-joy.png">😂</option>
      <option value="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/nerd-face.png">🤓</option>
    </Form.Select>
  </Fade>
</div>
          
 ```
## <a name='bugs'>BUGS & KNOWN ERRORS</a>

There are issues with the styling when the page size changes and some of the Media Queries don't work. 

The Like button allows you to like a comment more than once.

## <a name='improvements'>FUTURE IMPROVEMENTS</a>

Improve the social aspects of the app, such as seeing other users profiles, and fixing the ‘Like’ button functionality. 

The Home page could be improved by having top-rated movies, and Movie News (possibly utilising a 3rd party API).

Incorporate cloudinary, to add images of movies or users. 

## <a name='wins'>WINS & CHALLENGES</a>

We were really happy with how the project worked out. It does most of what we set out to achieve, and while the styling colour scheme may not be the nicest, it certainly matches the theme. 

Our team worked really well together and we had no arguments or conflicts at all during the development process, and were able to stick to our time scales. I think thorough planning played a big part in this as we were all happy with the project direction and our allocated tasks. We also spent most days working on Zoom so we were on top of what the others were doing.

The biggest coding win was probably getting the add a rating and delete a rating functionality to work. This was quite complex, and took a big team effort with an awful lot of console logging and testing to work. 

In the end, the biggest challenge was getting the ‘Like a comment’ functionality to work. It was very close to working and I’m confident with a little more time we would have got there. 

## <a name='learnings'>KEY LEARNINGS</a>

Planning! This project definitely involved the most planning, with wireframes, Trello boards, and endpoints all mapped out. I learnt a lot about how to effectively plan and track a project through the development process, especially as part of a team.

Git/GitHub. We had to do a lot of branching and merging in this project, so keeping track of who was working where, was really helpful in avoiding and resolving conflicts.

This project also consolidated my understanding of MongoDB data modelling and how to best build relationships between different data collections.
