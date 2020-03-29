import React from 'react'
import {TopBar} from '~/common/view'
import {Container} from '@material-ui/core'

export const Home: React.FC = ({children}) => {
  return (
    <>
      <TopBar />
      <Container fixed>{children}</Container>
    </>
  )
}
