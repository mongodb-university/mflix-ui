# M220 MFlix UI Front-End

Hi there!

In this repository you can find the [MongoDB University Developer Courses](https://university.mongodb.com/)
front-end application.

This code is made available so that you can explore how the MFlix application was created and how it is used throughout the M220 online courses.

All validation codes have been striped out of the source code, so that you can
enjoy the full M220 learning experience!

The MFlix UI is a React Application that performs backend requests via
a backend exposed Rest API. It will proxy requests to `http://localhost:5000/`
to interact with any of the M220 backends that are listening on that port.

## Local build

If you want to make modifications, debug or simply create a local version of
the MFlix front-end you can do so by building locally.

### Dependencies

To run the MFlix UI application locally you need to have the following
dependencies:

- ``npm`` 6.4.1 or above
- ``node`` v10.6.0 or above
- Local ``mflix`` backend

### Local Installation

- 1) Install application dependencies

```sh
cd mflix-ui
npm install
```

- 2) Run the front-end server

```sh
npm start
```

Once you've started the server, a new browser tab or window should open to http://localhost:3000 if one isn't open, otherwise it will refresh the existing window. Since this project uses create-react-app, not reloading is in effect so there's no need to stop and start the front-end when you make a change.

Enjoy!
