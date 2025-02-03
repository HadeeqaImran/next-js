# Libraries (Next Server)
1. prisma (uses SQLite DB)
2. nextui (component library) (uses framer-motion) 
3. next-auth / authjs (currently known as authjs)
4. Github OAuth

# Auth Setup
1. github.com/settings/applications/new - Generate a client_id and a client_secret from here.
2. Create .env.local and add AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET 
3. To make authjs work we need to install 3 packages: @auth/core@0.18.1 @auth/prisma-adapter@1.0.6 next-auth@5.0.0-beta.3
4. Make auth.ts and in src folder and setup NextAuth and PrismaAdapter
5. Setup the a'app/api/auth/[...nextauth]/routes.ts to handle the requests between Githubs servers and ours
6. Make server actions to make it really clear to anybody seeing the project as to what is happening.

# Recommended Design Process
1. Identify all different routes + the data that will be displayed on it. Make a table. (Page Name | Path | Data Shown)
![alt text](<Screenshot 2025-01-09 at 4.27.22 PM.png>)
2. Path Helper Functions - because next project has many deeply nested routes, and any directory name can be updated or a directory can be added/deleted from the path tree. So to prevent going around the code base and changing paths, you can easily keep them in one place for maintenance.
3. Create your routing folders + page.tsx files
4. Identify places where data changes in some way
5. Make empty server actions for each of those palces where data changes.
6. Add in comments on what paths you'll need to revalidate for each server action. Thought process is that you iterate over all the server actions and check which paths that particular server action is going to revalidate.


# Places Where data Changes in this Application
1. Create a topic
2. Create a post
3. Create a reply/comment to a post

# Form Validations
zod - we  

# Error Handling:
1. The error that comes on action in the useActionState hook can be solved by making the following three types compatible
const [formState, action] = useActionState(**actions.createTopic**, ______ )
export async function createTopic(formState: _______, formData: FormData) {return ________} 


### **React vs Next.js: A Comprehensive Comparison**

React and Next.js are two popular technologies in the JavaScript ecosystem. While both are used for building user interfaces, they differ significantly in their capabilities, use cases, and features.

---

### **1. Overview**
| **Aspect**          | **React**                                                | **Next.js**                                                                 |
|----------------------|----------------------------------------------------------|-----------------------------------------------------------------------------|
| **What is it?**      | A JavaScript library for building UI components.         | A React-based framework for building server-rendered and static web apps.  |
| **Type**            | Library                                                  | Framework                                                                  |
| **Purpose**         | Client-side rendering (CSR).                             | Server-side rendering (SSR), static site generation (SSG), and hybrid apps.|

---

### **2. Technical Features**
| **Feature**              | **React**                                                                                       | **Next.js**                                                                                                           |
|--------------------------|-------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| **Rendering**            | Client-side rendering (CSR) only.                                                              | Supports CSR, SSR, SSG, and ISR (Incremental Static Regeneration).                                                  |
| **Routing**              | Manual setup via React Router or custom solutions.                                             | Built-in file-based routing.                                                                                        |
| **SEO Support**          | Limited out-of-the-box; needs additional libraries (e.g., React Helmet).                       | Strong SEO capabilities with SSR and SSG.                                                                           |
| **API Handling**         | Requires external tools (e.g., Axios, Fetch).                                                  | Built-in API routes for serverless functions.                                                                       |
| **State Management**     | External libraries like Redux, Context API, or Zustand are required.                          | Uses React's ecosystem for state management but can be integrated with Redux or others.                             |
| **Image Optimization**   | Requires third-party libraries for advanced image handling.                                    | Built-in image optimization with the `<Image>` component.                                                           |
| **Internationalization** | External libraries like `react-intl` or `i18next`.                                            | Built-in internationalization support.                                                                              |
| **Static Generation**    | Not supported natively.                                                                       | Supports static site generation (SSG) for pre-rendering pages at build time.                                        |
| **TypeScript Support**   | Fully supported, but requires configuration.                                                  | Fully supported with minimal configuration.                                                                         |

---

### **3. Developer Experience**
| **Aspect**            | **React**                                                    | **Next.js**                                                                 |
|-----------------------|--------------------------------------------------------------|-----------------------------------------------------------------------------|
| **Learning Curve**    | Moderate; need to understand React concepts and tools.       | Slightly steeper; combines React with SSR, routing, and more.              |
| **Tooling**           | Requires setting up tools like Webpack, Babel, etc.          | Preconfigured with Webpack, Babel, and other optimizations.                |
| **Community**         | Large and active, with extensive third-party library support.| Growing rapidly, backed by Vercel.                                         |
| **Customization**     | High; full control over setup and architecture.              | Moderate; opinionated framework but allows for custom configurations.      |
| **Ease of Deployment**| Varies depending on hosting provider and setup.              | Seamless deployment with Vercel; also supports other platforms.            |

---

### **4. Performance**
| **Aspect**              | **React**                                                    | **Next.js**                                                                 |
|--------------------------|-------------------------------------------------------------|-----------------------------------------------------------------------------|
| **Initial Load**         | Depends on client-side rendering; slower for large bundles. | Faster with SSR or SSG, as HTML is pre-rendered on the server.             |
| **Bundle Splitting**     | Requires manual configuration or libraries like Webpack.    | Automatic bundle splitting for optimized performance.                      |
| **Caching**              | Requires custom implementation.                            | Built-in support for caching with ISR and static assets.                   |

---

### **5. Business and Non-Technical Factors**
| **Aspect**             | **React**                                                                                     | **Next.js**                                                                                  |
|-------------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **Cost**               | Free and open-source.                                                                         | Free and open-source, with optional premium services (e.g., Vercel hosting).               |
| **Time to Market**     | Slower due to the need for setting up SSR, routing, etc., manually.                           | Faster due to built-in features and optimizations.                                         |
| **Use Cases**          | - Single Page Applications (SPAs).<br>- Highly interactive UIs.<br>- Progressive Web Apps (PWAs).| - E-commerce.<br>- Blogs and Content-heavy websites.<br>- SEO-focused applications.<br>- Hybrid apps. |
| **Community Support**  | Larger community, more libraries and resources.                                               | Smaller but rapidly growing community.                                                     |
| **Backed By**          | Facebook.                                                                                     | Vercel.                                                                                     |

---

### **6. When to Use?**
| **Use React**                                                                                  | **Use Next.js**                                                                               |
|------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| - If you need a lightweight library for building component-based UIs.                         | - If you need server-side rendering, static generation, or hybrid rendering.                 |
| - For SPAs or applications where SEO is not critical.                                          | - For SEO-critical websites or content-heavy platforms.                                      |
| - When you want full control over tooling and architecture.                                    | - If you want out-of-the-box optimizations and faster time-to-market.                        |
| - For embedding components in non-web applications (e.g., React Native).                      | - For building dynamic and scalable web applications.                                        |

---

### **Conclusion**
- **React** is ideal if you want flexibility, a large ecosystem, and are building SPAs or PWAs.
- **Next.js** excels in scenarios where SSR, SSG, or SEO are important, or you want a production-ready framework with minimal configuration.

Choosing between React and Next.js depends on your project requirements, technical constraints, and business goals.


# Data Fetching in Components
### Should the data be fetched in a parent (higher up in the heirarchy) and then be passed down? Or should it be done lower in the heirarchy (including the component fetching its own data)?
## Options 1:
TopicShowPage fetches the post sof a specific topic and passes it down to the PostList component.
1. We can easily know which component is using what query
2. Child components can be used with different data in different parts of application.
3. Easier to avoid n+1 queries. (n+1 query is when for a part of information, you have to reach out to the database and many compoennts in your list have to make that call.) Make a more descriptive props interface that does not let the props to be passed down to postShow component.
1) We can accidetly fetch more data than we need. Very small performance consideration. e.g. If we want to show the posts on 2 different pages then in the case of home page we will not have the slug of the topic and to fetch that we will end up overfetching.
2) Can lead to duplicated code (with all the extra data fetching) in the components which will use this component.
3) Slower page load speed.
## Option 2:
PostList fetches its data itself.
1. Creating shimmers or loaders on page is Easier
1) Child component implementation is locked in (that is now Post List components entire purpose always becaue of the specialized query)

# Recommended Approach (Option 1.5)
1. New file which makes the query to the database with the appropriate interface
2. To the components props interface we are going to add the query function and make it wait for the Promise returned by the function fetching the query
3. Now the Parent component can decide which function to run inside the child component. The child will be a server component which wil await the response of the function passed. In this project the example is: (Parents - HomePaage, TopicShowPage, Child: PostList)
4. This way Parent is able to control what to fetch and the child is reponsible for fetching the data making the shimmer kind of implementation easy and the parent page is loaded without delays.

# Comments Approach
The query function approach for comments is fine and there is no problem with it but, we are going to make it as CommentShow fetches the list of comments, but because of a recursive call in Comment show there will be many many db queries. To solve this, there will be a feature of next used.

# Bad Data Fetching Technique
Normally like in the comments example, letting each component fetch its own data is bad code. It is even worse becaue there is a reccursive call to CommentsShow.
We can use the caching system to deduplicate the queries.


# Caching in Next Js
### Data Cache
Reponses form requests made with 'fetch are sorted and used across requests
### Router Cache
Soft navigation between routes are cached in the browser and reused when a user revists a page
### Request Memoization
Requests makde with 'fetch' or functions ran with 'cache' are deduplicated
### Full Route Cache
At build time, Next decides if your route is static or dynamic. If it is static, the page is rendered and the result is stored. In production, users are given this pre-rendered result.

# Request Memoization:
Consider 3 pages making the same call to the db. If there is a caching system in place then it will remove duplocate calls from the set of db calls. Send the deduplicated queries to the database and return the result to all the components that made the call.
Important Points to Note:
1. In between incoming requests (different in nature) the data from previous request is cleared out.
2. It is automatically used with the built-in 'fetch' function
3. Can be used with other functions (link db queries) by using the cache function.


# Suspense Components
We can wrap our server components with suspense compoennts to change how the application is loaded up and appears to the user.
The server components wrapped with suspense are sent back as empty blocks of data in the initial page.
e.g. I have a page (a server component) with 2 server compoennts inside
### Traditional Rendering
This will send back the full html page when loaded.
### With Suspense (Content Streaming)
This will send back empty spaces in place of the server coponents first. As soon as the server components are fully rendered, they are sent in a stream to the browser and the user sees the content.
This approack also makes it easy to show loading spinners inside our app.


# Receive Query Strings
## Server Components
Recieve it in the page compoennt and the page component will be recieving them in a searchParams prop. Like you can do searchParams.term to get the x in /term=x. You have to pass them to the component via props system.
## Client Components
Use a useSearchParams hook  
### Points to be Noted
1. If a client component uses a useSearchParams then you have to wrap it with Suspense, otherwise it gives weird warning in prod mode.
2. If a page accesses the search params then it becomes a dynamic route in production.