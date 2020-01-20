// iterate each form field & map to post object with correct database key
const createAdvertiserPostObject = (state) => {
  const postObject = {}
  for (const fieldKey in state) {
    const fieldObj = state[fieldKey]
    const contactPersonFullName = `${state.first_name.value} ${state.last_name.value}`
    const { dbKey, value } = fieldObj
    if (dbKey) {
      postObject[dbKey] = value
    }
    postObject.contact_name = contactPersonFullName
  }
  return postObject
}

export default createAdvertiserPostObject