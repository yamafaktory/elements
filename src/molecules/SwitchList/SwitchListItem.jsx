import React from 'react'
import PropTypes from 'prop-types'
import View from '@allthings/react-view'
import { css } from 'glamor'
import Text from '../../atoms/Text'
import { ColorPalette } from '@allthings/colors'

class SwitchListItem extends React.Component {
  static propTypes = {
    optionKey: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  handleClick = () => this.props.onClick(this.props.optionKey)

  render() {
    const {
      optionKey,
      value,
      isActive,
      onClick,
      children,
      ...props
    } = this.props
    const activeStyle = isActive && { backgroundColor: ColorPalette.text.gray }
    return (
      <View
        onClick={this.handleClick}
        data-e2e={`settings-switch-locale-${this.props.optionKey}`}
        {...css(activeStyle, { ':hover': { cursor: 'pointer' } })}
        {...props}
      >
        <Text
          {...css({
            padding: 10,
            color: isActive ? ColorPalette.white : ColorPalette.text.secondary,
            textAlign: 'center',
          })}
        >
          {value}
        </Text>
        {children}
      </View>
    )
  }
}

export default SwitchListItem
