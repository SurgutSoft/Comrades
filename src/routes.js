import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from "./App"
import Home from "./components/Home"
import NotFound from "./components/NotFound"
import TablePageComrades from "./components/TablePageComrades"
import AuthorizationForm from "./components/form/authorizationForm"

export const routes = (
    <div>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='/comrades' component={TablePageComrades} />
        <Route path='/authorization' component={AuthorizationForm} />
      </Route>
      <Route path='*' component={NotFound} />
    </div>
  )