export function HelloWorldAction(props) {
  return {
    name: 'hello',
    label: 'Hello world',
    onHandle: () => {
      // Here you can perform your actions
      window.alert('👋 Hello from custom action')
    },
  }
}
