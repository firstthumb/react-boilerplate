import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Home} from './pages'

export const App: React.FC = () => (
  <>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </>
)
