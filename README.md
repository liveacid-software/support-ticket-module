# support-ticket-module

## Assumptions
### This module assumes the following WorkFlow configurations:

- All API calls made from react are prefixed by `/api` to proxy to  the backend
- There is not already a `/supportticket` endpoint established on the project.

## Use and Configuration:
#### To configure this module use the followin ENV Vars in your project .env file

```

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
## Helpful links

https://www.pluralsight.com/guides/export-reactjs-components-as-node-modules-to-npm

https://levelup.gitconnected.com/publish-react-components-as-an-npm-package-7a671a2fb7f

https://codeburst.io/deploy-react-component-as-an-npm-library-d396efc25122


##### mongoose global things to consider:

https://stackoverflow.com/questions/12754604/sharing-a-mongoose-instance-between-multiple-npm-packages

https://www.npmjs.com/package/mongoose-global


## ToDos:

- Add configs for SMTP 
- Send email on submit
- Add integration to GitHub issue API
- pass user type params for permissions on the api endpoints (can accomplish this with ENV VARS too)
- Add custom mongodb collection nam params (ENV Vars too)

