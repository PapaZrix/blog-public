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

## Features

### Authentication - Users

- role based authentication - users can either have the default user role or an admin role, based on their role, the layout differs

![Example of default user dropdown menu options](/public/readme/user.png)
![Example of an admin dropdown menu options](/public/readme/admin.png)
