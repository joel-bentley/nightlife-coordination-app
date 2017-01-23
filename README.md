# nightlife-coordination-app
Built for Nightlife Coordination App challenge on Free Code Camp. This project builds off my custom boilerplate project, fcc-starter.

(Node / MongoDB / OAuth / React / React Router)

**Live Demo:** https://joel-bentley-nightlife-app.herokuapp.com/

---

User story requirements for this project: (<https://www.freecodecamp.com/challenges/build-a-nightlife-coordination-app>)

1. As an unauthenticated user, I can view all bars in my area.

2. As an authenticated user, I can add myself to a bar to indicate I am going there tonight.

3. As an authenticated user, I can remove myself from a bar if I no longer want to go there.

4. As an unauthenticated user, when I login I should not have to search again.

---

To use, first add `.env` files in project root and client directories. These files require info from Oauth application setup on your Github account.
Use yarn to install dependencies within root and client directories.

For development, type `npm run dev`

For production, First run `npm run build` within client directory, then run `npm start` from root.

To deploy to Heroku: create and checkout a deploy branch, build client app after setting proper env variables, remove build directory from `.gitignore` so files included in commit, and then push this branch to heroku master.
