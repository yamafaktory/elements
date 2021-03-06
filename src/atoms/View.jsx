import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { css } from 'glamor'

/**
 * This Component is rebuild of angular-material's flexbox directives.
 *
 * Different to angular's directive implementation, which can be used independent of each other,
 * this component combines layout and element attributes within one component.
 *
 * For explanation see:
 * - https://material.angularjs.org/latest/layout/alignment
 * - https://material.angularjs.org/latest/layout/children
 */

class View extends Component {
  static propTypes = {
    children: PropTypes.node,

    /** horizontal alignment */
    alignH: PropTypes.oneOf([
      'none', 'start', 'center', 'end', 'space-around', 'space-between'
    ]),

    /** vertical alignment */
    alignV: PropTypes.oneOf([
      'none', 'start', 'center', 'end', 'stretch'
    ]),

    /** direction */
    direction: PropTypes.oneOf([
      'row', 'column'
    ]),

    /** Passing true, will make the view fill out available space */
    fill: PropTypes.bool,

    /** Defining how children will wrap */
    wrap: PropTypes.oneOf([
      'inherit', 'initial', 'wrap', 'nowrap', 'wrap-reverse'
    ]),

    /** Flex values, can be 5, 10, 15 ... 100 or 33, 66 */
    flex: PropTypes.oneOf([
      'none', 'flex', 'nogrow', 'grow', 'initial', 'auto', 'noshrink',
      5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 95, 90, 100,
      33, 66
    ]),

    onClick: PropTypes.func,

    /** @deprecated */
    onRef: PropTypes.func
  }

  static defaultProps = {
    alignH: 'start',
    alignV: 'stretch',
    fill: false,
    flex: 'none',
    onRef: _ => _
  }

  /**
   * Appends 'flex-' to 'start' and 'end'
   * @param {String} alignment
   * @return {String}
   */
  getCssAlignValue (alignment) {
    if (alignment === 'start' || alignment === 'end') {
      return `flex-${alignment}`
    }
    return alignment
  }

  /**
   *
   * @param {String|Number} flex
   * @returns {Object}
   */
  getCssFlexValue (flex) {
    if (typeof flex === 'number') {
      if (flex === 33) flex = 100 / 3
      if (flex === 66) flex = 200 / 3
      return `1 1 ${flex}%`
    }

    /**
     * CSS value of flex: flex-grow flex-shrink flex-basis
     */
    switch (flex) {
      case 'none':
        return '0 0 auto'
      case 'flex':
        return '1'
      case 'nogrow':
        return '0 1 auto'
      case 'grow':
        return '1 1 100%'
      case 'initial':
        return '0 1 auto'
      case 'auto':
        return '1 1 auto'
      case 'noshrink':
        return '1 0 auto'
    }
  }

  render () {
    const {
      alignH,
      alignV,
      children,
      direction,
      fill,
      flex,
      onRef,
      wrap,
      onClick,
      ...restProps
    } = this.props

    let styles = {}

    if (direction || flex) {
      styles.boxSizing = 'border-box'
    }

    if (direction) {
      styles = {
        ...styles,
        alignContent: this.getCssAlignValue(alignV),
        alignItems: this.getCssAlignValue(alignV),
        display: 'flex',
        flexDirection: direction,
        justifyContent: this.getCssAlignValue(alignH)
      }

      if (wrap) styles.flexWrap = wrap

      if (fill) {
        styles = {
          ...styles,
          height: '100%',
          margin: 0,
          minHeight: '100%',
          width: '100%'
        }
      }

      if (onClick) {
        styles = {
          ...styles,
          cursor: 'pointer'
        }
      }
    }

    if (flex) {
      styles.flex = this.getCssFlexValue(flex)
    }

    return (
      <div ref={onRef} {...css(styles)} {...restProps}>
        {children}
      </div>
    )
  }
}

export default View
