# Press To Interact

Press To Interact is a full-stack video game blog that I made for a friend of mine (Fabijan Balen) with the goal of giving him a platform to express his thoughts and feelings on some of his favorite game releases.

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](/public/readme//homepage.png)

## Built with

- [Next.js 12](https://nextjs.org/docs/pages) - web framework
- [Prisma](https://www.prisma.io/) - database hosted on Planetscale
- [Next-auth](https://next-auth.js.org/) - auth provider
- [Draft.js](https://draftjs.org/) - post editor
- [Uploadthing](https://uploadthing.com/) - storing image uploads
- [React-Query](https://tanstack.com/query/v4/) - hydrating SSR pages

Hosted on Vercel. Includes server side rendered pages for better SEO and overall better performance.

![Lighthouse results](/public/readme/lighthouse.png)

## Features

- Role based authentication, authentication protected routes - users can either have the default user role or an admin role, based on their role, the layout differs

|               User Dropdown Menu               |               Admin Dropdown Menu                |
| :--------------------------------------------: | :----------------------------------------------: |
| ![User dropdown menu](/public/readme/user.png) | ![Admin dropdown menu](/public/readme/admin.png) |

- Normal users have the option to review their activity on the website as well as customize their profile look by changing their: username, about text, location and lastly uploading an avatar image

![Activity and settings sections of a user](/public/readme/user.gif)

- Comparatively, the admin of the website has both a post editor as well as an admin dashboard where he can check out all his posts, collections and website users and make edits if necessary.

![Admin post editor and dashboard](/public/readme/admin.gif)

- Registered users can leave their thoughts on each post as well like other users comments.

![User leaving a comment](/public/readme/comment.gif)

You like video games too? Hop on to [PressToInteract](https://presstointeract.com/), make an account, leave your thoughts on some of the game releases we cover!
