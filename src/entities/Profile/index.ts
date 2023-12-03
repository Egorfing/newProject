export {Profile, ProfileSchema} from './model/types/profile'

export { profileActions, profileReducer} from './model/slice/profileSlice'

export {fetchProfileData} from './services/fetchProfileData/fetchProfileData'
export {updateProfileData} from './services/updateProfileData/updateProfileData'

export {ProfileCard} from './ui/ProfileCard/ProfileCard'

  
  export {getProfileData, getProfileError, getProfileIsLoading, getProfileValidateErrors} from './model/selectors/getProfileState'