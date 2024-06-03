# Notes

## Scalability

Integrate a global state with Redux (or similar) in case we need to keep track of a resource, save our last search, etc. This could also be useful if we integrate authentication and we want to show personalized info about the user throughout the application.

I am not too familiar but I believe one could also cache API responses with something like Redis to improve waiting times for the user, among other benefits.

## Possible new feature

Returning to the topic of authentication, I could imagine a scenario where a "users" database (with related tables/collections) is created so people can add comments or ratings for the movies and TV series, for example.

# Deployments and AWS services

I have minimal experience with AWS, but here's what I could gather:

- You can deploy easily with Amplify, but a lot of users complain that they have many problems with deployments of Next.js applications.
- If you used Next.js for Static-Site Generation you could even use an S3 bucket to upload your assets. This is also an option for static assets in general, in combination with other services like Elastic Beanstalk when you don't have a static-generated site.
- Lambda would be a serverless option.
- The option I saw mentioned more often as reliable is EC2 with PM2 to ensure our app continues to run.

## What I would add if I had more time

- Unit tests for more complex components
- Format meta data like amounts of money and dates
- Review rating component
- Disable auth form if a field has an error, currently it only works if passwords don't match
- Add Meta per page
- Reorganize some types and components, as they are used in multiple modules
- Add Schema markup, like [Movie](https://schema.org/Movie) and [TVSeries](https://schema.org/TVSeries)
- Component stories
- API routes on Next.js for more customization
- Create components for layout like Column and Row
- I left a few TODO comments through the application as well
