import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { getProfileForm } from "entites/Profile/model/selectors/getProfileState"
import { Profile } from "entites/Profile/model/types/profile"

export const updateProfileData = createAsyncThunk<
Profile,
void,
ThunkConfig<string>
>(
'profile/updateProfileData',
async (_, { rejectWithValue, extra, getState }) => {

  const formData = getProfileForm(getState())
  try {
    const response = await extra.api.put<Profile>('/profile', formData)
    return response.data
  } catch (error) {
    console.log(error)
    return rejectWithValue('error')
  }
}
)