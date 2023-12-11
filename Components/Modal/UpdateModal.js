import React, { Component, PropTypes } from 'react'
import { Dimensions, Modal, StyleSheet } from 'react-native'
import { View } from 'react-native-animatable'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height
const DEFAULT_COLOR = '#001a33'

export default class UpdateModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.node,
    backdropBackground: PropTypes.string
  }

  static defaultProps = {
    visible: false,
    backdropBackground: DEFAULT_COLOR
  }

  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.visible && nextProps.visible) {
      this.setState({ visible: true })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // On modal open request slide the view up and fade in the backdrop
    if (this.state.visible && !prevState.visible) {
      this.open()
    // On modal close request slide the view down and fade out the backdrop
    } else if (!this.props.visible && prevProps.visible) {
      this.close()
    }
  }

  open = () => {
    this.refs.backdrop.transitionTo({ opacity: 0.70 })
    this.refs.content.slideInUp(300)
  }

  close = () => {
    this.refs.backdrop.transitionTo({ opacity: 0 })
    this.refs.content.slideOutDown(300)
      .then(() => this.setState({ visible: false }))
  }

  render () {
    const { children, backdropBackground } = this.props
    const { visible } = this.state
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        {...this.props}
        visible={visible}
        onRequestClose={this.close}
      >
        <View ref={'backdrop'} style={[styles.backdrop, { backgroundColor: backdropBackground }]} />
        <View style={{ flex: 1 }} ref={'content'} onStartShouldSetResponder={this.close}>
          {children}
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  backdrop: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    position: 'absolute',
    opacity: 0
  }
})
@mmazzarolo
Author
mmazzarolo commented on 25 May 2016
Preview: