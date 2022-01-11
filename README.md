# General Assembly - project 3
# Burnt Toast - MERN stack - film review site
The live project: [Burnt Toast](http://burnt-toast-ga.herokuapp.com/)

<details>
  <summary>Aim</summary>
  <ul>
    <li>In the teams of three we’ve assigned you, build a full stack application.</li>
    <li>Use MERN stack - MongoDB, Express, React.js & Node.</li>
    <li>Include CRUD operations.</li>
    <li>For a challenge - include Authentication.</li>
    <li>Use SASS for styling</li>
    <li>For a challenge include one or more dependencies for React libraries</li>
    <li>It can be a direct clone of, or inspired by, an existing website.</li>
    <li>Make wireframes as well as a written plan in order for us to sign you off.</li>
  </ul>
</details>

<details>
  <summary>Overview</summary>
  <ul>
    <li>Movie review website, on some level modeled after Rotten Tomatoes.</li>
    <li>Fully functional MERN stack application.</li>
    <li>CRUD operations - create, view, update and delete films on the database. </li>
    <li>+ Rate films others have posted.</li>
    <li>+ Add comments and ‘Like’ comments on particular films.</li>
    <li>Includes Authentication (Register / Login & perform restricted actions when logged in)</li>
    <li>Consistent styling throughout, achieved mainly with SASS.</li>
    <li>
      Two React libraries utilised - React-Reveal for some subtle animations and React-Bootstrap for some component styling, including a carousel that displays all       movies in the database (including new additions)
    </li>
    <li>Responsive design (works on a range of screen sizes)</li>
  </ul>
</details>

<details>
  <summary>Tech</summary>
  <ul>
    <li>
      <details>
        <summary>Frontend - React & Sass - 50% :</summary>
        <ul>
          <li>The client facing APP.</li>
          <liComponents of all shapes and sizes for getting and displaying data.></li>
          <li>Helper functions (configurable blueprints for sending requests).</li>
          <li>Various pages on which components are rendered.</li>
          <li>Index.js where the client facing app is injected into the document root (an HTML file).</li>
          <li>Positioning, fonts & colouring.</li>
          <li>Responsive design (media queries).</li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>Backend (JavaScript / MongoDB / Express / Node) 50% :</summary>
        <ul>
          <li>Configuration (the environment, the routes (endpoints) & secure routes</li>
          <li>Controllers (functions which handle incoming requests)</li>
          <li>Models - Exported schemas for data which will be added - this includes any relationships (embedded and reference relationships)</li>
          <li>db - contains data and seeds.</li>
        </ul>
      </details>
    </li>
  </ul>
</details>

<details>
  <summary>Approach</summary>
  <ul>
    <li>
      <details>
        <summary>Beginning - planning :</summary>
        <ul>
          <li>Immediately we set up a Trello board</li>
          <li>
            We started with written plans for the front and backend respectively.
            <ul>
              <li>
                Backend plan: we listed the necessary schemas, controllers, routes, secure routes and described the index, environment and database we would be                     building.
              </li>
              <li>
                Frontend plan: we described the project, components and pages. - we also used wireframes as a visual aid and included those in the trello board.
              </li>
            </ul>
          </li>
          <li>We then added three lists - ‘to do’, ‘in progress’, ‘done’ - in order to track progress.</li>
          <li>
            Once we had established the mongo db it was time to begin work on the backend code, starting with the environment & index - closely following the notes             we made during the previous segment of the course.
          </li>
          <li>
            We built the models we felt were necessary to deliver and MVP and established the required relationships. - My Teammate Shak largely took ownership                 over this step as he was keen to practice it. 
          </li>
          <li>
            We then began writing controllers and routes simultaneously and testing them using Insomnia (analogous to postman which you also may be familiar with).             Testing in this way allows us to ensure our requests, our routes and our controllers are fully functional before starting work on the front end.
          </li>
          <li>
            We began work on the frontend once we were able to make the fundamental requests and get the appropriate errors returned if we did not provide a valid             authorization token. These specified requests were as follows: 
            <ul>
              <li>
                (POST) Register a user, Login, get the user data, add a movie to the database, (GET) get the data for one or all of the movies, (PUT) edit a movie,                 (DELETE) delete a movie.
              </li>
            </ul>
          </li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>Middle - bulk of the project :</summary>
        <p>
          Just before we began work on the frontend, an update was made to the react-router-dom architecture, which introduced a bonus challenge - to correctly               implement the new system we were unfamiliar with.
        </p>
        <ul>
          <li>
            We created a ‘helpers’ folder containing configurable callback functions for making our requests. In this way your request functions can all be located             and edited fairly easily if necessary down the line.
          </li>
          <li>
            Our thorough plan gave us a clear overview of the pages and components we would have to build for our MVP and we made quick progress with those -                   building out things like the navigation bar and the footer which would be seen on every page - then the register and login form which we used to retest             our requests and routes, successfully.
          </li>
          <li>
            The home page (carousel of movies within the database which is updated live) was challenging and I took ownership over that component, having worked               with the react bootstrap library in the past. 
          </li>
          <li>
            My Teammate Kirtan built a brilliant search bar system, utilising what he’d learned on his previous project.
          </li>
          <li>
            Building out things like the ‘movies’ page felt easy and went smoothly overall.
          </li>
        </ul>
      </details>
    </li>
    <li>
      <details>
        <summary>End - polishing & testing :</summary>
        <ul>
          <li>
            The later stages of the process involved adding to the backend. Shak and I worked out what kind of schemas and relationships we would need to allow a               logged in user the ability to comment on a movie and like existing comments. 
          </li>
          <li>
            We had to write complex controllers for those operations, testing them on insomnia. Writing the controllers for liking and unliking a comment on a film             was especially challenging, grappling with the logic until It worked on insomnia was a satisfying process. 
          </li>
          <li>
            I then began work on the front end, which turned out to be even more challenging funnily enough. I was able to make the commenting system work in time             for the presentation but the like / unlike system still needed some small tweaks. - I felt there was room for improvement. 
          </li>
          <li>
            We then styled the project, finding fonts, a logo, and a color scheme that we felt suited the project. I took ownership over much of this stage of the             process. I found and implemented a second React library called react-reveal, which allowed me to include simple animations on all of the sites forms,               giving the site a slightly more dynamic feel. 
          </li>
        </ul>
      </details>
    </li>
  </ul>
</details>

<details>
  <summary>Key learnings</summary>
  <ul>
    <li>Planning is everything.</li>
    <li>Create and populate a mongo database + working with express and node.</li>
    <li>Adapt when using newly updated architectures (react-router-dom)</li>
    <li>SASS makes for more readable and reusable CSS.</li>
    <li>React Reveal for simple animation of any component.</li>
    <li>Heavily customised react-bootstrap components can cause issues, be sure to allow time to achieve and test the intended effect.</li>
  </ul>
</details>

<details>
  <summary>Challenges</summary>
  <ul>
    <li>
      Time management - packing as many features in as possible but making sure they all work effectively, removing the ones I couldn’t polish before                     deadline.
    </li>
    <li>Writing the logic for liking a comment was more complex than it sounds. I am yet to perfect the system.</li>
    <li>Creating working media queries to make an app fully responsive is no joke, this takes time and attention.</li>
    <li>
      Properly implementing useEffect() while working with props and components that instantiate inner components. (When you like a comment on a movie - it should       be updated live and the like button should become an unlike button in that moment, without refreshing the page). 
    </li>
  </ul>
</details>

<details>
  <summary>Possible future improvements</summary>
  <ul>
    <li>View other users profiles.</li>
    <li>Like button fully functioning + add like button to movies as well as comments.</li>
    <li>More interesting home page (possibly a list of the top-rated movies at that time). </li>
    <li>Improved styling - currently feels clunky and outdated.</li>
    <li>Media queries need considerable work.</li>
    <li>Forms could appear in pop ups instead of on separate pages.</li>
  </ul>
</details>

<details>
  <summary>Bugs</summary>
  <ul>
    <li>Some of the styling doesn’t work well when resizing the page (text jumps out of buttons and elements are laid on top of eachother)</li>
    <li>The Like button allows you to like a comment more than once.</li>
  </ul>
</details>

<details>
  <summary>Visuals</summary>
  <p></p>
  <img src= />
  <p></p>
  <img src= />
  <p></p>
  <img src= />
  <p></p>
  <img src= />
  <p></p>
  <img src= />
  <p></p>
  <img src= />
</details>



