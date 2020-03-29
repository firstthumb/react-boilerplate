import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Popular} from './pages'

export const App: React.FC = () => (
  <>
    <Switch>
      <Route path="/" component={Popular} />
    </Switch>
  </>
)
