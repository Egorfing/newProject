import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Profile } from 'entities/Profile/model/types/profile'


export const fetchProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>(
  'profile/fetchProfileData',
  async (_, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.get<Profile>('/profile')
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue('error')
    }
  }
)

