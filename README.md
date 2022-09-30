# support-ticket-module

## Background and Description

The support-ticket-module is a fullstack module to handle creating an submitting support tickets to LiveACID software through any instance of LiveACID WorkFlow.

The module has two entry points:

1. `api/` for the router and/or controller to access and import the backend code
2. `./` for the react component to include the component in the menu and display on a WorkFlow instance.

### File stucture

The backend and the frontend code are split into 2 directories. The route & controllers live in the `api/` directory and the react compnent files are in the `src/lib/` directory which get compiled into the `dist/` directory. The mongo schema. is defined in the `mongo/` directory.

## Assumptions

### This module assumes the following WorkFlow configurations:

- All API calls made from react are prefixed by `/api` to proxy to the backend
- There is not already a `/supportticket` endpoint established on the project.

## Use and Configuration:

#### To configure this module use the followin ENV Vars in your base project .env file that uses this module

```
// SMTP Configurations for email notifications on ticket submittal
SMTP_HOST=
SMTP_PASSWORD=
SMTP_PORT=
SMTP_USERNAME=

// OR Sendgrid Configurations for email notifications on ticket submittal
SENDGRID_API_USER= 
SENDGRID_API_KEY= 

// REQUIRED: GetHub API Configurations for issue creation on Submittal
GITHUB_ISSUE_REPO_PATH=
GITHUB_TOKEN=

```

Note: This package uses `formik`, `dotenv` and `mongoose` npm packages

## Example of useage

#### session usage with express:

```
// use code here

```

### React component usage:

#### Default API Endpoint `/api/supportticket/submit/`

```
import { SupportTicket } from 'support-ticket-module';

<Route path="/supportticket" component={ SupportTicket } />

```

#### Custom API Endpoint

Add the component to a route passing the api endpoint to the compnent as a prop. Not: it will use the defined api endpoint to post the support ticket

```
<Route
  path="/supportticket"
  render={(props) => <SupportTicket {...props} apiPath={'/my/custom/supportticket/endpoint'} />}
/>

```

## ToDos:

- Add integration to GitHub issue API
- add upload a screenshot

### Future:

- pass user type params for permissions on the api endpoints (can accomplish this with ENV VARS too)
- Add custom mongodb collection nam params (ENV Vars too)
