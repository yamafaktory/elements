import React from 'react'
import PropTypes from 'prop-types'
import { List } from '../../molecules/List'
import Card from '../../molecules/Card'

const CardList = ({ children }) => (
  <Card>
    <List>{children}</List>
  </Card>
)

CardList.propTypes = {
  children: PropTypes.node,
}

export default CardList
