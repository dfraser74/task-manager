export const Types = {
  HIDE_MESSAGE: 'task/meessage/hide',
}

const hiddeMessage = () => ({
  type: Types.HIDE_MESSAGE,
})

const dispatchAction = (type, payload) => ({ type, payload })


export default {
  hiddeMessage,
  dispatchAction,
}