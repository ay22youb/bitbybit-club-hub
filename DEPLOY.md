# Deployment Instructions

To deploy this application, you can use any static hosting service (such as Vercel, Netlify, or GitHub Pages). The following steps outline the general process.

## Prerequisites

- You have a hosting account with a provider of your choice.
- You have the project's `dist` directory, which contains the production-ready build of the application.

## Deployment Steps

1. **Log in to your hosting provider's dashboard.**
2. **Create a new site or project.**
3. **Upload the contents of the `dist` directory.** Most hosting providers offer a drag-and-drop interface or a command-line tool for uploading files. Make sure to upload the entire contents of the `dist` directory, including the `index.html` file and the `assets` folder.
4. **Configure the build settings (if necessary).** Some hosting providers may require you to specify the build command and the output directory. In this case, you can use the following settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
5. **Deploy the site.** Once the files are uploaded and the settings are configured, you can deploy the site. Your hosting provider will give you a URL where you can access the deployed application.

That's it! Your application should now be live.
